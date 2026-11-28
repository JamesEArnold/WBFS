# WBFS CMS — Operations Guide

For the developer maintaining the site. Editors should read `EDITOR-GUIDE.md` instead.
Architecture, decisions and progress: `docs/cms/PLAN.md`.

## 1. How it fits together
- **Next.js 16** site + **Payload CMS 3** in one app, deployed on **Vercel**.
  - Public site: `app/(frontend)/…`. CMS admin: `/admin`. CMS API: `/api/*`.
- **Database:** Neon Postgres (created from the Vercel dashboard). One branch per environment.
- **Uploads:** Vercel Blob (one store per environment). Locally, files go to `./media/`.
- **Public pages are static and cached.**
  - Publishing anything in the CMS invalidates the whole site cache (tag `cms`), so changes show within ~10 s with no redeploy.
  - Public reads: `lib/cms/public.ts` (published content only). Draft preview: `lib/cms/preview.ts`. Pages pick between them with `lib/cms/content.ts`.
- **Content model** (field-by-field map in `FIELD-INVENTORY.md`):
  - Globals: `siteSettings` (no drafts), and page globals `home`, `about`, `donate`, `inOffice`, `eventsPage`. These are built with `cms/globals/pageGlobal.ts`, which provides drafts, 0.5 s autosave, live preview, a form split into **tabs** (one per part of the page, then **Add more sections**) and `moreOptions([...])` for rarely changed fields. Tabs and "More options" are unnamed/presentational, so they never change the database. Tab names live in `cms/tabs.ts`.
  - Collections: `events` (`/events/<slug>`), `pages` (`/<slug>`, built from sections), `media`, `users`.
  - Section blocks: `cms/blocks/index.ts`, rendered by `components/blocks/render-blocks.tsx` with the site's own markup. Style options are limited to the Lawman design.
  - **Live preview:** the admin shows `/preview/enter?path=…` beside the form, and `RefreshOnSave` (draft mode only) re-renders after each autosave.
  - **Click-to-edit:** page markup carries `{...editable('field.path', TAB.x)}` (`lib/cms/editable.ts`, plain `data-cms-*` attributes). Inside the Live Preview frame only, `components/ui/preview-click.tsx` outlines marked parts and posts the clicked field to the admin; `cms/components/PreviewJump.tsx` (an admin provider) opens the tab, unfolds "More options"/rows, focuses and flashes the field. When you add a field to a page, mark where it renders.
  - **Events fill themselves in:** a blank headline uses the event name, a blank date line or date-and-place line uses the date (`lib/cms/eventText.ts`). The **Post a new event** quick form (`/admin/new-event`, `cms/components/quick/`) posts to `POST /api/events/quick-create` (staff only, `cms/quickEvent.ts`).
- **Security:** `cors`/`csrf` are limited to `NEXT_PUBLIC_SERVER_URL` plus the production domains (`payload.config.ts`). API reads need a login, except Media files, which are public. Uploads: images/PDF only, **25 MB max**. Browser uploads go straight to Blob, so the cap is checked when the Media record is saved.

## 2. Environments
| | Database | Blob store | Where |
|---|---|---|---|
| `production` | Neon branch `main` | `wbfs-prod` | Vercel Production (branch `golf-flyer-redesign` until merged) |
| `preview` | Neon branch `preview` | `wbfs-preview` | Vercel Preview deployments |
| `local` | Docker Postgres `127.0.0.1:54329` | `./media` | your machine |

Variables are set per Vercel environment. Names and meanings are in `.env.example`; values are mirrored in 1Password.

- **Env guard:** every data script checks that `DATABASE_URL` points at `EXPECTED_DB_ENDPOINT` for the current `APP_ENV`, and refuses otherwise. For Neon, `EXPECTED_DB_ENDPOINT` is the branch's `ep-…` id.
- Local values that aren't secrets live in `.env.development` (committed). Real secrets never go in git.

