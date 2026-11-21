import { revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  RequestContext,
} from 'payload';

/** Every public CMS read is cached under this tag (see lib/cms/public.ts). */
export const CMS_TAG = 'cms';

/**
 * Invalidate the whole public site. The site has < 30 routes, so whole-site
 * invalidation is simpler and safer than tracking which pages a change affects.
 * `{ expire: 0 }` = expire immediately (Next 16 requires a profile argument).
 */
export function invalidateSite(context?: RequestContext): void {
  // Scripts (seed, migrations) run outside a Next request and opt out.
  if (context?.disableInvalidate) return;
  try {
    revalidateTag(CMS_TAG, { expire: 0 });
  } catch (error) {
    // Outside a Next.js runtime (e.g. `payload run`) there is no cache to clear.
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[cms] cache invalidation skipped:', (error as Error).message);
    }
  }
}

export const invalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  invalidateSite(req.context);
  return doc;
};

export const invalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  invalidateSite(req.context);
  return doc;
};

export const invalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req }) => {
  invalidateSite(req.context);
  return doc;
};
