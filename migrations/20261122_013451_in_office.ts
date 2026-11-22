import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_in_office_cta_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum_in_office_cta_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_in_office_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__in_office_v_version_cta_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum__in_office_v_version_cta_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__in_office_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "in_office_years_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "in_office_years_outreach" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "in_office_years" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar
  );
  
  CREATE TABLE "in_office_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_in_office_cta_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum_in_office_cta_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "in_office" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"timeline_overline" varchar,
  	"timeline_heading" varchar,
  	"outreach_heading" varchar,
  	"cta_overline" varchar,
  	"cta_heading" varchar,
  	"cta_body" varchar,
  	"_status" "enum_in_office_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_in_office_v_version_years_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_in_office_v_version_years_outreach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_in_office_v_version_years" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_in_office_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__in_office_v_version_cta_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum__in_office_v_version_cta_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_in_office_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_overline" varchar,
  	"version_heading" varchar,
  	"version_heading_accent" varchar,
  	"version_intro" varchar,
  	"version_timeline_overline" varchar,
  	"version_timeline_heading" varchar,
  	"version_outreach_heading" varchar,
  	"version_cta_overline" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_body" varchar,
  	"version__status" "enum__in_office_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "in_office_years_events" ADD CONSTRAINT "in_office_years_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."in_office_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "in_office_years_outreach" ADD CONSTRAINT "in_office_years_outreach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."in_office_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "in_office_years" ADD CONSTRAINT "in_office_years_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."in_office"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "in_office_cta_buttons" ADD CONSTRAINT "in_office_cta_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "in_office_cta_buttons" ADD CONSTRAINT "in_office_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."in_office"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_in_office_v_version_years_events" ADD CONSTRAINT "_in_office_v_version_years_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_in_office_v_version_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_in_office_v_version_years_outreach" ADD CONSTRAINT "_in_office_v_version_years_outreach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_in_office_v_version_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_in_office_v_version_years" ADD CONSTRAINT "_in_office_v_version_years_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_in_office_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_in_office_v_version_cta_buttons" ADD CONSTRAINT "_in_office_v_version_cta_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_in_office_v_version_cta_buttons" ADD CONSTRAINT "_in_office_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_in_office_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "in_office_years_events_order_idx" ON "in_office_years_events" USING btree ("_order");
  CREATE INDEX "in_office_years_events_parent_id_idx" ON "in_office_years_events" USING btree ("_parent_id");
  CREATE INDEX "in_office_years_outreach_order_idx" ON "in_office_years_outreach" USING btree ("_order");
  CREATE INDEX "in_office_years_outreach_parent_id_idx" ON "in_office_years_outreach" USING btree ("_parent_id");
  CREATE INDEX "in_office_years_order_idx" ON "in_office_years" USING btree ("_order");
  CREATE INDEX "in_office_years_parent_id_idx" ON "in_office_years" USING btree ("_parent_id");
  CREATE INDEX "in_office_cta_buttons_order_idx" ON "in_office_cta_buttons" USING btree ("_order");
  CREATE INDEX "in_office_cta_buttons_parent_id_idx" ON "in_office_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "in_office_cta_buttons_file_idx" ON "in_office_cta_buttons" USING btree ("file_id");
  CREATE INDEX "in_office__status_idx" ON "in_office" USING btree ("_status");
  CREATE INDEX "_in_office_v_version_years_events_order_idx" ON "_in_office_v_version_years_events" USING btree ("_order");
  CREATE INDEX "_in_office_v_version_years_events_parent_id_idx" ON "_in_office_v_version_years_events" USING btree ("_parent_id");
  CREATE INDEX "_in_office_v_version_years_outreach_order_idx" ON "_in_office_v_version_years_outreach" USING btree ("_order");
  CREATE INDEX "_in_office_v_version_years_outreach_parent_id_idx" ON "_in_office_v_version_years_outreach" USING btree ("_parent_id");
  CREATE INDEX "_in_office_v_version_years_order_idx" ON "_in_office_v_version_years" USING btree ("_order");
  CREATE INDEX "_in_office_v_version_years_parent_id_idx" ON "_in_office_v_version_years" USING btree ("_parent_id");
  CREATE INDEX "_in_office_v_version_cta_buttons_order_idx" ON "_in_office_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_in_office_v_version_cta_buttons_parent_id_idx" ON "_in_office_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_in_office_v_version_cta_buttons_file_idx" ON "_in_office_v_version_cta_buttons" USING btree ("file_id");
  CREATE INDEX "_in_office_v_version_version__status_idx" ON "_in_office_v" USING btree ("version__status");
  CREATE INDEX "_in_office_v_created_at_idx" ON "_in_office_v" USING btree ("created_at");
  CREATE INDEX "_in_office_v_updated_at_idx" ON "_in_office_v" USING btree ("updated_at");
  CREATE INDEX "_in_office_v_latest_idx" ON "_in_office_v" USING btree ("latest");
  CREATE INDEX "_in_office_v_autosave_idx" ON "_in_office_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "in_office_years_events" CASCADE;
  DROP TABLE "in_office_years_outreach" CASCADE;
  DROP TABLE "in_office_years" CASCADE;
  DROP TABLE "in_office_cta_buttons" CASCADE;
  DROP TABLE "in_office" CASCADE;
  DROP TABLE "_in_office_v_version_years_events" CASCADE;
  DROP TABLE "_in_office_v_version_years_outreach" CASCADE;
  DROP TABLE "_in_office_v_version_years" CASCADE;
  DROP TABLE "_in_office_v_version_cta_buttons" CASCADE;
  DROP TABLE "_in_office_v" CASCADE;
  DROP TYPE "public"."enum_in_office_cta_buttons_link_type";
  DROP TYPE "public"."enum_in_office_cta_buttons_style";
  DROP TYPE "public"."enum_in_office_status";
  DROP TYPE "public"."enum__in_office_v_version_cta_buttons_link_type";
  DROP TYPE "public"."enum__in_office_v_version_cta_buttons_style";
  DROP TYPE "public"."enum__in_office_v_version_status";`)
}
