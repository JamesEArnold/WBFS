import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum_events_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_events_event_status" AS ENUM('upcoming', 'soldOut', 'past', 'hidden');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum__events_v_version_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'admin');
  CREATE TYPE "public"."enum_events_page_empty_state_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum_events_page_empty_state_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_events_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_page_v_version_empty_state_buttons_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum__events_page_v_version_empty_state_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__events_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "events_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "events_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_events_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum_events_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "events_flyer_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_label" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"first_published_at" timestamp(3) with time zone,
  	"status" "enum_events_event_status" DEFAULT 'upcoming',
  	"date" timestamp(3) with time zone,
  	"overline" varchar,
  	"subtitle" varchar,
  	"listing_cta_label" varchar DEFAULT 'View Details',
  	"sold_out_banner_heading" varchar,
  	"sold_out_banner_body" varchar,
  	"date_label" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"hero_blurb" varchar,
  	"flyer_pdf_id" integer,
  	"flyer_caption" varchar,
  	"import_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v_version_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__events_v_version_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum__events_v_version_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_flyer_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_first_published_at" timestamp(3) with time zone,
  	"version_status" "enum_events_event_status" DEFAULT 'upcoming',
  	"version_date" timestamp(3) with time zone,
  	"version_overline" varchar,
  	"version_subtitle" varchar,
  	"version_listing_cta_label" varchar DEFAULT 'View Details',
  	"version_sold_out_banner_heading" varchar,
  	"version_sold_out_banner_body" varchar,
  	"version_date_label" varchar,
  	"version_heading" varchar,
  	"version_heading_accent" varchar,
  	"version_hero_blurb" varchar,
  	"version_flyer_pdf_id" integer,
  	"version_flyer_caption" varchar,
  	"version_import_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"import_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_enabled" boolean DEFAULT false,
  	"banner_text" varchar,
  	"banner_link_label" varchar,
  	"banner_link_url" varchar,
  	"tagline" varchar NOT NULL,
  	"header_cta_label" varchar NOT NULL,
  	"header_cta_href" varchar,
  	"mobile_cta_label" varchar NOT NULL,
  	"mobile_cta_href" varchar,
  	"footer_blurb" varchar NOT NULL,
  	"hq_heading" varchar NOT NULL,
  	"address_line1" varchar,
  	"address_line2" varchar,
  	"contact_email" varchar,
  	"action_heading" varchar NOT NULL,
  	"footer_cta_label" varchar NOT NULL,
  	"footer_cta_href" varchar,
  	"facebook_url" varchar,
  	"instagram_url" varchar,
  	"disclaimer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_banner_enabled" boolean DEFAULT false,
  	"version_banner_text" varchar,
  	"version_banner_link_label" varchar,
  	"version_banner_link_url" varchar,
  	"version_tagline" varchar NOT NULL,
  	"version_header_cta_label" varchar NOT NULL,
  	"version_header_cta_href" varchar,
  	"version_mobile_cta_label" varchar NOT NULL,
  	"version_mobile_cta_href" varchar,
  	"version_footer_blurb" varchar NOT NULL,
  	"version_hq_heading" varchar NOT NULL,
  	"version_address_line1" varchar,
  	"version_address_line2" varchar,
  	"version_contact_email" varchar,
  	"version_action_heading" varchar NOT NULL,
  	"version_footer_cta_label" varchar NOT NULL,
  	"version_footer_cta_href" varchar,
  	"version_facebook_url" varchar,
  	"version_instagram_url" varchar,
  	"version_disclaimer" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_page_empty_state_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_events_page_empty_state_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum_events_page_empty_state_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "events_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"list_heading" varchar,
  	"empty_state_overline" varchar,
  	"empty_state_heading" varchar,
  	"empty_state_body" varchar,
  	"_status" "enum_events_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_events_page_v_version_empty_state_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__events_page_v_version_empty_state_buttons_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"style" "enum__events_page_v_version_empty_state_buttons_style" DEFAULT 'primary',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_overline" varchar,
  	"version_heading" varchar,
  	"version_heading_accent" varchar,
  	"version_intro" varchar,
  	"version_list_heading" varchar,
  	"version_empty_state_overline" varchar,
  	"version_empty_state_heading" varchar,
  	"version_empty_state_body" varchar,
  	"version__status" "enum__events_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "events_facts" ADD CONSTRAINT "events_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_buttons" ADD CONSTRAINT "events_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_buttons" ADD CONSTRAINT "events_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_flyer_images" ADD CONSTRAINT "events_flyer_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_flyer_images" ADD CONSTRAINT "events_flyer_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_flyer_pdf_id_media_id_fk" FOREIGN KEY ("flyer_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_facts" ADD CONSTRAINT "_events_v_version_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_buttons" ADD CONSTRAINT "_events_v_version_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_buttons" ADD CONSTRAINT "_events_v_version_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_flyer_images" ADD CONSTRAINT "_events_v_version_flyer_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_flyer_images" ADD CONSTRAINT "_events_v_version_flyer_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_flyer_pdf_id_media_id_fk" FOREIGN KEY ("version_flyer_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav" ADD CONSTRAINT "site_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_nav" ADD CONSTRAINT "_site_settings_v_version_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_page_empty_state_buttons" ADD CONSTRAINT "events_page_empty_state_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page_empty_state_buttons" ADD CONSTRAINT "events_page_empty_state_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_page_v_version_empty_state_buttons" ADD CONSTRAINT "_events_page_v_version_empty_state_buttons_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_page_v_version_empty_state_buttons" ADD CONSTRAINT "_events_page_v_version_empty_state_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_facts_order_idx" ON "events_facts" USING btree ("_order");
  CREATE INDEX "events_facts_parent_id_idx" ON "events_facts" USING btree ("_parent_id");
  CREATE INDEX "events_buttons_order_idx" ON "events_buttons" USING btree ("_order");
  CREATE INDEX "events_buttons_parent_id_idx" ON "events_buttons" USING btree ("_parent_id");
  CREATE INDEX "events_buttons_file_idx" ON "events_buttons" USING btree ("file_id");
  CREATE INDEX "events_flyer_images_order_idx" ON "events_flyer_images" USING btree ("_order");
  CREATE INDEX "events_flyer_images_parent_id_idx" ON "events_flyer_images" USING btree ("_parent_id");
  CREATE INDEX "events_flyer_images_image_idx" ON "events_flyer_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_flyer_pdf_idx" ON "events" USING btree ("flyer_pdf_id");
  CREATE UNIQUE INDEX "events_import_key_idx" ON "events" USING btree ("import_key");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_version_facts_order_idx" ON "_events_v_version_facts" USING btree ("_order");
  CREATE INDEX "_events_v_version_facts_parent_id_idx" ON "_events_v_version_facts" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_buttons_order_idx" ON "_events_v_version_buttons" USING btree ("_order");
  CREATE INDEX "_events_v_version_buttons_parent_id_idx" ON "_events_v_version_buttons" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_buttons_file_idx" ON "_events_v_version_buttons" USING btree ("file_id");
  CREATE INDEX "_events_v_version_flyer_images_order_idx" ON "_events_v_version_flyer_images" USING btree ("_order");
  CREATE INDEX "_events_v_version_flyer_images_parent_id_idx" ON "_events_v_version_flyer_images" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_flyer_images_image_idx" ON "_events_v_version_flyer_images" USING btree ("image_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_flyer_pdf_idx" ON "_events_v" USING btree ("version_flyer_pdf_id");
  CREATE INDEX "_events_v_version_version_import_key_idx" ON "_events_v" USING btree ("version_import_key");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "media_import_key_idx" ON "media" USING btree ("import_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_order_idx" ON "site_settings_nav" USING btree ("_order");
  CREATE INDEX "site_settings_nav_parent_id_idx" ON "site_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_nav_order_idx" ON "_site_settings_v_version_nav" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_nav_parent_id_idx" ON "_site_settings_v_version_nav" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "events_page_empty_state_buttons_order_idx" ON "events_page_empty_state_buttons" USING btree ("_order");
  CREATE INDEX "events_page_empty_state_buttons_parent_id_idx" ON "events_page_empty_state_buttons" USING btree ("_parent_id");
  CREATE INDEX "events_page_empty_state_buttons_file_idx" ON "events_page_empty_state_buttons" USING btree ("file_id");
  CREATE INDEX "events_page__status_idx" ON "events_page" USING btree ("_status");
  CREATE INDEX "_events_page_v_version_empty_state_buttons_order_idx" ON "_events_page_v_version_empty_state_buttons" USING btree ("_order");
  CREATE INDEX "_events_page_v_version_empty_state_buttons_parent_id_idx" ON "_events_page_v_version_empty_state_buttons" USING btree ("_parent_id");
  CREATE INDEX "_events_page_v_version_empty_state_buttons_file_idx" ON "_events_page_v_version_empty_state_buttons" USING btree ("file_id");
  CREATE INDEX "_events_page_v_version_version__status_idx" ON "_events_page_v" USING btree ("version__status");
  CREATE INDEX "_events_page_v_created_at_idx" ON "_events_page_v" USING btree ("created_at");
  CREATE INDEX "_events_page_v_updated_at_idx" ON "_events_page_v" USING btree ("updated_at");
  CREATE INDEX "_events_page_v_latest_idx" ON "_events_page_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "events_facts" CASCADE;
  DROP TABLE "events_buttons" CASCADE;
  DROP TABLE "events_flyer_images" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v_version_facts" CASCADE;
  DROP TABLE "_events_v_version_buttons" CASCADE;
  DROP TABLE "_events_v_version_flyer_images" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_nav" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_nav" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "events_page_empty_state_buttons" CASCADE;
  DROP TABLE "events_page" CASCADE;
  DROP TABLE "_events_page_v_version_empty_state_buttons" CASCADE;
  DROP TABLE "_events_page_v" CASCADE;
  DROP TYPE "public"."enum_events_buttons_link_type";
  DROP TYPE "public"."enum_events_buttons_style";
  DROP TYPE "public"."enum_events_event_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_buttons_link_type";
  DROP TYPE "public"."enum__events_v_version_buttons_style";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_events_page_empty_state_buttons_link_type";
  DROP TYPE "public"."enum_events_page_empty_state_buttons_style";
  DROP TYPE "public"."enum_events_page_status";
  DROP TYPE "public"."enum__events_page_v_version_empty_state_buttons_link_type";
  DROP TYPE "public"."enum__events_page_v_version_empty_state_buttons_style";
  DROP TYPE "public"."enum__events_page_v_version_status";`)
}
