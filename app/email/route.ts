import { NextResponse } from "next/server";
import { getDB } from "../db";
import { sendEmail } from "../lib/mail";

export const runtime = "edge";

const errorRedirectUrl = process.env.ERROR_URL as string;
const successRedirectUrl = process.env.SUCCESS_URL as string;
const fromEmail = process.env.EMAIL_ADDRESS as string;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY as string;
const turnstileEnabled = process.env.TURNSTILE_ENABLED === "true";

function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function generateCode() {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);
  const value = array.reduce((a, b) => a + b, 0xffffffff);
  return value.toString(36).toUpperCase();
}

function error(errorCode: string) {
  const url = new URL(errorRedirectUrl);
  url.searchParams.set("error", errorCode);
  return NextResponse.redirect(url, { status: 302 });
}

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email");
  const referralCode = data.get("code");
  const token = data.get("cf-turnstile-response");
  const ip = request.headers.get("CF-Connecting-IP");
  if (turnstileEnabled && (!token || !ip)) {
    return error("missing_captcha");
  }
  if (turnstileEnabled) {
    const formData = new FormData();
    formData.append("secret", turnstileSecretKey);
    if (token) {
      formData.append("response", token);
    }
    if (ip) {
      formData.append("remoteip", ip);
    }
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });
    const outcome = await result.json();
    if (!outcome.success) {
      return error("invalid_captcha");
    }
  }
  if (!email || !errorRedirectUrl) {
    return error("bad_request");
  }
  if (typeof email !== "string" || !validateEmail(email)) {
    return error("invalid_email");
  }
  try {
    const code = generateCode();

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
        Code: code,
        ReferredBy: referredBy,
        CreatedAt: new Date().toISOString(),
      })
      .onConflict((eb) => eb.column("Email").doNothing())
      .execute();

    let emailResult = null;
    const mailContentUrl = process.env.WELCOME_MAIL_URL;
    if (result.length > 0 && mailContentUrl) {
      const mailContentResponse = await fetch(mailContentUrl);
      const mailContent = await mailContentResponse.text();
      emailResult = await sendEmail({
        personalizations: [
          {
            to: [{ email }],
            dkim_domain: process.env.DKIM_DOMAIN,
            dkim_selector: process.env.DKIM_SELECTOR,
            dkim_private_key: process.env.DKIM_PRIVATE_KEY,
          },
        ],
        from: { email: fromEmail },
        subject: "Waitlist",
        content: [
          {
            type: "text/html",
            value: mailContent,
          },
        ],
      });
    }
    const url = new URL(successRedirectUrl.replace("{id}", email));
    if (emailResult && !emailResult.success) {
      url.searchParams.set("email_error", JSON.stringify(emailResult));
    }
    return NextResponse.redirect(url, {
      status: 302,
    });
  } catch {
    return error("internal_error");
  }
}
