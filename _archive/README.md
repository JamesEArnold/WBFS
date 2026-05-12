# _archive

Kept-for-reference code that is no longer wired into the live site.

Files here are excluded from typechecking (`tsconfig.json` → `exclude`)
and the `_` prefix keeps them out of Next.js routing if they ever live
under `app/`.

## Why each item is here

- `events/*` — historical event sub-pages whose events have passed.
  Their routes (`/events/falcones-fundraiser`, etc.) are no longer
  reachable from the site. Kept in case the client wants a future
  event built in the same shape.
- `components/events/*` — the `EventCard` wrappers for those past
  events. The current `app/events/page.tsx` no longer imports them.
- `components/hero-slide.tsx` — earlier home-page hero block. Replaced
  by the Lawman home (`components/designs/lawman/home.tsx`).

If you bring something back, move it out of `_archive` (and back into
`app/` or `components/`) rather than importing across the boundary.