## 3. Day-to-day commands (always via npm scripts)
| Task | Command |
|---|---|
| Start local DB | `npm run db:local:up` (Docker Desktop must be running) |
| Use the right Node | `nvm use` (Node ≥ 24.22.3) |
| Dev server | `npm run dev` (or `npm run dev:op` to inject SendGrid secrets from 1Password) |
| Unit tests | `npm run test` |
| Parity + forms tests | `npm run test:e2e` |
| Visual regression | `npm run test:visual` |
| Everything incl. CMS behaviour | `npm run test:cms` (resets a throwaway `wbfs_e2e` DB first) |
| Lint / types | `npm run lint`, `npm run typecheck` |
| Regenerate Payload types / admin import map | `npm run payload:generate:types`, `npm run payload:generate:importmap` |

Never update visual or text baselines to make a test pass: those baselines are the site as it was before the CMS.

## 4. Changing the content model (adding a field)
1. Edit the collection/global in `cms/…`.
2. `npm run payload:generate:types`. If you added custom admin components, also run `npm run payload:generate:importmap`.
3. `npm run payload:migrate:create -- <short-name>` and review the generated SQL in `migrations/`.
   - Keep it **backward-compatible**: add columns before removing old ones, so the previous deployment keeps working.
4. `npm run payload:migrate` applies it locally. Commit the migration together with the code.
5. **Preview:** the Vercel preview build runs pending migrations automatically.
6. **Production:** builds **fail if migrations are pending**. Apply them first, deliberately:
   ```
   BACKUP_DIR=/path/outside/repo op run --env-file=<production env file> -- npm run backup
   op run --env-file=<production env file> -- npm run payload:migrate
   ```
   then merge/deploy.
7. If the field references uploads (`relationTo: 'media'`), add its path to `MEDIA_REFERENCES` (collections) or `GLOBAL_MEDIA_REFERENCES` (globals) in `cms/hooks/mediaRefs.ts`. Otherwise in-use files could be deleted. Block paths are added automatically from `BLOCK_MEDIA_PATHS` in `cms/blocks/index.ts`, so update that when a block gains an upload field.

**How-to guides for editors** (`/admin/help`, and the block at the top of the admin home screen) are written in `cms/help/guides.ts`. Use plain English, one action per step, and the exact on-screen words in `**bold**`. The views are in `cms/components/help/` and the styles in `app/(payload)/custom.scss`. After changing the admin (labels, fields, buttons) or a guide, run `npm run docs:help-screenshots`. It carries out every guide's steps in a real admin and rewrites `public/admin-help/*.jpg`, so a guide that names a button that no longer exists fails the run. `tests/unit/help-guides.test.ts` checks every screenshot exists, links are valid, and there's no jargon. Field labels are made plain by `cms/fields/plainLabels.ts` (e.g. `ctaOverline` → "Small gold line", list rows → "Add Button"); labels only, so the database doesn't change.

**Adding a section block:** add the `Block` to `cms/blocks/index.ts` (and to `SECTION_BLOCKS`), add a case to `renderBlock` in `components/blocks/render-blocks.tsx`, then generate types, the import map and a migration as above. Extend the "every section type" e2e in `tests/e2e/cms/cms.spec.ts`.

**Adding a new page global:** create it with `pageGlobal({...})`, register it in `payload.config.ts`, render `<RenderBlocks blocks={page.extraSections} />` at the end of the page, add a `seedPageGlobal` entry, and add its slug to `RESERVED_SLUGS` in `cms/fields/validators.ts`.

## 5. Seeding and accounts
- `npm run seed` copies the original site content into an empty CMS.
  - It is **insert-only**: anything that already exists is skipped, so re-running never overwrites editors' work.
- First admin in a new environment:
  ```
  ADMIN_NAME="Full Name" ADMIN_EMAIL=person@example.com npm run users:bootstrap-admin
  ```
  It prints a one-time setup link (valid 72 h).
  - Public first-user signup is blocked everywhere except local.
- **New users:** Admin → Users → **Invite a user** gives you a setup link to send them.
- **Forgotten passwords:** Admin → Users → the user → **Copy setup / reset link**.
  - There is no email service, and the built-in "forgot password" is intentionally disabled.
- Accounts lock for 10 minutes after 5 failed logins. Admins can unlock them from the user's page.

## 6. Backups and restore
**Back up** weekly and before every production migration:
```
BACKUP_DIR=/path/outside/repo npm run backup     # with the target env's variables injected
```
- Writes `db.dump`, every uploaded file and a checksummed `manifest.json`.
- Marks the folder `COMPLETE` only after verifying the files.
- Keeps the newest 8 backups per environment.
- Needs Docker running (pg_dump runs in `postgres:18-alpine`).

