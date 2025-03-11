CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"postal_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "online" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "postal_code" text;