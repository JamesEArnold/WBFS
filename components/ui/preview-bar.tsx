'use client';

import { usePathname } from 'next/navigation';

/** Shown only in draft preview, so editors know they're not looking at the live page. */
export const PreviewBar = () => {
  const pathname = usePathname();
  return (
    <div
      data-testid="preview-bar"
      className="fixed bottom-0 inset-x-0 z-[100] flex items-center justify-center gap-4 px-4 py-2 text-sm font-bold"
      style={{ background: '#a31818', color: '#fff' }}
    >
      <span>Draft preview — visitors can’t see unpublished changes.</span>
      <a className="underline" href={`/preview/exit?path=${encodeURIComponent(pathname ?? '/')}`}>
        Exit preview
      </a>
    </div>
  );
};
