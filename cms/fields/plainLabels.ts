import type { Field } from 'payload';

/**
 * Gives fields plain-English labels from their names (e.g. `ctaOverline` →
 * "Small gold line", `portraitLinkUrl` → "Link address"), so editors and the
 * how-to guides see the same everyday words. Explicit labels always win.
 * Labels only: database columns are unchanged.
 */
const RULES: [RegExp, string][] = [
  [/overline$/i, 'Small gold line'],
  [/^headingAccent$/, 'Headline — gold second line'],
  [/^heading$/, 'Headline'],
  [/heading$/i, 'Heading'],
  [/^intro$/, 'Paragraph under the headline'],
  [/body$/i, 'Paragraph'],
  [/(link|cta)label$/i, 'Link text'],
  [/(link|cta)url$/i, 'Link address'],
  [/caption$/i, 'Caption'],
  [/buttons$/i, 'Buttons'],
  [/^items$/, 'Lines'],
];

/** What one row of a list is called, so the add button reads e.g. "Add Button". */
const ROW_NAMES: [RegExp, string][] = [
  [/buttons$/i, 'Button'],
  [/^years$/, 'Year'],
  [/^(events|outreach|volunteerTasks|facts|items)$/, 'Line'],
  [/^(timeline|entries)$/, 'Entry'],
  [/^pillars$/, 'Box'],
  [/^(gallery|photos)$/, 'Photo'],
  [/^stats$/, 'Fact'],
  [/^flyerImages$/, 'Flyer picture'],
  [/^nav$/, 'Menu link'],
];

export function rowName(name: string): string | undefined {
  return ROW_NAMES.find(([pattern]) => pattern.test(name))?.[1];
}

export function plainLabel(name: string): string | undefined {
  return RULES.find(([pattern]) => pattern.test(name))?.[1];
}

export function withPlainLabels(fields: Field[]): Field[] {
  return fields.map((field) => {
    const next = { ...field } as Field & { name?: string; label?: unknown; fields?: Field[]; tabs?: { fields: Field[] }[] };
    if (next.name && next.label === undefined && next.type !== 'blocks') {
      const label = plainLabel(next.name);
      if (label) (next as { label?: string }).label = label;
    }
    if (next.type === 'array' && next.name && !(next as { labels?: unknown }).labels) {
      const singular = rowName(next.name);
      const plural = typeof next.label === 'string' ? next.label : undefined;
      if (singular) (next as { labels?: unknown }).labels = { singular, plural: plural ?? `${singular}s` };
    }
    if ('fields' in next && Array.isArray(next.fields)) next.fields = withPlainLabels(next.fields);
    if ('tabs' in next && Array.isArray(next.tabs)) next.tabs = next.tabs.map((tab) => ({ ...tab, fields: withPlainLabels(tab.fields) }));
    return next;
  });
}
