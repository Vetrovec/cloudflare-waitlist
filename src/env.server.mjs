import { z } from "zod";
import { convertToBoolean } from "./env.common.mjs";

const schema = z.object({
  BASE_URL: z.string().url(),
  DKIM: z.union([
    z.object({
      ENABLED: z.literal(true),
      DOMAIN: z.string(),
      SELECTOR: z.string(),
      PRIVATE_KEY: z.string(),
    }),
    z.object({
      ENABLED: z.literal(false),
    }),
  ]),
  TURNSTILE: z.union([
    z.object({
      ENABLED: z.literal(true),
      SITE_KEY: z.string(),
      SECRET_KEY: z.string(),
    }),
    z.object({
      ENABLED: z.literal(false),
    }),
  ]),
  WELCOME_EMAIL: z.union([
    z.object({
      ENABLED: z.literal(true),
      CONTENT_URL: z.string().url(),
      ADDRESS: z.string().email(),
    }),
    z.object({
      ENABLED: z.literal(false),
    }),
  ]),
});

export const env = schema.parse({
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DKIM: {
    ENABLED: convertToBoolean(process.env.DKIM_ENABLED),
    DOMAIN: process.env.DKIM_DOMAIN,
    SELECTOR: process.env.DKIM_SELECTOR,
    PRIVATE_KEY: process.env.DKIM_PRIVATE_KEY,
  },
  TURNSTILE: {
    ENABLED: convertToBoolean(process.env.NEXT_PUBLIC_TURNSTILE_ENABLED),
    SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  },
  WELCOME_EMAIL: {
    ENABLED: convertToBoolean(process.env.WELCOME_EMAIL_ENABLED),
    CONTENT_URL: process.env.WELCOME_EMAIL_CONTENT_URL,
    ADDRESS: process.env.WELCOME_EMAIL_ADDRESS,
  },
});
