ALTER TABLE "bookings" ALTER COLUMN "address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "postal_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "online";