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

export type QuickEventMessage = {
  type: typeof QUICK_EVENT_MESSAGE;
  input: { title?: string; date?: string; place?: string; about?: string };
};

export function isQuickEventMessage(data: unknown): data is QuickEventMessage {
  if (!data || typeof data !== 'object') return false;
  const message = data as Record<string, unknown>;
  if (message.type !== QUICK_EVENT_MESSAGE || !message.input || typeof message.input !== 'object') return false;
  return Object.values(message.input).every((value) => value === undefined || typeof value === 'string');
}
