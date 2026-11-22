import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_donate_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__donate_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "donate_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "donate" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"donorbox_url" varchar,
  	"mail_overline" varchar,
  	"mail_heading" varchar,
  	"mail_body" varchar,
  	"mail_to_label" varchar DEFAULT 'Mail To',
  	"mail_to_name" varchar,
  	"mail_to_line1" varchar,
  	"mail_to_line2" varchar,
  	"mail_note" varchar,
  	"disclaimer" varchar,
  	"_status" "enum_donate_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_donate_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_donate_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_overline" varchar,
  	"version_heading" varchar,
  	"version_heading_accent" varchar,
  	"version_intro" varchar,
  	"version_donorbox_url" varchar,
  	"version_mail_overline" varchar,
  	"version_mail_heading" varchar,
  	"version_mail_body" varchar,
  	"version_mail_to_label" varchar DEFAULT 'Mail To',
  	"version_mail_to_name" varchar,
  	"version_mail_to_line1" varchar,
  	"version_mail_to_line2" varchar,
  	"version_mail_note" varchar,
  	"version_disclaimer" varchar,
  	"version__status" "enum__donate_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "donate_stats" ADD CONSTRAINT "donate_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donate"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_donate_v_version_stats" ADD CONSTRAINT "_donate_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_donate_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "donate_stats_order_idx" ON "donate_stats" USING btree ("_order");
  CREATE INDEX "donate_stats_parent_id_idx" ON "donate_stats" USING btree ("_parent_id");
  CREATE INDEX "donate__status_idx" ON "donate" USING btree ("_status");
  CREATE INDEX "_donate_v_version_stats_order_idx" ON "_donate_v_version_stats" USING btree ("_order");
  CREATE INDEX "_donate_v_version_stats_parent_id_idx" ON "_donate_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_donate_v_version_version__status_idx" ON "_donate_v" USING btree ("version__status");
  CREATE INDEX "_donate_v_created_at_idx" ON "_donate_v" USING btree ("created_at");
  CREATE INDEX "_donate_v_updated_at_idx" ON "_donate_v" USING btree ("updated_at");
  CREATE INDEX "_donate_v_latest_idx" ON "_donate_v" USING btree ("latest");
  CREATE INDEX "_donate_v_autosave_idx" ON "_donate_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "donate_stats" CASCADE;
  DROP TABLE "donate" CASCADE;
  DROP TABLE "_donate_v_version_stats" CASCADE;
  DROP TABLE "_donate_v" CASCADE;
  DROP TYPE "public"."enum_donate_status";
  DROP TYPE "public"."enum__donate_v_version_status";`)
}
