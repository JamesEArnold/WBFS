import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "expires_at" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_expires_at" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP COLUMN "expires_at";
  ALTER TABLE "_events_v" DROP COLUMN "version_expires_at";`)
}
