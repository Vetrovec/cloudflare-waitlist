export const errorRedirectUrl = process.env.NEXT_PUBLIC_ERROR_URL as string;

export const successRedirectUrl = process.env.NEXT_PUBLIC_SUCCESS_URL as string;

export const referralUrl = process.env.NEXT_PUBLIC_REFERRAL_URL as string;

export const fromEmail = process.env.EMAIL_ADDRESS as string;

export const turnstileEnabled = process.env.NEXT_PUBLIC_TURNSTILE_ENABLED === "true";

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

export const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY as string;
