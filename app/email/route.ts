import { NextResponse } from "next/server";
import { getDB } from "../db";
import { sendEmail } from "../lib/mailchannels";
import { generateCode, validateEmail } from "../lib/misc";
import { verifyRequest } from "../lib/turnstile";

export const runtime = "edge";

const errorRedirectUrl = process.env.ERROR_URL as string;
const successRedirectUrl = process.env.SUCCESS_URL as string;
const fromEmail = process.env.EMAIL_ADDRESS as string;
const turnstileEnabled = process.env.TURNSTILE_ENABLED === "true";

function error(errorCode: string) {
  const url = new URL(errorRedirectUrl);
  url.searchParams.set("error", errorCode);
  return NextResponse.redirect(url, { status: 302 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const referralCode = formData.get("code");

  if (typeof email !== "string") {
    return error("bad_request");
  }
  if (turnstileEnabled) {
    const isVerified = await verifyRequest(formData, request.headers);
    if (!isVerified) {
      return error("missing_captcha");
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

    let emailResponse = null;
    const mailContentUrl = process.env.WELCOME_MAIL_URL;
    if (result.length > 0 && mailContentUrl) {
      const mailContentResponse = await fetch(mailContentUrl);
      const mailContent = await mailContentResponse.text();
      emailResponse = await sendEmail({
        personalizations: [
          {
            to: [{ email }],
            dkim_domain: process.env.DKIM_DOMAIN,
            dkim_selector: process.env.DKIM_SELECTOR,
            dkim_private_key: process.env.DKIM_PRIVATE_KEY,
          },
        ],
        from: { email: fromEmail, name: "Waitlist" },
        subject: "Welcome to waitlist!",
        content: [
          {
            type: "text/html",
            value: mailContent,
          },
        ],
      });
    }

    const url = new URL(successRedirectUrl.replace("{id}", email));
    if (emailResponse && !emailResponse.success) {
      url.searchParams.set("warning", "email_failed");
    }
    return NextResponse.redirect(url, {
      status: 302,
    });
  } catch {
    return error("internal_error");
  }
}
