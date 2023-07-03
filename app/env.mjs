import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    WELCOME_EMAIL_ENABLED: z.coerce.boolean(),
    WELCOME_EMAIL_CONTENT_URL: z.string().url().optional(),
    WELCOME_EMAIL_ADDRESS: z.string().email().optional(),
    DKIM_ENABLED: z.coerce.boolean(),
    DKIM_DOMAIN: z.string().optional(),
    DKIM_SELECTOR: z.string().optional(),
    DKIM_PRIVATE_KEY: z.string().optional(),
    TURNSTILE_SECRET_KEY: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_TURNSTILE_ENABLED: z.coerce.boolean(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    WELCOME_EMAIL_ENABLED: process.env.WELCOME_EMAIL_ENABLED,
    WELCOME_EMAIL_CONTENT_URL: process.env.WELCOME_EMAIL_CONTENT_URL,
    WELCOME_EMAIL_ADDRESS: process.env.WELCOME_EMAIL_ADDRESS,
    DKIM_ENABLED: process.env.DKIM_ENABLED,
    DKIM_DOMAIN: process.env.DKIM_DOMAIN,
    DKIM_SELECTOR: process.env.DKIM_SELECTOR,
    DKIM_PRIVATE_KEY: process.env.DKIM_PRIVATE_KEY,
    NEXT_PUBLIC_TURNSTILE_ENABLED: process.env.NEXT_PUBLIC_TURNSTILE_ENABLED,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  },
});
