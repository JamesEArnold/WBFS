'use client';

import { useDocumentDrawer, useListDrawer } from '@payloadcms/ui';
import { useCallback, useState } from 'react';
import { sameSiteUrl } from '@/lib/cms/media';
import type { PreviewMedia } from '@/lib/cms/previewMessages';

export type PickedMedia = PreviewMedia & { thumbnail?: string | null };

type Kind = 'pdf' | 'image';

const KIND = {
  pdf: {
    accepts: (mimeType: string) => mimeType === 'application/pdf',
    filter: { mimeType: { equals: 'application/pdf' } },
    wrong: 'That file isn’t a PDF. Choose the flyer PDF here; pictures go in the box below.',
  },
  image: {
    accepts: (mimeType: string) => mimeType.startsWith('image/'),
    filter: { mimeType: { contains: 'image/' } },
    wrong: 'That file isn’t a picture. Add the PDF itself under “Flyer PDF” above.',
  },
} as const;

/** Load what the form and preview need about a Photos & Files record. */
async function loadMedia(id: number | string): Promise<PickedMedia> {
  const res = await fetch(`/api/media/${id}?depth=0`, { credentials: 'include' });
  if (!res.ok) throw new Error('Couldn’t load that file. Please try again.');
  const doc = (await res.json()) as {
    id: number;
    url?: string | null;
    mimeType?: string | null;
    alt?: string | null;
    filename?: string | null;
    width?: number | null;
    height?: number | null;
    sizes?: { small?: { url?: string | null } };
  };
  return {
    id: doc.id,
    url: sameSiteUrl(doc.url) ?? '',
    mimeType: doc.mimeType ?? '',
    alt: doc.alt ?? '',
    filename: doc.filename ?? undefined,
    width: doc.width,
    height: doc.height,
    thumbnail: sameSiteUrl(doc.sizes?.small?.url) ?? sameSiteUrl(doc.url),
  };
}

/**
 * "Upload new" / "Choose existing" for a PDF or a picture, using the admin's
 * own Photos & Files windows (so uploads go straight to storage, like
 * everywhere else in the admin).
 */
export function MediaPicker({ kind, onPick, uploadLabel }: { kind: Kind; onPick: (media: PickedMedia) => void; uploadLabel: string }) {
  const [error, setError] = useState<string | null>(null);
  const [DocumentDrawer, DocumentToggler, { closeDrawer: closeUpload }] = useDocumentDrawer({ collectionSlug: 'media' });
  const [ListDrawer, ListToggler, { closeDrawer: closeList }] = useListDrawer({
    collectionSlugs: ['media'],
    filterOptions: { media: KIND[kind].filter },
    uploads: true,
  });

  const pick = useCallback(
    async (id: number | string) => {
      setError(null);
      try {
        const media = await loadMedia(id);
        if (!KIND[kind].accepts(media.mimeType)) setError(KIND[kind].wrong);
        else onPick(media);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Couldn’t load that file. Please try again.');
      }
    },
    [kind, onPick],
  );

  return (
    <div className="quick-media__picker">
      <div className="quick-media__buttons">
        <DocumentToggler className="quick-media__button" aria-label={uploadLabel}>
          {uploadLabel}
        </DocumentToggler>
        <ListToggler className="quick-media__button quick-media__button--secondary">Choose one already uploaded</ListToggler>
      </div>
      {error && (
        <p className="quick-form__error" role="alert">
          {error}
        </p>
      )}
      <DocumentDrawer
        // Stay on this form after uploading (the default opens the new file's own page).
        redirectAfterCreate={false}
        onSave={({ doc }) => {
          closeUpload();
          void pick(doc.id);
        }}
      />
      <ListDrawer
        allowCreate={false}
        onSelect={({ doc }) => {
          closeList();
          void pick(doc.id as number);
        }}
      />
    </div>
  );
}

/** A chosen file: small picture (or "PDF"), its name, and Remove. */
export function PickedFile({ media, onRemove }: { media: PickedMedia; onRemove: () => void }) {
  const isPdf = media.mimeType === 'application/pdf';
  return (
    <div className="quick-media__file" data-testid="picked-file">
      {isPdf ? (
        <span className="quick-media__thumb quick-media__thumb--pdf" aria-hidden>
          PDF
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail
        <img className="quick-media__thumb" src={media.thumbnail ?? media.url} alt="" />
      )}
      <span className="quick-media__name">{media.filename ?? media.alt}</span>
      <button type="button" className="quick-media__remove" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}
