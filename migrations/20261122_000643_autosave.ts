import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_events_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_events_page_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_page_v_autosave_idx" ON "_events_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "_events_v_autosave_idx";
  DROP INDEX "_events_page_v_autosave_idx";
  ALTER TABLE "_events_v" DROP COLUMN "autosave";
  ALTER TABLE "_events_page_v" DROP COLUMN "autosave";`)
}
