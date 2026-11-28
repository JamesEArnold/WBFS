/** postMessage type sent from the live preview to the admin when an editor clicks part of the page. */
export const EDIT_FIELD_MESSAGE = 'wbfs:edit-field';

export type EditFieldMessage = { type: typeof EDIT_FIELD_MESSAGE; field?: string; tab?: string };

export function isEditFieldMessage(data: unknown): data is EditFieldMessage {
  if (!data || typeof data !== 'object') return false;
  const message = data as Record<string, unknown>;
  return (
    message.type === EDIT_FIELD_MESSAGE &&
    (message.field === undefined || typeof message.field === 'string') &&
    (message.tab === undefined || typeof message.tab === 'string')
  );
}

/** Where the "Post a new event" preview is served (app/(frontend)/preview/new-event). */
export const QUICK_EVENT_PREVIEW_PATH = '/preview/new-event';

/** "Post a new event" form → its preview frame: the form's current contents. */
export const QUICK_EVENT_MESSAGE = 'wbfs:quick-event';
/** Preview frame → form: ready to receive the form's contents. */
export const QUICK_EVENT_READY = 'wbfs:quick-event-ready';

/** What the preview needs to draw an uploaded file. */
export type PreviewMedia = {
  id: number;
  url: string;
  mimeType: string;
  alt: string;
  filename?: string;
  width?: number | null;
  height?: number | null;
};

export type QuickEventMessage = {
  type: typeof QUICK_EVENT_MESSAGE;
  input: {
    title?: string;
    date?: string;
    place?: string;
    about?: string;
    flyerPdf?: PreviewMedia | null;
    flyerImages?: PreviewMedia[];
  };
};

const isOptionalString = (value: unknown) => value === undefined || typeof value === 'string';

export function isPreviewMedia(value: unknown): value is PreviewMedia {
  if (!value || typeof value !== 'object') return false;
  const media = value as Record<string, unknown>;
  return (
    typeof media.id === 'number' &&
    typeof media.url === 'string' &&
    // Same-site files, or Vercel Blob / other https storage.
    ((media.url.startsWith('/') && !media.url.startsWith('//')) || media.url.startsWith('https://')) &&
    typeof media.mimeType === 'string' &&
    typeof media.alt === 'string'
  );
}

export function isQuickEventMessage(data: unknown): data is QuickEventMessage {
  if (!data || typeof data !== 'object') return false;
  const message = data as Record<string, unknown>;
  if (message.type !== QUICK_EVENT_MESSAGE || !message.input || typeof message.input !== 'object') return false;
  const input = message.input as Record<string, unknown>;
  return (
    ['title', 'date', 'place', 'about'].every((key) => isOptionalString(input[key])) &&
    (input.flyerPdf === undefined || input.flyerPdf === null || isPreviewMedia(input.flyerPdf)) &&
    (input.flyerImages === undefined || (Array.isArray(input.flyerImages) && input.flyerImages.every(isPreviewMedia)))
  );
}
