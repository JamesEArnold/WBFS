import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_hero_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum_home_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_home_gallery_focus" AS ENUM('center', 'upper');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_hero_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum__home_v_version_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__home_v_version_gallery_focus" AS ENUM('center', 'upper');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "home_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_home_hero_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum_home_hero_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "home_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "home_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"focus" "enum_home_gallery_focus" DEFAULT 'center'
  );
  
  CREATE TABLE "home_volunteer_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"portrait_image_id" integer,
  	"portrait_caption" varchar,
  	"portrait_overline" varchar,
  	"portrait_heading" varchar,
  	"portrait_body" varchar,
  	"portrait_link_label" varchar,
  	"portrait_link_url" varchar,
  	"events_overline" varchar,
  	"events_heading" varchar,
  	"featured_event_id" integer,
  	"featured_event_cta_label" varchar DEFAULT 'View Details',
  	"pillars_overline" varchar,
  	"quote" varchar,
  	"quote_attribution" varchar,
  	"gallery_overline" varchar,
  	"gallery_heading" varchar,
  	"volunteer_overline" varchar,
  	"volunteer_heading" varchar,
  	"volunteer_body" varchar,
  	"volunteer_form_overline" varchar,
  	"volunteer_form_heading" varchar,
  	"updates_overline" varchar,
  	"updates_heading" varchar,
  	"updates_body" varchar,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__home_v_version_hero_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum__home_v_version_hero_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"focus" "enum__home_v_version_gallery_focus" DEFAULT 'center',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_volunteer_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_overline" varchar,
  	"version_heading" varchar,
  	"version_heading_accent" varchar,
  	"version_intro" varchar,
  	"version_portrait_image_id" integer,
  	"version_portrait_caption" varchar,
  	"version_portrait_overline" varchar,
  	"version_portrait_heading" varchar,
  	"version_portrait_body" varchar,
  	"version_portrait_link_label" varchar,
  	"version_portrait_link_url" varchar,
  	"version_events_overline" varchar,
  	"version_events_heading" varchar,
  	"version_featured_event_id" integer,
  	"version_featured_event_cta_label" varchar DEFAULT 'View Details',
  	"version_pillars_overline" varchar,
  	"version_quote" varchar,
  	"version_quote_attribution" varchar,
  	"version_gallery_overline" varchar,
  	"version_gallery_heading" varchar,
  	"version_volunteer_overline" varchar,
  	"version_volunteer_heading" varchar,
  	"version_volunteer_body" varchar,
  	"version_volunteer_form_overline" varchar,
  	"version_volunteer_form_heading" varchar,
  	"version_updates_overline" varchar,
  	"version_updates_heading" varchar,
  	"version_updates_body" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "home_hero_buttons" ADD CONSTRAINT "home_hero_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_hero_buttons" ADD CONSTRAINT "home_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pillars" ADD CONSTRAINT "home_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_gallery" ADD CONSTRAINT "home_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_gallery" ADD CONSTRAINT "home_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_volunteer_tasks" ADD CONSTRAINT "home_volunteer_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_portrait_image_id_media_id_fk" FOREIGN KEY ("portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_featured_event_id_events_id_fk" FOREIGN KEY ("featured_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_buttons" ADD CONSTRAINT "_home_v_version_hero_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_buttons" ADD CONSTRAINT "_home_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_pillars" ADD CONSTRAINT "_home_v_version_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_gallery" ADD CONSTRAINT "_home_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_gallery" ADD CONSTRAINT "_home_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_volunteer_tasks" ADD CONSTRAINT "_home_v_version_volunteer_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_portrait_image_id_media_id_fk" FOREIGN KEY ("version_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_featured_event_id_events_id_fk" FOREIGN KEY ("version_featured_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_hero_buttons_order_idx" ON "home_hero_buttons" USING btree ("_order");
  CREATE INDEX "home_hero_buttons_parent_id_idx" ON "home_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "home_hero_buttons_file_idx" ON "home_hero_buttons" USING btree ("file_id");
  CREATE INDEX "home_pillars_order_idx" ON "home_pillars" USING btree ("_order");
  CREATE INDEX "home_pillars_parent_id_idx" ON "home_pillars" USING btree ("_parent_id");
  CREATE INDEX "home_gallery_order_idx" ON "home_gallery" USING btree ("_order");
  CREATE INDEX "home_gallery_parent_id_idx" ON "home_gallery" USING btree ("_parent_id");
  CREATE INDEX "home_gallery_image_idx" ON "home_gallery" USING btree ("image_id");
  CREATE INDEX "home_volunteer_tasks_order_idx" ON "home_volunteer_tasks" USING btree ("_order");
  CREATE INDEX "home_volunteer_tasks_parent_id_idx" ON "home_volunteer_tasks" USING btree ("_parent_id");
  CREATE INDEX "home_portrait_image_idx" ON "home" USING btree ("portrait_image_id");
  CREATE INDEX "home_featured_event_idx" ON "home" USING btree ("featured_event_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_version_hero_buttons_order_idx" ON "_home_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_buttons_parent_id_idx" ON "_home_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_buttons_file_idx" ON "_home_v_version_hero_buttons" USING btree ("file_id");
  CREATE INDEX "_home_v_version_pillars_order_idx" ON "_home_v_version_pillars" USING btree ("_order");
  CREATE INDEX "_home_v_version_pillars_parent_id_idx" ON "_home_v_version_pillars" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_gallery_order_idx" ON "_home_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_home_v_version_gallery_parent_id_idx" ON "_home_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_gallery_image_idx" ON "_home_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_home_v_version_volunteer_tasks_order_idx" ON "_home_v_version_volunteer_tasks" USING btree ("_order");
  CREATE INDEX "_home_v_version_volunteer_tasks_parent_id_idx" ON "_home_v_version_volunteer_tasks" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_version_portrait_image_idx" ON "_home_v" USING btree ("version_portrait_image_id");
  CREATE INDEX "_home_v_version_version_featured_event_idx" ON "_home_v" USING btree ("version_featured_event_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_hero_buttons" CASCADE;
  DROP TABLE "home_pillars" CASCADE;
  DROP TABLE "home_gallery" CASCADE;
  DROP TABLE "home_volunteer_tasks" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_version_hero_buttons" CASCADE;
  DROP TABLE "_home_v_version_pillars" CASCADE;
  DROP TABLE "_home_v_version_gallery" CASCADE;
  DROP TABLE "_home_v_version_volunteer_tasks" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TYPE "public"."enum_home_hero_buttons_link_type";
  DROP TYPE "public"."enum_home_hero_buttons_style";
  DROP TYPE "public"."enum_home_gallery_focus";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_hero_buttons_link_type";
  DROP TYPE "public"."enum__home_v_version_hero_buttons_style";
  DROP TYPE "public"."enum__home_v_version_gallery_focus";
  DROP TYPE "public"."enum__home_v_version_status";`)
}