**Restore** only ever goes into an **empty** database and an **empty** file store:
```
RESTORE_FROM=/path/to/backup-folder npm run restore
```
Files are restored at their original paths, so Payload's URLs work for the new store without editing records.

**Production recovery (manual):**
1. In Vercel/Neon, create a new Neon branch and a new Blob store.
2. With env vars pointing at them (`APP_ENV=production`, `EXPECTED_DB_ENDPOINT` = new `ep-…` id), run `npm run restore` from the latest complete backup.
3. Deploy a preview pointed at the restored resources and run the smoke tests against it (`PLAYWRIGHT_BASE_URL=<url> npm run test:e2e`).
4. Switch the Production env vars (`DATABASE_URL`, `EXPECTED_DB_ENDPOINT`, `BLOB_READ_WRITE_TOKEN`) to the restored resources and redeploy production.
5. Record what happened in PLAN.md §10.

## 7. Rollback (code)
- Vercel → Deployments → previous production deployment → **Instant Rollback**.
- Migrations are add-only, so the previous build keeps working with the newer schema.
- The pre-CMS deployment doesn't use the database at all.

## 8. Free-tier limits to watch
- **Vercel Blob:** ~1 GB storage and ~10 GB downloads per month. **Going over blocks Blob for 30 days** and uploaded images stop loading.
- **Neon:** ~0.5–1 GB storage; compute scales to zero.
- Check Vercel → Usage and Storage monthly. Usage projections are recorded in PLAN.md §10.

## 9. Rotating secrets
- **`PAYLOAD_SECRET`:** generate a new value in 1Password, update it in Vercel (per environment), redeploy. Everyone is logged out.
- **Neon password / Blob token:** rotate in the Vercel Storage tab, update the env vars and 1Password, redeploy.
- **SendGrid key:** rotate in SendGrid, then update Vercel + 1Password.

## 10. Go-live runbook (one time)
Production is untouched until step 5. The pre-CMS production deployment doesn't use the database, so it's always a safe rollback target.
Production credentials are injected per command (1Password `op run`, or a one-time secret file). They are never stored in the repo.

1. **Rehearse on preview from empty** (preview credentials):
   `npm run db:preview:reset` → `npm run cms:verify` → `PLAYWRIGHT_BASE_URL=<preview url> npm run test:e2e` and `npm run test:visual`.
2. **Record the rollback target:** Vercel → Deployments → the current Production deployment. Copy its URL/ID into PLAN.md §10.
3. **Prepare production data** (production credentials, `APP_ENV=production`, `EXPECTED_DB_ENDPOINT=ep-super-math-bcor7o8w`):
   `npm run payload:migrate` → `npm run seed` → `ADMIN_NAME=… ADMIN_EMAIL=… npm run users:bootstrap-admin` (once per admin) → `npm run cms:verify` (must say *ready*).
4. **Stage the deploy:** Vercel → Settings → Environments → Production → turn **off** "Auto-assign Custom Production Domains". The next production build gets its own URL but not the domain.
5. **Merge** `cms-payload` into the production branch (`golf-flyer-redesign`) and push. The production build checks that no migrations are pending.
6. **Test the staged build** at its deployment URL: `PLAYWRIGHT_BASE_URL=<that url> npm run test:e2e` and `npm run test:visual`. Public pages only: the CMS login works on the real domain only (allowed origins).
7. **Promote:** Vercel → Deployments → that deployment → ⋯ → **Promote**. Smoke-test the domain (`PLAYWRIGHT_BASE_URL=https://weisburnforsheriff.com npm run test:e2e`), then turn auto-assign back **on**.
8. **First production backup:** `BACKUP_DIR=<folder outside the repo> npm run backup` (production credentials).
9. **Owner UAT** on https://weisburnforsheriff.com/admin, then invite the first editor (Users → Invite a user).
10. After a week: record actual usage (Vercel → Usage, Storage) in PLAN.md §10. Remove the old `ORIGIN`, `USERNAME` and `PASSWORD` Vercel variables (the stale proxy is gone).

**Rollback:** Vercel → Deployments → the recorded pre-CMS deployment → **Instant Rollback**. Content in the database is unaffected and returns when you roll forward.
