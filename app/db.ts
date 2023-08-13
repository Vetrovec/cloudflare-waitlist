import type { D1Database } from "@cloudflare/workers-types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

interface WaitlistEntry {
  email: string;
  code: string;
  referred_by: string | null;
  created_at: string;
}

interface Database {
  waitlist_entries: WaitlistEntry;
}

let kysely: Kysely<Database>;

export function getDB() {
  if (!kysely) {
    kysely = new Kysely({
      dialect: new D1Dialect({
        database: process.env.DB as unknown as D1Database,
      }),
    });
  }
  return kysely;
}
