import { z } from "zod";
import { convertToBoolean } from "./env.common.mjs";

const schema = z.object({
  BASE_URL: z.string().url(),
  TURNSTILE: z.union([
    z.object({
      ENABLED: z.literal(true),
      SITE_KEY: z.string(),
    }),
    z.object({
      ENABLED: z.literal(false),
    }),
  ]),
});

export const env = schema.parse({
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  TURNSTILE: {
    ENABLED: convertToBoolean(process.env.NEXT_PUBLIC_TURNSTILE_ENABLED),
    SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
});
