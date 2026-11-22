import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_sign_off_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum_about_sign_off_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_v_version_sign_off_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum__about_v_version_sign_off_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__about_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "about_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "about_sign_off_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_about_sign_off_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum_about_sign_off_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"hero_image_id" integer,
  	"hero_image_caption" varchar,
  	"origins_overline" varchar,
  	"origins_body" varchar,
  	"timeline_overline" varchar,
  	"timeline_heading" varchar,
  	"sign_off_greeting" varchar DEFAULT 'Respectfully,',
  	"signature_id" integer,
  	"sign_off_name" varchar,
  	"sign_off_image_id" integer,
  	"sign_off_image_caption" varchar,
  	"_status" "enum_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_v_version_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_version_sign_off_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__about_v_version_sign_off_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum__about_v_version_sign_off_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_overline" varchar,
  	"version_heading" varchar,
  	"version_heading_accent" varchar,
  	"version_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_image_caption" varchar,
  	"version_origins_overline" varchar,
  	"version_origins_body" varchar,
  	"version_timeline_overline" varchar,
  	"version_timeline_heading" varchar,
  	"version_sign_off_greeting" varchar DEFAULT 'Respectfully,',
  	"version_signature_id" integer,
  	"version_sign_off_name" varchar,
  	"version_sign_off_image_id" integer,
  	"version_sign_off_image_caption" varchar,
  	"version__status" "enum__about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "about_timeline" ADD CONSTRAINT "about_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_sign_off_buttons" ADD CONSTRAINT "about_sign_off_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_sign_off_buttons" ADD CONSTRAINT "about_sign_off_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_signature_id_media_id_fk" FOREIGN KEY ("signature_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_sign_off_image_id_media_id_fk" FOREIGN KEY ("sign_off_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_version_timeline" ADD CONSTRAINT "_about_v_version_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_sign_off_buttons" ADD CONSTRAINT "_about_v_version_sign_off_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_version_sign_off_buttons" ADD CONSTRAINT "_about_v_version_sign_off_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_signature_id_media_id_fk" FOREIGN KEY ("version_signature_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_sign_off_image_id_media_id_fk" FOREIGN KEY ("version_sign_off_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_timeline_order_idx" ON "about_timeline" USING btree ("_order");
  CREATE INDEX "about_timeline_parent_id_idx" ON "about_timeline" USING btree ("_parent_id");
  CREATE INDEX "about_sign_off_buttons_order_idx" ON "about_sign_off_buttons" USING btree ("_order");
  CREATE INDEX "about_sign_off_buttons_parent_id_idx" ON "about_sign_off_buttons" USING btree ("_parent_id");
  CREATE INDEX "about_sign_off_buttons_file_idx" ON "about_sign_off_buttons" USING btree ("file_id");
  CREATE INDEX "about_hero_image_idx" ON "about" USING btree ("hero_image_id");
  CREATE INDEX "about_signature_idx" ON "about" USING btree ("signature_id");
  CREATE INDEX "about_sign_off_image_idx" ON "about" USING btree ("sign_off_image_id");
  CREATE INDEX "about__status_idx" ON "about" USING btree ("_status");
  CREATE INDEX "_about_v_version_timeline_order_idx" ON "_about_v_version_timeline" USING btree ("_order");
  CREATE INDEX "_about_v_version_timeline_parent_id_idx" ON "_about_v_version_timeline" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_sign_off_buttons_order_idx" ON "_about_v_version_sign_off_buttons" USING btree ("_order");
  CREATE INDEX "_about_v_version_sign_off_buttons_parent_id_idx" ON "_about_v_version_sign_off_buttons" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_sign_off_buttons_file_idx" ON "_about_v_version_sign_off_buttons" USING btree ("file_id");
  CREATE INDEX "_about_v_version_version_hero_image_idx" ON "_about_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_v_version_version_signature_idx" ON "_about_v" USING btree ("version_signature_id");
  CREATE INDEX "_about_v_version_version_sign_off_image_idx" ON "_about_v" USING btree ("version_sign_off_image_id");
  CREATE INDEX "_about_v_version_version__status_idx" ON "_about_v" USING btree ("version__status");
  CREATE INDEX "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE INDEX "_about_v_latest_idx" ON "_about_v" USING btree ("latest");
  CREATE INDEX "_about_v_autosave_idx" ON "_about_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_timeline" CASCADE;
  DROP TABLE "about_sign_off_buttons" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "_about_v_version_timeline" CASCADE;
  DROP TABLE "_about_v_version_sign_off_buttons" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TYPE "public"."enum_about_sign_off_buttons_link_type";
  DROP TYPE "public"."enum_about_sign_off_buttons_style";
  DROP TYPE "public"."enum_about_status";
  DROP TYPE "public"."enum__about_v_version_sign_off_buttons_link_type";
  DROP TYPE "public"."enum__about_v_version_sign_off_buttons_style";
  DROP TYPE "public"."enum__about_v_version_status";`)
}
