/** Draft-preview URL for a site path (turns on Next draft mode, then redirects). */
export const previewPath = (path: string): string => `/preview/enter?path=${encodeURIComponent(path)}`;

/** Absolute version for the Live Preview iframe (Payload posts messages to its origin). */
export const livePreviewUrl = (path: string): string =>
  `${(process.env.NEXT_PUBLIC_SERVER_URL ?? '').replace(/\/$/, '')}${previewPath(path)}`;
