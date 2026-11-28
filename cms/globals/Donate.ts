import { TAB } from '../tabs';
import { headingFields } from '../fields/link';
import { moreOptions, overlineField, pageGlobal, tab } from './pageGlobal';

/** /donate — Donorbox form, mail-in details and the legal disclaimer. */
export const Donate = pageGlobal({
  slug: 'donate',
  label: 'Donate',
  path: '/donate',
  description: 'The Contribute page (/donate).',
  tabs: [
    tab(TAB.top, [overlineField(), ...headingFields(true), { name: 'intro', type: 'textarea' }]),
    tab(TAB.donationForm, [
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
    ]),
    tab(TAB.mailIn, [
      { name: 'mailHeading', type: 'text', required: true },
      {
        name: 'mailBody',
        type: 'textarea',
        admin: { description: 'Wrap words in **double stars** to make them stand out.' },
      },
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
      moreOptions([overlineField('mailOverline'), { name: 'mailToLabel', type: 'text', defaultValue: 'Mail To' }]),
    ]),
    tab(TAB.smallPrint, [
      {
        name: 'disclaimer',
        type: 'textarea',
        required: true,
        admin: { description: 'Legal small print at the bottom of the page.' },
      },
    ]),
  ],
});
