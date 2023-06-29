export const errorRedirectUrl = process.env.ERROR_URL as string;

export const successRedirectUrl = process.env.SUCCESS_URL as string;

export const referralUrl = process.env.REFERRAL_URL as string;

export const fromEmail = process.env.EMAIL_ADDRESS as string;

export const turnstileEnabled = process.env.TURNSTILE_ENABLED === "true";

export const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY as string;
