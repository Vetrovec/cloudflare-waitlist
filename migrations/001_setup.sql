CREATE TABLE IF NOT EXISTS waitlist_entries (
	email TEXT PRIMARY KEY,
	code TEXT NOT NULL UNIQUE,
	referred_by TEXT,
	created_at TEXT NOT NULL
);
