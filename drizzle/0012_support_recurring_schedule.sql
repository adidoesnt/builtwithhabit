CREATE TABLE "recurring_availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"trainer_id" uuid NOT NULL,
	"day_of_week" integer NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "availabilities" RENAME TO "availability_overrides";--> statement-breakpoint
ALTER TABLE "availability_overrides" DROP CONSTRAINT "availabilities_trainer_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "availability_overrides" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "recurring_availabilities" ADD CONSTRAINT "recurring_availabilities_trainer_id_users_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "availability_overrides" ADD CONSTRAINT "availability_overrides_trainer_id_users_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;