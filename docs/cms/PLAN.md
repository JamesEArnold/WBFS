# WBFS — Payload CMS Plan (editor logins + editable content, on Vercel free tier)

> **Single source of truth for this project across sessions/context windows.**
> Picking this up? Read §0 (Context & Decisions) and §10 (Progress Log) first, then continue at the first unchecked item. Update §10 at the end of every session and commit it.
>
> **Rigor level (owner direction, 2026-11-21):** this is a small campaign site with one editor. Build it solidly, but **do not chase every edge case — especially concurrency/race conditions or elaborate disaster-recovery machinery.** §9 lists edge cases that were raised in review and deliberately deferred. Don't re-add them without the owner asking.

---

## 0. Context & Decisions (durable — don't re-litigate without the owner)

### 0.1 The ask
The customer (Weisburn for Sheriff campaign) wants **other people to maintain site content**: the owner can **add users**, users **log in**, **edit/update content**, and **add new pages**. In practice: new versions of existing pages (new events) plus updating/extending content on existing pages.

### 0.2 Hard constraints from the owner (James)
1. **No third-party hosted CMS/service.** Keep deploying via **Vercel** (GitHub → Vercel, as today).
2. **Editors must NOT need a GitHub account.** Logins belong to the site.
3. **Completely free**, contained within Vercel. A database **provisioned inside Vercel** (Neon via Vercel Marketplace) and Vercel Blob are approved.
4. One editor to start; must support more later.

### 0.3 Options considered and rejected
| Option | Rejected because |
|---|---|
| Sanity / Contentful / Storyblok / Prismic | Third-party hosted service (constraint 1). |
| Keystatic (GitHub mode), Decap CMS | Editors need GitHub accounts (constraint 2). Keystatic Cloud is hosted. |
| TinaCMS self-hosted | Viable but needs Redis + GitHub token plumbing + Auth.js; less polished; 1–2 min publish latency. |
| Custom-built admin | We'd own forms, uploads, user management forever. Highest effort. |
| Squarespace/Wix/Webflow | Lose the custom "Lawman" design and code control. |

### 0.4 Chosen approach
**Payload CMS 3.x embedded in the existing Next.js app**, on Vercel:
- Admin UI at `/admin`; Payload REST at `/api/*`. **GraphQL disabled** (unused; less attack surface).
- DB: **Neon Postgres via Vercel Marketplace** (free). Media: **Vercel Blob** (`@payloadcms/storage-vercel-blob`). Rich text: `@payloadcms/richtext-lexical`.
- **No email service.** SendGrid's free plan was retired in 2025, so CMS logins don't depend on email: admins generate **setup/reset links** and send them however they like (§3.4). The existing SendGrid mailing-list/volunteer forms are untouched.
- Public pages are statically rendered and cached; publishing invalidates the cache (§2.2).

### 0.5 Owner preferences (from ~/.claude/CLAUDE.md + memory)
- **Always use npm scripts**, never ad-hoc CLI commands.
- **Secrets via 1Password `op run --`.** Never read/print `.env` files; never hardcode credentials.
- **Tests are the specification** — fix implementation, don't weaken expectations. Dual mobile+desktop rendering → use `within()` / `data-testid`.
- **Prototype before sweeping changes**; owner sign-off before large multi-file changes.
- **Minimal, literal content edits** — migrate copy verbatim.
- **Proportionate rigor** — no edge-case/concurrency rabbit holes (see banner above, §9).
- Bugs: propose a structured plan before fixing.

### 0.6 Facts about the current codebase (2026-11-21)
- **Stack:** Next.js **13.4.12** App Router, React 18.2, TS 5.1, Tailwind 3.3. Node 24 locally. **No tests.**
- **All content hardcoded** in TSX, inline styles from `components/designs/lawman/theme.ts` (`LAWMAN` tokens).
- **Live routes:** `/` (`app/page.tsx` → `components/designs/lawman/home.tsx`, 502 lines, `'use client'`), `/about`, `/donate` (`'use client'`, Donorbox iframe), `/events` (shows **build-time** month/year via `new Date()`), `/events/golf-fundraiser-3` (sold-out sticky banner, flyer PDF + trifold JPEGs), `/time-in-office`. Chrome: `components/designs/lawman/{header,footer}.tsx` via `components/site-chrome.tsx`. `NotificationBanner` exists but is commented out in `app/layout.tsx`.
- **Kept as-is:** `app/mailingList/route.ts`, `app/volunteerList/route.ts` (SendGrid: `SENDGRID_SECRET`, `SENDGRID_MAILING_ID`, `SENDGRID_VOLUNTEER_ID`).
- **Stale/dangerous leftovers:**
  - `app/api/route.js` — old basic-auth `http-proxy`; **collides with Payload `/api/*`** → delete.
  - `vercel.json` — routes all traffic to non-existent `app/api/node-proxy.js` → remove; verify on preview.
  - **`.env` is tracked in git** (`.gitignore` only covers `.env*.local`) → untrack, ignore, rotate secrets. Don't open/print it.
  - `components/calendar.tsx` has a junk `API_KEY`; unused.
