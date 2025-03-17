ALTER TABLE "availability_overrides" DROP COLUMN "id";
ALTER TABLE "availability_overrides" ADD CONSTRAINT "availability_overrides_trainer_id_start_end_pk" PRIMARY KEY("trainer_id","start","end");--> statement-breakpoint
