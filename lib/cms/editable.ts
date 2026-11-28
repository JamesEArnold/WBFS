/**
 * Click-to-edit markers. Parts of a page carry the form field (and form tab)
 * they come from, so clicking them in the admin's live preview opens that
 * field in the form (components/ui/preview-click.tsx → cms/components/PreviewJump.tsx).
 * Plain data attributes: they do nothing on the public site.
 */
export type EditableAttrs = { 'data-cms-field'?: string; 'data-cms-tab'?: string };

/** The form field a piece of the page comes from, e.g. `heading` or `gallery.2`. */
export const editable = (field: string, tab?: string): EditableAttrs =>
  tab ? { 'data-cms-field': field, 'data-cms-tab': tab } : { 'data-cms-field': field };

/** The form tab a part of the page comes from, e.g. "Photo gallery". */
export const editableTab = (tab: string): EditableAttrs => ({ 'data-cms-tab': tab });

/** Payload's element ids for a field path, most specific first (see cms/components/PreviewJump.tsx). */
export function fieldElementIds(path: string): string[] {
  const ids: string[] = [];
  const segments = path.split('.').filter(Boolean);
  for (let end = segments.length; end > 0; end--) {
    const part = segments.slice(0, end);
    const last = part[part.length - 1];
    if (/^\d+$/.test(last)) {
      // A row of a list or of the sections, e.g. `gallery.2` → #gallery-row-2.
      ids.push(`${part.slice(0, -1).join('-')}-row-${last}`);
    } else {
      ids.push(`field-${part.join('__')}`);
    }
  }
  return ids;
}
