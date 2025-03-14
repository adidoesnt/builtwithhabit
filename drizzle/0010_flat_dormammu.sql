CREATE TYPE "public"."roles" AS ENUM('admin', 'trainer', 'user');--> statement-breakpoint
CREATE TABLE "availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"trainer_id" uuid NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"role" "roles" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "trainer_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "postal_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_trainer_id_users_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_trainer_id_users_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "postal_code";