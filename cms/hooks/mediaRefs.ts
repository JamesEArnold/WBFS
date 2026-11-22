import type { CollectionBeforeDeleteHook, GlobalSlug, PayloadRequest, Where } from 'payload';
import { ValidationError } from 'payload';

/**
 * Where Media can be referenced. Keep this in sync when adding upload/relationship
 * fields that point at `media` (tests/integration/media.test.ts covers each entry).
 */
export const MEDIA_REFERENCES: { collection: 'events'; label: string; paths: string[] }[] = [
  {
    collection: 'events',
    label: 'Event',
    paths: ['flyerPdf', 'flyerImages.image', 'buttons.file'],
  },
];

/** Page globals that can reference Media, with the field paths (arrays are walked). */
export const GLOBAL_MEDIA_REFERENCES: { global: GlobalSlug; label: string; paths: string[] }[] = [
  { global: 'about', label: 'About page', paths: ['heroImage', 'signature', 'signOffImage', 'signOffButtons.file'] },
  { global: 'inOffice', label: 'In Office page', paths: ['ctaButtons.file'] },
];

/** Values at a dotted path, walking into arrays/groups: "flyerImages.image" → every image id. */
export function valuesAtPath(value: unknown, path: string[]): unknown[] {
  if (path.length === 0) return [value];
  if (Array.isArray(value)) return value.flatMap((item) => valuesAtPath(item, path));
  if (!value || typeof value !== 'object') return [];
  return valuesAtPath((value as Record<string, unknown>)[path[0]], path.slice(1));
}

const sameId = (value: unknown, id: number | string) =>
  value != null && String(typeof value === 'object' ? (value as { id?: unknown }).id : value) === String(id);

export async function findMediaUsage(req: PayloadRequest, mediaId: number | string): Promise<string[]> {
  const usedIn = new Set<string>();
  for (const ref of MEDIA_REFERENCES) {
    const where: Where = { or: ref.paths.map((path) => ({ [path]: { equals: mediaId } })) };
    // Check both the published and the latest draft version of every document.
    for (const draft of [false, true]) {
      const result = await req.payload.find({
        collection: ref.collection,
        where,
        draft,
        depth: 0,
        limit: 50,
        pagination: false,
        // Integrity check: must see every document regardless of who is deleting
        // (also works for scripts, which have no logged-in user).
        overrideAccess: true,
        req,
      });
      for (const doc of result.docs) {
        usedIn.add(`${ref.label}: ${(doc as { title?: string }).title ?? doc.id}`);
      }
    }
  }
  for (const ref of GLOBAL_MEDIA_REFERENCES) {
    for (const draft of [false, true]) {
      const doc = await req.payload.findGlobal({ slug: ref.global, draft, depth: 0, overrideAccess: true, req });
      if (ref.paths.some((path) => valuesAtPath(doc, path.split('.')).some((v) => sameId(v, mediaId)))) {
        usedIn.add(ref.label);
      }
    }
  }
  return [...usedIn];
}

export const preventDeletingUsedMedia: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const usedIn = await findMediaUsage(req, id);
  if (usedIn.length > 0) {
    throw new ValidationError({
      errors: [
        {
          message: `This file is still used by — ${usedIn.join('; ')}. Remove it there first, then delete it.`,
          path: 'id',
        },
      ],
    });
  }
};
