import type { D1Database } from '@cloudflare/workers-types';

export const DB = process.env.DB as unknown as D1Database;
