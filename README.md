# Weisburn for Sheriff — website

Campaign site for Sheriff Eric Weisburn ([weisburnforsheriff.com](https://weisburnforsheriff.com)): **Next.js 16** with **Payload CMS 3** embedded, deployed on **Vercel** with a Vercel-provisioned **Neon** Postgres database and **Vercel Blob** for uploads.

- **Editors:** log in at `/admin`. See [docs/cms/EDITOR-GUIDE.md](docs/cms/EDITOR-GUIDE.md).
- **Developers / operations:** [docs/cms/OPERATIONS.md](docs/cms/OPERATIONS.md) covers environments, scripts, migrations, backups, recovery and secrets.
- **Where each piece of content lives:** [docs/cms/FIELD-INVENTORY.md](docs/cms/FIELD-INVENTORY.md).
- **Plan, decisions and progress log:** [docs/cms/PLAN.md](docs/cms/PLAN.md).

## Local development
```bash
nvm use                 # Node 24 (>= 24.22.3)
npm install
npm run db:local:up     # Postgres in Docker (Docker Desktop must be running)
npm run payload:migrate # apply migrations to the local DB
npm run seed            # copy the site's content into the empty CMS (insert-only)
ADMIN_NAME="Your Name" ADMIN_EMAIL=you@example.com npm run users:bootstrap-admin   # prints a setup link
npm run dev             # http://localhost:3000, CMS at /admin
```
Secrets (SendGrid, deployed databases, Blob tokens) are never committed. They live in 1Password and Vercel. Use `npm run dev:op` to inject them via `op run`.

## Tests
| Command | What it checks |
|---|---|
| `npm run test` | Unit tests (validators, env guard, content helpers, upload limit) |
| `npm run test:e2e` | Smoke, sign-up forms and text parity against the pre-CMS baselines |
| `npm run test:visual` | Visual regression at 390 px and 1440 px against the pre-CMS baselines |
| `npm run test:cms` | All of the above plus CMS behaviour, on a freshly reset `wbfs_e2e` database |
| `npm run lint`, `npm run typecheck` | Static checks |

Set `PLAYWRIGHT_BASE_URL=<deployment url>` to run `test:e2e` or `test:visual` against a Vercel deployment.
