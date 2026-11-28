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
