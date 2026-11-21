import type { CollectionBeforeDeleteHook, PayloadRequest, Where } from 'payload';
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
        overrideAccess: false,
        req,
      });
      for (const doc of result.docs) {
        usedIn.add(`${ref.label}: ${(doc as { title?: string }).title ?? doc.id}`);
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
