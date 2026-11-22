import { headingFields } from '../fields/link';
import { overlineField, pageGlobal } from './pageGlobal';

/** /donate — Donorbox form, mail-in details and the legal disclaimer. */
export const Donate = pageGlobal({
  slug: 'donate',
  label: 'Donate',
  path: '/donate',
  description: 'The Contribute page (/donate).',
  fields: [
    {
      type: 'collapsible',
      label: 'Top of page',
      fields: [
        overlineField(),
        ...headingFields(true),
        { name: 'intro', type: 'textarea' },
      ],
    },
    {
      name: 'donorboxUrl',
      label: 'Donorbox form address',
      type: 'text',
      required: true,
      admin: { description: 'The Donorbox embed address, e.g. https://donorbox.org/embed/weisburn-for-sheriff' },
      validate: (value: unknown) => {
        try {
          const url = new URL(String(value ?? ''));
          if (url.protocol === 'https:' && url.hostname === 'donorbox.org') return true;
        } catch {
          // fall through
        }
        return 'Enter a https://donorbox.org/… address.';
      },
    },
    {
      type: 'collapsible',
      label: 'Mail-in contributions',
      fields: [
        overlineField('mailOverline'),
        { name: 'mailHeading', type: 'text', required: true },
        {
          name: 'mailBody',
          type: 'textarea',
          admin: { description: 'Wrap words in **double stars** to make them stand out.' },
        },
        { name: 'mailToLabel', type: 'text', defaultValue: 'Mail To' },
        { name: 'mailToName', type: 'text', required: true },
        { name: 'mailToLine1', type: 'text' },
        { name: 'mailToLine2', type: 'text' },
        { name: 'mailNote', type: 'text', admin: { description: 'Small print under the address.' } },
        {
          name: 'stats',
          type: 'array',
          maxRows: 3,
          admin: { description: 'Up to three short facts shown under the address (e.g. "31" / "Years Service").' },
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      required: true,
      admin: { description: 'Legal small print at the bottom of the page.' },
    },
  ],
});
