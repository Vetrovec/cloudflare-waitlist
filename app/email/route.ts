import { NextResponse } from "next/server";
import { getDB } from "../db";
import { sendEmail } from "../lib/mailchannels";
import { generateCode, validateEmail } from "../lib/misc";
import { verifyRequest } from "../lib/turnstile";
import { env } from "../env.mjs";
import content from "../../content.json";

export const runtime = "edge";

function error(errorCode: string) {
  const url = new URL(env.NEXT_PUBLIC_ERROR_URL);
  url.searchParams.set("error", errorCode);
  return NextResponse.redirect(url, { status: 302 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const referralCode = formData.get("ref");

  if (typeof email !== "string") {
    return error("bad_request");
  }
  if (env.NEXT_PUBLIC_TURNSTILE_ENABLED) {
    const isVerified = await verifyRequest(
      formData,
      request.headers,
      env.TURNSTILE_SECRET_KEY!
    );
    if (!isVerified) {
      return error("invalid_captcha");
    }
  }
  if (!validateEmail(email)) {
    return error("invalid_email");
  }

  try {
    let referredBy = null;
    if (typeof referralCode === "string") {
      referredBy = await getDB()
        .selectFrom("Waitlist")
        .select("Email")
        .where("Code", "=", referralCode)
        .executeTakeFirst()
        .then((row) => row?.Email ?? null);
    }
    const result = await getDB()
      .insertInto("Waitlist")
      .columns(["Email", "Code", "ReferredBy", "CreatedAt"])
      .values({
        Email: email,
        Code: generateCode(),
        ReferredBy: referredBy,
        CreatedAt: new Date().toISOString(),
      })
      .onConflict((eb) => eb.column("Email").doNothing())
      .execute();

    if (env.WELCOME_EMAIL_ENABLED && result[0]?.numInsertedOrUpdatedRows) {
      const mailContentResponse = await fetch(env.WELCOME_EMAIL_CONTENT_URL!);
      const mailContent = await mailContentResponse.text();
      await sendEmail({
        personalizations: [
          {
            to: [{ email }],
            dkim_domain: env.DKIM_DOMAIN,
            dkim_selector: env.DKIM_SELECTOR,
            dkim_private_key: env.DKIM_PRIVATE_KEY,
          },
        ],
        from: {
          email: env.WELCOME_EMAIL_ADDRESS!,
          name: content.welcomeEmail.name,
        },
        subject: content.welcomeEmail.subject,
        content: [
          {
            type: "text/html",
            value: mailContent,
          },
        ],
      });
    }

    const url = new URL(env.NEXT_PUBLIC_SUCCESS_URL.replace("{id}", email));
    return NextResponse.redirect(url, {
      status: 302,
    });
  } catch {
    return error("internal_error");
  }
}
