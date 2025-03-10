ALTER TABLE "bookings" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "purchase_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "package_id" SET NOT NULL;