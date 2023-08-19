import { NextResponse } from "next/server";
import appConfig from "@/app-config.json";
import { getDB } from "@/db";
import { env } from "@/env.server.mjs";
import { SubmitEmailError } from "@/constants/enums";
import { sendEmail } from "@/helpers/mailchannels";
import { generateCode, validateEmail } from "@/helpers/misc";
import { verifyRequest } from "@/helpers/turnstile";

export const runtime = "edge";

function error(
  errorCode: (typeof SubmitEmailError)[keyof typeof SubmitEmailError]
) {
  const url = new URL(env.BASE_URL);
  url.searchParams.set("error", errorCode);
  return NextResponse.redirect(url, { status: 302 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const referralCode = formData.get("ref");
  if (typeof email !== "string" || !validateEmail(email)) {
    return error(SubmitEmailError.invalidEmail);
  }

  if (env.TURNSTILE.ENABLED) {
    const isVerified = await verifyRequest(
      formData,
      request.headers,
      env.TURNSTILE.SECRET_KEY
    );
    if (!isVerified) {
      return error(SubmitEmailError.invalidCaptcha);
    }
  }

  try {
    let referredBy: string | null = null;
    if (typeof referralCode === "string") {
      referredBy = await getDB()
        .selectFrom("waitlist_entries")
        .select("email")
        .where("code", "=", referralCode)
        .executeTakeFirst()
        .then((row) => row?.email ?? null);
    }
    const result = await getDB()
      .insertInto("waitlist_entries")
      .columns(["email", "code", "referred_by", "created_at"])
      .values({
        email: email,
        code: generateCode(),
        referred_by: referredBy,
        created_at: new Date().toISOString(),
      })
      .onConflict((eb) => eb.column("email").doNothing())
      .execute();

    let welcomeEmailError = false;
    if (env.WELCOME_EMAIL.ENABLED && result[0]?.numInsertedOrUpdatedRows) {
      const displayName = email.split("@")[0];
      const mailContentResponse = await fetch(env.WELCOME_EMAIL.CONTENT_URL);
      const mailContentText = await mailContentResponse.text();
      const formattedMail = mailContentText
        .replaceAll("{display_name}", displayName)
        .replaceAll("{base_url}", env.BASE_URL);
      const result = await sendEmail({
        personalizations: [
          {
            to: [{ email }],
            ...(env.DKIM.ENABLED && {
              dkim_domain: env.DKIM.DOMAIN,
              dkim_selector: env.DKIM.SELECTOR,
              dkim_private_key: env.DKIM.PRIVATE_KEY,
            }),
          },
        ],
        from: {
          email: env.WELCOME_EMAIL.ADDRESS,
          name: appConfig.welcomeEmail.name,
        },
        subject: appConfig.welcomeEmail.subject,
        content: [
          {
            type: "text/html",
            value: formattedMail,
          },
        ],
      });
      if (!result.success) {
        console.log("Mailchannels send has failed", email, result.errors);
        welcomeEmailError = true;
      }
    }

    const url = new URL(`/${email}`, env.BASE_URL);
    if (welcomeEmailError) {
      url.searchParams.set("error", SubmitEmailError.emailFailed);
    }
    return NextResponse.redirect(url, {
      status: 302,
    });
  } catch (err) {
    console.log("Unexpected error has occured", err);
    return error(SubmitEmailError.internalError);
  }
}
