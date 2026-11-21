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
  - Public reads: `lib/cms/public.ts` (published content only). Draft preview: `lib/cms/preview.ts`.

## 2. Environments
| | Database | Blob store | Where |
|---|---|---|---|
| `production` | Neon branch `main` | `wbfs-prod` | Vercel Production (branch `golf-flyer-redesign` until merged) |
| `preview` | Neon branch `preview` | `wbfs-preview` | Vercel Preview deployments |
| `local` | Docker Postgres `127.0.0.1:54329` | `./media` | your machine |

Variables are set per Vercel environment. Names and meanings are in `.env.example`; values are mirrored in 1Password.

- **Env guard:** every data script checks that `DATABASE_URI` points at `EXPECTED_DB_ENDPOINT` for the current `APP_ENV`, and refuses otherwise. For Neon, `EXPECTED_DB_ENDPOINT` is the branch's `ep-…` id.
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
7. If the field references uploads (`relationTo: 'media'`), add it to `MEDIA_REFERENCES` in `cms/hooks/mediaRefs.ts`. Otherwise in-use files could be deleted.

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
- Needs Docker running (pg_dump runs in `postgres:17-alpine`).

**Restore** only ever goes into an **empty** database and an **empty** file store:
```
RESTORE_FROM=/path/to/backup-folder npm run restore
```
Files are restored at their original paths, so Payload's URLs work for the new store without editing records.

**Production recovery (manual):**
1. In Vercel/Neon, create a new Neon branch and a new Blob store.
2. With env vars pointing at them (`APP_ENV=production`, `EXPECTED_DB_ENDPOINT` = new `ep-…` id), run `npm run restore` from the latest complete backup.
3. Deploy a preview pointed at the restored resources and run the smoke tests against it (`PLAYWRIGHT_BASE_URL=<url> npm run test:e2e`).
4. Switch the Production env vars (`DATABASE_URI`, `EXPECTED_DB_ENDPOINT`, `BLOB_READ_WRITE_TOKEN`, `BLOB_PUBLIC_HOST`) to the restored resources and redeploy production.
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
