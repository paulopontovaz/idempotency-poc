CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" real DEFAULT 0 NOT NULL,
	"transaction_id" uuid DEFAULT gen_random_uuid() NOT NULL
);
