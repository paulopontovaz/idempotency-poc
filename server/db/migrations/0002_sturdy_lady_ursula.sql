ALTER TABLE "persons" RENAME TO "payments";--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "transaction_id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "age";