- **Dead code** (no live route imports it): `components/{about-me,calendar,call-to-action,carousel,footer,main-accordion,main-nav}.tsx`, `components/ui/{event-card,atc-wrapper,add-to-calendar,videos,checkbox-with-text,mobile-menu,navigation-menu,button-contribution,accordion}.tsx`. Likely-dead deps (grep-verify before removing): `react-slick`, `slick-carousel`, `react-advanced-news-ticker`, `@ericz1803/react-google-calendar`, `add-to-calendar-button(-react)`, `react-social-media-embed`, `print-js`, `basic-auth`, `http-proxy`, `http`, `@radix-ui/react-accordion`, `@radix-ui/react-navigation-menu`, `@fortawesome/*`, `react-detect-click-outside`. `_archive/` holds retired pages (not routed).
- **Live deps that must survive React 19:** `react-hook-form`, `@hookform/resolvers`, `zod`, `axios`, `react-toastify`, `react-spinners`, `@radix-ui/react-{label,checkbox,slot}`, `@vercel/analytics`, `@vercel/speed-insights`, `lucide-react`, `class-variance-authority`, `tailwind-merge`, `clsx`.
- **Editable assets on live pages total ~14 MB** (largest: golf trifold PDF 2.8 MB; photos 0.3–2.1 MB). Design-chrome assets (favicons, `SheriffStar.PNG`, `signature.png`, social icons, logo) stay in `public/` and in code. `public/` is 150 MB overall (incl. `.psd`s) — not migrated.
- `next-sitemap` runs in `postbuild`; `public/robots.txt` and `public/sitemap*` are gitignored build outputs.
- **Branches:** working branch `golf-flyer-redesign` is far ahead of `main` (main's tip is from 2023; diverged by 4 commits). Vercel's Production branch is **unconfirmed** (Q2).

### 0.7 Free-tier facts (re-verify in Phase 0)
- **Vercel Hobby** has historically been documented as **non-commercial personal use only**. On 2026-11-21 the evidence conflicted: search results still showed that wording, but a later fetch of the [Hobby docs](https://vercel.com/docs/plans/hobby) and [fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) did not. A client campaign site with a donate page may count as commercial. This applies to the site today, independent of Payload. **Phase 0 gate.**
- **Neon Free (via Vercel):** ~0.5–1 GB storage; compute scales to zero.
- **Vercel Blob (Hobby):** ~1 GB storage, ~10 GB transfer/month. **If you go over, Blob is blocked for 30 days** (no billing).
- **Vercel Functions:** **4.5 MB request-body limit** (affects uploads).

### 0.8 Open questions (record answers here)
- **Q1 (gate)** Vercel plan (Hobby or Pro)? Do current Vercel terms allow this site on Hobby? Ask Vercel if unclear. If not allowed, "completely free" isn't achievable and the owner decides.
  - **Answer (2026-11-21):** owner says the Vercel plan/terms situation is fine; proceed. Gate considered closed by owner decision.
- **Q2** Which branch is Vercel Production?
  - **Answer (2026-11-21):** `golf-flyer-redesign` is the branch deployed to production. Branch `cms-payload` from it. (`main` is stale, from 2023.)
- **`.env` tracked in git:** owner acknowledged (2026-11-21); proceed with untracking in Phase 0.
- **Q3** Roles beyond admin/editor? Default: `admin`, `editor`.
  - **Answer (2026-11-21):** `admin` + `editor` only.
- **Q4** Should editor-created pages appear in the nav automatically? Default: nav is an editable list in Site Settings.
  - **Answer (2026-11-21):** manual nav list in Site Settings; new pages are not added automatically.
- **Q5** First editor's name and email.
  - **Answer (2026-11-21):** decide at go-live (Phase 7).

---

## 1. Scope

**In scope (v1 = "completed product")**
1. Editor login at `/admin`; admins add users and reset passwords via setup links.
2. All content on live pages editable: Home, About, Donate, In Office, Events list, header/footer/site settings, announcement banner.
3. **Events collection**: create/edit/sold-out/archive events at `/events/[slug]` using the golf-page design; `/events/golf-fundraiser-3` keeps working.
4. **Extending content**: design-locked section blocks; existing pages accept optional extra sections; a generic **Pages** collection at `/[slug]`.
5. Drafts + preview; publishing goes live within ~10 s without a redeploy.
6. Image/PDF uploads to Vercel Blob; alt text required; resized automatically.
7. The site looks identical to today after migration.
8. Tests, editor guide, operations guide, simple backups.

**Out of scope:** redesign; freeform layout editor; changes to SendGrid forms or Donorbox; migrating design-chrome assets; multi-language; email service; the hardening items in §9.

---

## 2. Architecture

### 2.1 Layout
```
app/
  (frontend)/
    layout.tsx               # current root layout; chrome data from CMS
    page.tsx                 # Home  -> global `home`
    about/ donate/ time-in-office/   # globals `about`, `donate`, `inOffice`
    events/page.tsx          # global `eventsPage` + collection `events`
    events/[slug]/page.tsx   # collection `events`
    [slug]/page.tsx          # collection `pages`
    sitemap.ts, robots.ts    # runtime, cached, invalidated with content
    preview/enter/route.ts, preview/exit/route.ts
    mailingList/route.ts, volunteerList/route.ts   # moved unchanged
  (payload)/                 # Payload-generated admin + api
payload.config.ts, payload-types.ts
cms/
  collections/ Users.ts Media.ts Events.ts Pages.ts
  globals/     SiteSettings.ts Home.ts About.ts Donate.ts InOffice.ts EventsPage.ts
  blocks/      fields/  access/  hooks/  endpoints/
lib/cms/
  payload.ts   # the only place that gets a Payload instance
  public.ts    # cached public reads (published content only)
  preview.ts   # uncached draft reads for logged-in editors
components/blocks/   # block renderers (reuse Lawman markup)
migrations/          # committed Payload migrations
scripts/  seed.ts  bootstrap-admin.ts  backup.ts  env-guard.ts
docs/cms/ PLAN.md (this file)  EDITOR-GUIDE.md  OPERATIONS.md  FIELD-INVENTORY.md
```

### 2.2 Rendering, caching, preview, access
- **Version pin (Phase 0):** latest stable Payload 3.x, plus the exact Next/React/Node versions it supports. Also record which cache API is used (`unstable_cache` or `'use cache'`) and the invalidation call (`revalidateTag`/`revalidatePath`, callable from Payload hooks; **not** `updateTag`, which works only in Server Actions). Record in §10.
- **No anonymous API reads.** Every collection and global has API `read` = logged-in admin/editor only. The public site never calls REST; media files are served from public Blob URLs. Drafts can't leak through the API.
- **Public reads (`lib/cms/public.ts`)** are the one audited place that reads content without a user. Every function enforces published-only:
  - Collections: `_status = 'published'`, and for events `status != 'hidden'`.
  - Page globals: data returned only if `_status === 'published'`; otherwise `notFound()`.
  - All reads are wrapped in the data cache with tag `cms`.
  - ESLint `no-restricted-imports` keeps `getPayload` inside `lib/cms/payload.ts`. Elsewhere, Local API calls pass `overrideAccess: false` with `req`; this is a code-review rule, not machine-enforced.
- **Routes:** static by default, `generateStaticParams` for events/pages, `dynamicParams = true`, `notFound()` for missing.
- **Preview:**
  - `preview/enter` checks the Payload login session, then enables Next draft mode.
  - `lib/cms/preview.ts` reads with `draft: true` and the user, and is never cached.
  - Draft-mode responses are `Cache-Control: private, no-store`.
- **Invalidation:** any publish/unpublish/delete on any collection, global, or media invalidates tag `cms` (whole site; < 30 routes). Hooks skip when run from scripts (`context.disableInvalidate`).
- **Freshness target:** a change is visible to anonymous visitors within ~10 s of publishing. Tested simply: publish, then poll until it shows (fail at 10 s).
- **Proven in Phase 2:** normal requests are cache hits and `next build` lists routes as static/ISR; preview shows the draft with `no-store`; an anonymous request after previewing never shows draft content.

### 2.3 Content rules
- **Slugs can't be changed after first publish** by editors (server-side `beforeChange` check using a `firstPublishedAt` field; admins can override). No redirect system in v1.
- **`siteSettings`** keeps version history but has **drafts disabled**, so it can't be unpublished. Banner/nav edits go live on save.
- **Media URLs are unique per upload** (adapter random suffix), so a replaced image or PDF never shows stale cached bytes.
- **Raw Blob URLs aren't allowed in content.** Links to files use a "Link to file" (Media relationship) option, so every file is a Media doc and backups are complete.
- **Media in use can't be deleted:** a `beforeDelete` hook rejects deletion while the published or draft content of any event/page/global references it, and shows where it's used.

### 2.4 Environments
| Env | DB | Blob store | Used by |
|---|---|---|---|
| `production` | Neon branch `main` | `wbfs-prod` | Vercel Production |
| `preview` | Neon branch `preview` | `wbfs-preview` | Vercel Preview deployments |
| `local` | Local Postgres via Docker (`npm run db:local:up`); fallback Neon branch `dev` | `wbfs-local` | Local dev + tests |
- Env vars are scoped per Vercel environment; production credentials never exist in Preview or local.
- **Env guard:** `APP_ENV` + `EXPECTED_DB_ENDPOINT` (the Neon `ep-…` id). `scripts/env-guard.ts` aborts migrate/seed/backup/test-fixture scripts if the connection string doesn't match the expected endpoint for `APP_ENV`. Destructive test scripts refuse `production`.
- **Migrations:** `push: false` everywhere. Migrations are committed files.
  - Preview builds run `payload migrate` automatically.
  - Production builds **don't migrate**; they fail if migrations are pending.
  - Production migrations: `npm run backup`, then `npm run payload:migrate` (with `op run`), then deploy. Keep migrations backward-compatible (add before removing).
- Preview data is **seeded, never cloned from production**. `npm run db:preview:reset` wipes the preview schema, then migrates, seeds, and bootstraps a preview admin.

### 2.5 Uploads
- **Phase 2 spike:** Vercel Blob adapter with `clientUploads: true` (browser uploads directly to Blob, avoiding the 4.5 MB function limit). It passes if an 8 MB phone photo and a 12 MB PDF upload, get resized, and render.
- **Fallback:** server uploads capped at 4 MB, with a clear error message and resizing tips in the editor guide.
- Allowed types: JPEG, PNG, WebP, HEIC, PDF. Images resized to 640/1280/1920 WebP. `images.remotePatterns` includes the Blob host for the environment.

---

## 3. Content model

### 3.1 Collections
- **users** (auth): `name`, `email`, `role: admin | editor` (default editor).
  - Only admins create/delete users or change roles. Users may edit their own name and password.
  - Lockout: 5 attempts, 10 min.
- **media** (upload): `alt` (required), `caption`, `importKey` (hidden, for seeded items). Admin/editor only via API.
- **events** (drafts, versions max 20):
  - `importKey`, `title`, `headingAccent`, `slug`, `firstPublishedAt`
  - `status: upcoming | soldOut | past | hidden`, `date`, `dateLabel`, `location`, `overline`, `subtitle`, `facts[]`, `summary` (rich text), `listingCtaLabel`
  - `soldOutBanner { enabled, heading, body }`, `heroBlurb`
  - `buttons[] { label, linkType: url|file|page, url | file | page, style, newTab }`
  - `flyerPdf`, `flyerImages[]`, `extraSections` (blocks), `seo`
  - Visibility: `/events` lists published `upcoming|soldOut` events by date. `past` = page stays live but unlisted. `hidden` = 404.
- **pages** (drafts, versions max 20): `importKey`, `title`, `slug` (reserved: `admin, api, events, about, donate, time-in-office, mailingList, volunteerList, preview, sitemap.xml, robots.txt, _next`), `firstPublishedAt`, `hero`, `sections` (blocks), `seo`.

### 3.2 Globals
- **siteSettings** (versions, no drafts): banner `{ enabled, text, linkLabel, linkUrl }`, nav `[{label, href}]`, social links, contact email, footer disclaimer ("Paid for by…"), default SEO.
- **home**, **about**, **donate**, **inOffice**, **eventsPage** (drafts):
  - Fields derived verbatim from each page's TSX (Phase 3); each has `extraSections`.
  - Two-tone headings are modeled as `heading` + `headingAccent`.
  - Donate's Donorbox URL is an `embed` field restricted to an allowlist.
  - The `/events` "★ {Month Year} ★" overline keeps its current behavior; tests mask it.

### 3.3 Section blocks (design-locked)
- Blocks: `heroBanner`, `richText`, `imageWithText`, `photoGallery`, `factsList`, `ctaButtons`, `timeline`, `quoteBand`, `embed`, `soldOutBanner`.
- `embed` is limited to an allowlist (donorbox.org, youtube.com, facebook.com), validated server-side.
- Style options are `LAWMAN` tokens only (e.g., `background: black | nearBlack | cream`).

### 3.4 Users: onboarding & password resets (no email)
- **First admin:** `npm run users:bootstrap-admin` (`op run`, env-guarded) creates the owner and James as admins **before** a deployment using that DB is shared.
- **Public first-user signup is blocked outside local:**
  - A `users` `beforeOperation` guard rejects `create` when there's no logged-in user and the call isn't from the bootstrap script.
  - `middleware.ts` 404s `/admin/create-first-user` and `POST /api/users/first-register`.
- **Invite:** an admin-only "Invite user" action creates the user with a random hidden password, then generates a reset token (`forgotPassword` with `disableEmail: true`) and shows a **setup link** to copy. The link expires in 72 h. "Copy setup link" on any user issues a fresh link, for resends and forgotten passwords.
- **Built-in forgot-password is closed:**
  - A `beforeOperation` guard rejects `forgotPassword` unless it comes from the admin endpoints.
  - The "Forgot password?" screen is replaced with "Ask a site admin for a reset link".
- Recommend at least 2 admins (owner + James).

---

## 4. Seeding & content migration
- `npm run seed` (env-guarded, Local API, `context.disableInvalidate`) is **insert-only**: each doc has a stable `importKey` (e.g. `event:golf-2026`, `global:home`), and existing ones are skipped. Re-running never overwrites editor changes.
- Seed uploads the ~14 MB of editable assets from `public/` into Media with their current alt text. Originals stay in `public/` until 30 days after go-live.
- Content is copied **verbatim**. `docs/cms/FIELD-INVENTORY.md` maps every hardcoded string, image and link on each page to a field.
- Later content changes go through migrations, never by re-running seed.

---

## 5. Implementation phases
Each phase: commits on `cms-payload`, a Vercel preview deploy, exit criteria met. Production is untouched until Phase 7.

### Phase 0 — Gate, version pin, safety (no behavior change)
1. **Gate:** answer Q1, with dated evidence. Confirm Neon and Blob are available at $0. Record the current production traffic baseline (Vercel Analytics) in §10.
2. Pin versions (§2.2) and record them in §10.
3. Q2: find the Production branch. Branch `cms-payload` from what's live.
4. Untrack `.env`, ignore `.env*` except `.env.example` (variable names only) and `.env.op` (`op://` references only). Owner rotates any secrets that were in it.
5. Test tooling: Vitest (`npm run test`), Playwright (`npm run test:e2e`, `test:visual`, `test:visual:update`), `npm run typecheck`.
6. **Visual baselines before any change**, against a production build:
   - every live route at 390×844 and 1440×900, full page, animations off;
   - mask the `/events` month/year and the Donorbox iframe;
   - commit the baselines.
7. Text snapshots of each route's visible text. Smoke tests: 200 status, `<h1>`, header/footer, signup forms render.
8. Exit: gate + pin recorded; tests green on the untouched site.

### Phase 1 — Cleanup + framework upgrade (no visible change)
1. Delete `app/api/route.js` and the `vercel.json` routes, plus dead components and deps (grep-verify each).
2. Upgrade Next/React to the pinned versions using the official codemods (via npm script). Replace `next/head` in layout with Metadata API icons; fix async `params`.
3. Upgrade live deps for React 19. Set Node 24.x on Vercel and `engines` (`>=24.22.3`), add `.nvmrc`; upgrade local Node via nvm.
4. Exit: build/lint/typecheck clean; Phase 0 visual + text + smoke tests pass **without updating baselines**; preview serves every route; signup forms work.

### Phase 2 — Payload foundation (prototype gate)
1. Provision Neon (`main`, `preview`), Blob stores (`wbfs-prod`, `wbfs-preview`), and local Postgres.
   - Env vars per environment: `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SERVER_URL`, `APP_ENV`, `EXPECTED_DB_ENDPOINT`.
   - Mirror them in 1Password.
2. Install the pinned Payload with `withPayload` and GraphQL off. Move the site into `app/(frontend)/` and add `app/(payload)/`.
3. Build `users`, `media`, `siteSettings` and `events`, along with:
   - access rules and the public/preview read split;
   - the invalidation hook and env guard;
   - bootstrap-admin, the first-user block, invite/setup links, and the forgot-password closure.
4. Migrations workflow (§2.4). Run the upload spike (§2.5) and record the decision.
5. Seed site settings, the golf event, and its assets.
6. Convert `/events`, `/events/[slug]` (replacing the golf page file), and header/footer/banner to the CMS.
7. Rendering proofs (§2.2) automated.
8. **Prototype gate**, on the preview deploy. The owner:
   - opens a setup link and logs in as an editor;
   - edits the banner;
   - creates an event with an image and a PDF, previews it, and publishes it, seeing it live within ~10 s;
   - marks it sold out, then unpublishes it.

   **Owner sign-off is required before Phase 3.**
9. Exit: chrome and events routes match the baselines; Phase 2 tests pass.

### Phase 3 — Convert remaining pages (one at a time)
Order: Time In Office → Donate → About → Home. For each page:
- list its fields in FIELD-INVENTORY.md and define the global;
- extend the seed;
- turn the page into a server component that fetches content and passes props to small client components, with identical markup;
- render `extraSections` (nothing when empty).

Exit per page: visual + text tests pass **without baseline changes**; an edit-and-restore e2e for one text field, one image and one link.

### Phase 4 — Blocks + generic Pages + sitemap
1. Blocks + renderers (§3.3).
2. `pages` collection and the `[slug]` route, with reserved slugs and 404s.
3. Replace `next-sitemap` with `app/sitemap.ts` + `app/robots.ts`:
   - cached with tag `cms`;
   - includes published pages and events (except hidden ones);
   - disallows `/admin`, `/api`, `/preview`.

   Remove `postbuild` and the old config.
4. Exit: an e2e builds a page from every block type and publishes it; the sitemap updates without a rebuild.

### Phase 5 — Hardening (proportionate)
1. Security settings:
   - a strong `PAYLOAD_SECRET`;
   - `serverURL`, `cors` and `csrf` set to the production and preview domains;
   - `/admin` noindex;
   - embed allowlist and upload limits enforced.
2. **Backups:** `npm run backup` (env-guarded, `op run`) does a `pg_dump` and downloads every Media file (with a manifest of paths and checksums) into an owner-designated folder, keeping the last 8. Run it weekly and before every production migration.
3. **Restore:** `npm run restore -- <folder>` restores into an **empty** local DB and a scratch Blob store at the same file paths. Do one restore drill and check that a page with an image and a PDF renders from the scratch store. The production recovery steps in OPERATIONS.md are manual: restore into a new Neon branch and Blob store, point the Production env vars at them, redeploy.
4. **Free-tier check:** after a week of realistic preview use, estimate monthly usage from the Phase 0 traffic baseline (×3 for campaign peaks). It should stay comfortably under 50% of each free limit. Record in §10.
5. Performance: frontend routes are static/ISR; Lighthouse is no worse than the Phase 0 baseline.

### Phase 6 — Docs
- `docs/cms/EDITOR-GUIDE.md` (plain language, screenshots): logging in with a setup link, asking for a reset, banner, events (create, sold out, archive), uploads + alt text, extra sections, new pages, preview/publish/unpublish, adding a user (admins).
- `docs/cms/OPERATIONS.md`: env setup, scripts, migrations, seeding, backup/restore, recovery steps, rotating secrets, adding a field, checking free-tier usage, rollback.
- Update the README.

### Phase 7 — Go-live
1. **Rehearse** steps 3–7 once on preview from an empty DB.
2. Record the current production deployment ID, which is the rollback target.
3. **Set up production data first** (local machine, `op run`, env-guarded):
   - `payload:migrate`, then `seed` (everything published), then `users:bootstrap-admin`;
   - `npm run cms:verify` confirms every global is published, the golf event exists, and there's at least one admin.
4. Pause auto-deploys for the production branch, then merge `cms-payload` into it.
5. `npm run deploy:prod:staged`: a production build of the merge commit **without the domain**. Run smoke, visual and text tests against it.
6. `npm run deploy:prod:promote` with that deployment's ID. Run smoke tests on the domain. Re-enable auto-deploys.
7. Take the first production backup.
8. Owner UAT (§7); invite the first editor (Q5).
9. Watch usage for a week and record it in §10.
10. **Rollback:** Vercel Instant Rollback to the recorded pre-CMS deployment, which doesn't use the DB.

---

## 6. Testing strategy (tests = spec)
- **Unit (Vitest):**
  - access rules (anonymous/editor/admin);
  - reserved and immutable slug validation;
  - embed allowlist;
  - Blob-URL rejection;
  - event listing filter and sort;
  - env guard;
  - invalidation hook (called, and skipped for scripts).
- **Integration (Vitest + Local API, local Postgres):**
  - **Publication states:** never-published, published, published with a newer draft, unpublished, hidden and past events, deleted. The public helpers return the right thing in each case; an unpublished page global gives a 404.
  - **Anonymous REST:** all collections and globals (with or without `draft`) and version endpoints → 403. GraphQL → 404.
  - **Permissions:** editors can't invite users, change roles, or generate links.
  - **Setup links:** a link works once and expires.
  - **Lockdown:** anonymous forgot-password and first-user registration are rejected.
  - **Media:** an image in use can't be deleted; deletion works after the reference is removed.
  - **Seed:** a second run keeps editor changes.
  - **Backup/restore:** restoring into an empty target renders the same content.
- **E2E (Playwright, local production build + preview):**
  - smoke tests;
  - **visual regression** at 390 and 1440 against the Phase 0 baselines, with masked regions;
  - **text snapshots**;
  - rendering proofs (§2.2);
  - admin flows: invite → setup link → login; lockout; banner edit; create/sold-out/unpublish an event; replace an image; create a page from blocks; preview vs public; upload validation; large-file upload per §2.5;
  - sitemap updates;
  - signup forms (SendGrid mocked);
  - per converted page, edit-and-restore.
- **Performance:** build output static/ISR; Lighthouse no worse than baseline.
- Scripts: `test`, `test:integration`, `test:e2e`, `test:visual`, `test:visual:update`, `typecheck`, `lint`.

---

## 7. Definition of Done
**Functional**
- [ ] Admin invites a user; the user sets a password via the setup link and logs in at `/admin`. Expired or used links are rejected.
- [ ] Admin can issue a reset link. Anonymous forgot-password and first-user signup are closed.
- [ ] Everything in FIELD-INVENTORY.md is editable and renders. No hardcoded content is left on live routes, apart from form logic and design chrome.
- [ ] Events: create, edit, sold out, past, hidden, delete; `/events/[slug]` works, as does `/events/golf-fundraiser-3`.
- [ ] A new page can be built from blocks at `/[slug]`, and extra sections can be added to existing pages.
- [ ] Drafts are private and preview shows them. A publish goes live within ~10 s with no redeploy.
- [ ] Editors can't manage users or roles. Anonymous users can't read or write anything via the API.
- [ ] Uploads: alt text required; limits enforced; images resized; large files handled per §2.5. A replaced file shows up fresh.
- [ ] Sitemap/robots are generated at runtime and accurate; `/admin` is noindex.

**Quality**
- [ ] Visual + text regression: all original routes match the Phase 0 baselines on mobile and desktop.
- [ ] All tests green; build, lint and typecheck clean; rendering proofs pass on preview and production; Lighthouse not worse.

**Ops / constraints**
- [ ] Q1 decision recorded.
- [ ] Only Vercel + Vercel-provisioned Neon + Vercel Blob are used; the bill is $0 (the existing SendGrid forms excepted).
- [ ] Production, preview and local are isolated; the env guard works.
- [ ] Projected monthly usage is under 50% of the free limits; numbers recorded.
- [ ] `.env` is untracked and secrets rotated; secrets live in 1Password + Vercel.
- [ ] The stale proxy is removed.
- [ ] A backup has run and one restore drill passed.
- [ ] Go-live used a staged deployment; the rollback target is recorded.
- [ ] EDITOR-GUIDE, OPERATIONS and FIELD-INVENTORY are written; README updated.
- [ ] The owner completed UAT on production, and the first editor is onboarded.

---

## 8. Commands (npm scripts only; secrets via `op run --env-file=.env.op --`)
`dev`, `build`, `vercel-build`, `start`, `lint`, `typecheck`, `test`, `test:integration`, `test:e2e`, `test:visual`, `test:visual:update`, `payload`, `payload:migrate`, `payload:migrate:create`, `payload:generate:types`, `seed`, `cms:verify`, `users:bootstrap-admin`, `db:local:up`, `db:local:down`, `db:preview:reset`, `backup`, `restore`, `deploy:prod:staged`, `deploy:prod:promote`.

---

## 9. Deliberately deferred (raised in cross-model review; owner chose not to pursue)
These came up over 7 rounds of Codex review on 2026-11-21. The owner directed that the project **not** chase edge cases, especially concurrency. Revisit only if the site's scale or editor count grows a lot, or the owner asks.
- **Concurrency:** a media delete racing a content save that references it (would need advisory locks); concurrent redemption of the same setup token (Payload's reset isn't atomic); writes during a backup (would need a DB snapshot export or write freeze); writes during a recovery cutover.
- **Strict cache revocation:** a guarantee that *no* stale response is served after unpublish, versus the ~10 s target used here.
- **Version-restore bypass:** Payload's `restoreVersion` skips `beforeChange` hooks, so restoring an old version could bring back a changed slug or a reference to deleted media. Low risk with one trusted editor; add `beforeOperation` guards if it matters.
- **Recovery machinery:** a resumable recovery state machine, a staged production build for recovery, code-version/schema tracking per backup, recording which code versions were deployed in the DB, an immutable-migrations lock file, and fault-injection tests.
- **Machine-enforced Local API boundary:** a custom AST lint rule requiring `overrideAccess` on every call. A code-review rule is used instead.
- **Media lifecycle:** delaying Blob deletes until after backups expire (tombstones + GC); blocking deletion of media referenced only by old versions.
- **Rollback rehearsal** in production, and automated suspend/re-enable of auto-deploys beyond the manual steps in Phase 7.

---

## 10. Progress log
- [x] Phase 0 — Gate, version pin, safety (2026-11-21)
- [x] Phase 1 — Cleanup + framework upgrade (2026-11-21; preview-deploy check pending, see notes)
- [x] Phase 2 — Payload foundation (2026-11-22; preview verified; owner said "continue" after trying the prototype + live preview, taken as sign-off)
- [x] Phase 3 — Convert pages (In Office / Donate / About / Home) (2026-11-22; `extraSections` moved to Phase 4, see notes)
- [ ] Phase 4 — Blocks + Pages + sitemap
- [ ] Phase 5 — Hardening
- [ ] Phase 6 — Docs
- [ ] Phase 7 — Go-live

Record as you go: Q1 evidence/decision · pinned versions + cache API · traffic baseline · upload strategy · usage projection · pre-CMS rollback deployment ID · 1-week actual usage.

**Recorded values**
- **Q1:** owner decision 2026-11-21 — Hobby plan is fine; proceed.
- **Version pin (2026-11-21):** `payload` + all `@payloadcms/*` = **3.94.1**; `next` = **16.4.6** (Payload peer range `>=16.4.5 <17`); `react`/`react-dom` = **19.3.1**; Node = **24.x, ≥24.22.3** (Payload engines `^22.23.5 || ^24.22.3`). Local Node is 24.7.0 via nvm → must upgrade before Phase 2 (done in Phase 1).
- **Cache API:** `unstable_cache` (no `cacheComponents`), tag `cms`; invalidation `revalidateTag('cms', { expire: 0 })` from Payload hooks (Next 16 requires the second arg; `{ expire: 0 }` = immediate). Confirm in Phase 2 rendering proofs.
- **Traffic baseline:** _pending — owner to read Vercel Analytics (monthly visitors/page views, bandwidth, image optimizations); needed by Phase 5, not blocking._
- **Test tooling notes:** Vitest 5.1.1 needs `@rolldown/binding-darwin-arm64` (pinned as an optionalDependency because npm skipped it); `@types/node` bumped 20.4.7 → 22.20.5 (types only). Playwright 1.65.1; baselines in `tests/e2e/__snapshots__/` (text, visual-mobile 390×844, visual-desktop 1440×900; `/events` month line and Donorbox iframe masked).

### Phase 2 provisioning checklist (owner — in the Vercel dashboard)
1. **Storage → Create → Neon Postgres** (free) connected to the `wbfs` project. Create two branches: `main` (Production) and `preview` (Preview). Note each branch's `ep-…` endpoint id.
2. **Storage → Create → Blob** twice: `wbfs-prod` (Production env) and `wbfs-preview` (Preview env).
3. **Settings → Environment Variables**, per environment (Production / Preview):
   `APP_ENV` (production / preview), `DATABASE_URL` (that env's Neon branch, pooled URL), `EXPECTED_DB_ENDPOINT` (its `ep-…` id), `PAYLOAD_SECRET` (new random 48+ chars each), `NEXT_PUBLIC_SERVER_URL` (prod: `https://weisburnforsheriff.com`; preview: `https://wbfs-git-cms-payload-hackhackhacks-projects.vercel.app`), `BLOB_READ_WRITE_TOKEN` (that env's store). Keep the SendGrid vars.
4. Mirror the values in 1Password (vault used by `.env.op`).
5. Tell the agent the setup is done → it redeploys preview, runs the upload spike + rendering proofs on preview, bootstraps a preview admin, and hands you the prototype-gate walkthrough.
- Note: until step 3 is done, **preview builds of `cms-payload` fail** (no database). Production (`golf-flyer-redesign`) is unaffected.

### How to resume in a new session
1. Read §0 and this section.
2. `git checkout cms-payload && git pull`.
3. `npm run test` and `npm run test:e2e` to see the current state.
4. Continue at the first unchecked phase and follow its exit criteria.
5. Before ending: update this log (what was done, decisions, blockers, numbers) and commit.

Session notes (newest first):
- 2026-11-22 — **Phase 3 done.** Owner said "continue where you left off" at the prototype gate → treated as Phase 2 sign-off. Converted In Office → Donate → About → Home into page globals (`cms/globals/pageGlobal.ts` factory: drafts + 0.5 s autosave, preview + live preview, Pages group, staff-only API). Generic `loadPageGlobal(slug)` (published via `lib/cms/public.ts`, drafts via `lib/cms/preview.ts`); an unpublished page global 404s. Verbatim seed for each (`seedPageGlobal`, insert-only; Home/About photos seeded into Media). `docs/cms/FIELD-INVENTORY.md` written. Decisions: (1) `**double stars**` in a text field = highlighted words (covers the cream payee, gold "YOUR", upright "now.", bold "YOU") — `components/ui/highlighted.tsx`; (2) the Home golf strip is a **featured event** relationship (hidden if unset/unpublished/hidden); (3) Home social icons reuse Site Settings' Facebook/Instagram; (4) sheriff star badge, logo, social icons and the sign-up forms stay design chrome; (5) link validator accepts `#section` links (Home "Sign Up" → `#volunteer`); (6) media in-use check now also covers page globals (`GLOBAL_MEDIA_REFERENCES`). **`extraSections` deferred to Phase 4** so it's added once, with the real blocks, to all page globals. Text + visual baselines unchanged; e2e 48/48 (edit-and-restore per page: text, image where the page has one, link; Donorbox allowlist; featured-event toggle), unit 21/21.
- 2026-11-22 — Owner request during the prototype gate: **Live Preview** (see the page beside the form while editing). Added Payload Live Preview for Events and Events Page: drafts autosave every 0.5 s, the side panel loads `/preview/enter?path=…` in draft mode, and `RefreshRouteOnSave` (rendered only in draft mode) re-renders on each autosave; Phone/Desktop breakpoints; open by default. Migration `autosave` (adds columns). e2e test types a headline and sees it in the preview panel while the public page is unchanged. e2e 44/44. Site Settings stays without drafts (saves publish immediately), so no live preview there.
- 2026-11-21 — **Preview deployed and verified** (`https://wbfs-git-cms-payload-hackhackhacks-projects.vercel.app`). Provisioning done by owner: Neon `main`/`preview` branches, Blob stores `wbfs-preview` (prefix `BLOB`, Preview) and `wbfs-prod` (prefix `PROD_BLOB`, Production — Vercel won't reuse a prefix, code accepts either via `lib/blob-token.ts`), plus `APP_ENV`, `EXPECTED_DB_ENDPOINT`, `NEXT_PUBLIC_SERVER_URL`, `PAYLOAD_SECRET` per env. Blob host is derived from the token (no `BLOB_PUBLIC_HOST`). Fixes found on first deploy: (1) Blob adapter adds `prefix`/`_objectKey` columns only when enabled → `alwaysInsertFields: true` + migration `blob_storage_fields` (schema parity verified: no diff with a token set); (2) seed shared one `context` object across creates → cloud-storage plugin reused the first stashed file and images never reached Blob → fresh context per op; (3) media "in use" check now uses `overrideAccess: true` (it failed for scripts with no user). Preview builds now migrate + run the insert-only seed. Added `npm run db:preview:reset`.
  - **Results on preview:** smoke/forms/text 17/17 and visual 12/12 vs Phase 0 baselines (images served from Blob); public routes `x-vercel-cache: HIT`; `/admin` `X-Robots-Tag: noindex`; **upload strategy decision = `clientUploads` works** — 11.6 MB photo and 11.6 MB PDF uploaded through the admin UI straight to Blob, 3 image sizes generated and served (`npm run test:upload-check`, temp admin, self-cleaning); **freshness: publish visible ~1 s, unpublish gone ~0 s**. Temp accounts/files removed.
  - Next: bootstrap the owner's preview admin → **prototype gate** (owner).
- 2026-11-21 — Neon project `neon-lime-ladder` (AWS us-east-1, Free, Postgres 18). Branches: `main` (Production) endpoint **`ep-super-math-bcor7o8w`**; `preview` (Preview, expires Never, parent main) endpoint **`ep-jolly-bird-bc9ogtbz`**. These are the `EXPECTED_DB_ENDPOINT` values. Next: Preview `DATABASE_URL` in Vercel, Blob stores, remaining env vars.
- 2026-11-21 — Owner provisioning in progress. Neon created via Vercel Marketplace (Washington D.C./us-east-1, Free, Neon Auth off), connected to **Production only** with prefix `DATABASE` → Vercel manages `DATABASE_URL` for Production. Code renamed `DATABASE_URI` → `DATABASE_URL` everywhere to match. Preview's `DATABASE_URL` will be set manually from a separate `preview` Neon branch.
- 2026-11-21 — Drafted `docs/cms/EDITOR-GUIDE.md` for the features built so far (login/setup links, publishing, events, site settings, events page, media, users); screenshots and the remaining pages get added after preview is live and Phase 3 is done. No further work is possible without the owner: Phase 2 provisioning → preview → prototype gate.
- 2026-11-21 — While blocked on provisioning, did the non-gated pieces: **Phase 4.3** runtime `sitemap.ts` (published events, cache-invalidated) + `app/robots.ts` (disallow /admin, /api/, /preview/), `next-sitemap` removed; **Phase 5.1** noindex (`X-Robots-Tag` on /admin, /api, /preview + admin meta); **Phase 5.2–5.3** `npm run backup` / `npm run restore` (pg_dump/pg_restore via Docker `postgres:17-alpine`; files + checksummed manifest; restore only into empty DB + empty storage, files at original paths). Local drill: backup of dev DB → restore into empty `wbfs_restore` + scratch folder ✓ (event, 3 media, 9 files, checksums verified); refusals verified (non-empty target, BACKUP_DIR inside repo). Full Blob-based restore drill (page renders from restored store) still to do once Blob exists. **Phase 6** `docs/cms/OPERATIONS.md` drafted. e2e 43/43, unit 17/17. Still blocked: Phase 2 provisioning checklist → preview deploy → prototype gate (owner).
- 2026-11-21 — **Phase 2 (local) done**, not yet deployed. Payload 3.94.1 embedded: site moved to `app/(frontend)/`, admin at `app/(payload)/`; `payload.config.ts` (Postgres adapter, `push: false`, GraphQL off, Vercel Blob adapter enabled only when `BLOB_READ_WRITE_TOKEN` is set — local uploads go to `./media`). Collections `users` (roles, invite + setup-link endpoints, admin UI buttons, first-user + forgot-password closed via `beforeOperation` + `proxy.ts`), `media` (alt required, in-use delete blocked), `events` (drafts, slug lock, status upcoming/soldOut/past/hidden); globals `siteSettings` (no drafts) and `eventsPage`. Header/footer/banner, `/events`, `/events/[slug]` (replaces the golf page file) read from CMS via `lib/cms/{public,preview,content}.ts`; whole-site invalidation `revalidateTag('cms', { expire: 0 })`. Insert-only `npm run seed` (verbatim content + golf assets), `users:bootstrap-admin`, env guard, `vercel-build` (preview auto-migrates; production fails on pending migrations). Local Postgres via `docker compose` (`npm run db:local:up`); `.env.development` holds local-only values. Tests: unit 17/17; e2e 42/42 (smoke, forms, text + visual parity **unchanged**, and 12 CMS behaviour tests on a reset `wbfs_e2e` DB with production-like guards). Build output: all public routes still static (○/●).
  - **Decisions/deviations:** (1) Media records are publicly readable (files are public anyway; needed for local `/api/media/file`); all other collections/globals have no anonymous API reads. (2) Sold-out banner shows when status = "Sold out" (no separate checkbox). (3) `package.json` is now `"type": "module"` (Payload CLI needs it) → `tailwind/postcss/next-sitemap` configs renamed `.cjs`. (4) Next 16 uses `proxy.ts` (not `middleware.ts`). (5) Payload honours cookie logins only from its own Origin (CSRF) — API clients/tests must send `Origin`. (6) Local media URLs are made relative in `lib/cms/content.ts` (Payload prefixes `serverURL`); Blob URLs served directly (`disablePayloadAccessControl`). (7) `sharp` pinned to 0.35.5 to match Next (avoids two libvips copies).
  - **Owner actions needed to continue Phase 2:** see "Phase 2 provisioning checklist" below.
- 2026-11-21 — **Phase 1 done** locally: removed stale proxy (`app/api/route.js`, `vercel.json`), dead components/hooks/CSS and 20 unused deps (incl. `@sendgrid/mail`, never imported). Upgraded to Next 16.4.6 / React 19.3.1 / TS 5.9.3 / eslint 9 (flat `eslint.config.mjs`; old `.eslintrc.js` never ran — its plugin wasn't installed — so the old style-only ruleset was not carried over). `next/head` tags were silently ignored in the App Router → moved icons/OG/canonical into the Metadata API (`components/seo/meta.tsx` removed). Fixed React-19 lint errors: volunteer form's yard-sign toggle used a ref during render → `useState`; route handlers had a bogus 2nd param. Added `.nvmrc` (24) + `engines` (`>=24.22.3 <25`); local Node 24.22.3 installed via nvm (**nvm default is still 24.7.0 — run `nvm use` in this repo**). New `tests/e2e/forms.spec.ts` (SendGrid stubbed). Build/typecheck/lint (0 errors, 11 warnings) clean; smoke+forms+text 17/17, visual 12/12 with **no baseline changes**. Branch pushed for a Vercel preview deploy.
- 2026-11-21 — **Phase 0 done** on `cms-payload` (branched from `golf-flyer-redesign`). `.env` untracked + gitignored; `.env.example` and `.env.op` (op:// refs — vault paths are placeholders, adjust to the real vault) added. Vitest + Playwright set up; baselines captured on the pre-CMS site; smoke/text/visual all green on re-run. Next: Phase 1.
- 2026-11-21 — Plan created. Options explored with the owner, and Payload chosen under the constraints in §0.2. Plan cross-reviewed by Codex for 7 rounds. The owner then directed a proportionate scope; the edge cases are deferred in §9. Q1–Q5 answered (see §0.8): Hobby is fine per owner, Production branch = `golf-flyer-redesign`, roles = admin + editor, manual nav list, first editor decided at go-live. No code changes yet. Next: Phase 0.
