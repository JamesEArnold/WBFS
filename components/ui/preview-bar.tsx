'use client';

import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { QUICK_EVENT_PREVIEW_PATH } from '@/lib/cms/previewMessages';

const noSubscribe = () => () => {};

/** Shown only in draft preview, so editors know they're not looking at the live page. */
export const PreviewBar = () => {
  const pathname = usePathname();
  // Inside the admin's Live Preview frame, point out click-to-edit instead.
  const inLivePreview = useSyncExternalStore(noSubscribe, () => window.parent !== window, () => false);
  // The "Post a new event" preview isn't a draft of a saved page, and has nothing to click.
  if (pathname === QUICK_EVENT_PREVIEW_PATH) return null;
  return (
    <div
      data-testid="preview-bar"
      className="fixed bottom-0 inset-x-0 z-[100] flex items-center justify-center gap-4 px-4 py-2 text-sm font-bold"
      style={{ background: '#a31818', color: '#fff' }}
    >
      {inLivePreview ? (
        <span>Preview — click any words or photo to edit them.</span>
      ) : (
        <>
          <span>Draft preview — visitors can’t see unpublished changes.</span>
          <a className="underline" href={`/preview/exit?path=${encodeURIComponent(pathname ?? '/')}`}>
            Exit preview
          </a>
        </>
      )}
    </div>
  );
};
