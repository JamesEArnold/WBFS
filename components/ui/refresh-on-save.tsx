'use client';

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

/**
 * In the CMS Live Preview panel, re-render the page with the latest draft each
 * time the editor autosaves. Only rendered in draft preview mode.
 */
export const RefreshOnSave = () => {
  const router = useRouter();
  return (
    <PayloadRefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={typeof window === 'undefined' ? '' : window.location.origin}
    />
  );
};
