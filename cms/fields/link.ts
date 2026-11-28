import type { ArrayField, Field } from 'payload';
import { validateLinkUrl } from './validators';

/**
 * A call-to-action button. Files are linked through Media ("Link to file"),
 * never by pasting a storage URL.
 */
export const buttonFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  {
    name: 'linkType',
    label: 'Where it goes',
    type: 'radio',
    defaultValue: 'url',
    options: [
      { label: 'Web address / site path', value: 'url' },
      { label: 'Link to file', value: 'file' },
    ],
    admin: { layout: 'horizontal' },
  },
  {
    name: 'url',
    label: 'Link address',
    type: 'text',
    admin: {
      condition: (_, sibling) => sibling?.linkType !== 'file',
      description: 'e.g. /donate, https://…, or mailto:someone@example.com',
    },
    validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
      siblingData?.linkType === 'file' ? true : validateLinkUrl(value, { required: true }),
  },
  {
    name: 'file',
    type: 'upload',
    relationTo: 'media',
    admin: { condition: (_, sibling) => sibling?.linkType === 'file' },
    validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
      siblingData?.linkType === 'file' && !value ? 'Choose a file.' : true,
  },
  {
    // Side by side, so each button takes less room in the form.
    type: 'row',
    fields: [
      {
        name: 'style',
        type: 'select',
        defaultValue: 'primary',
        options: [
          { label: 'Solid gold', value: 'primary' },
          { label: 'Gold outline', value: 'secondary' },
        ],
        admin: { width: '50%' },
      },
      { name: 'newTab', type: 'checkbox', label: 'Open in a new tab', defaultValue: false, admin: { width: '50%', style: { alignSelf: 'flex-end' } } },
    ],
  },
];

export const buttonsField = (name = 'buttons', label = 'Buttons'): ArrayField => ({
  name,
  label,
  type: 'array',
  fields: buttonFields,
});

/** Two-tone headline: e.g. "Annual Golf" + gold "Fundraiser" on the next line. */
export const headingFields = (required = true): Field[] => [
  { name: 'heading', type: 'text', required },
  {
    name: 'headingAccent',
    type: 'text',
    admin: { description: 'Optional second line shown in gold.' },
  },
];
