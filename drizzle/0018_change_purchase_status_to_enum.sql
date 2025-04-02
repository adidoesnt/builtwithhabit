CREATE TYPE "public"."purchase_status" AS ENUM('confirmed', 'unconfirmed', 'failed');--> statement-breakpoint
ALTER TABLE "purchases" RENAME COLUMN "confirmed" TO "status";