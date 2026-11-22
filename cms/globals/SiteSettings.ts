import type { GlobalConfig } from 'payload';
import { isStaff } from '../access/roles';
import { validateLinkUrl } from '../fields/validators';
import { withPlainLabels } from '../fields/plainLabels';
import { invalidateGlobalAfterChange } from '../hooks/invalidate';

const link = (name: string, label: string) => ({
  name,
  label,
  type: 'text' as const,
  validate: (value: unknown) => validateLinkUrl(value, { required: true }),
});

/**
 * Header, footer and announcement banner. Versions are kept for history, but
 * drafts are off: saving publishes immediately, and there is no "unpublished"
 * state that could blank the site chrome.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'The announcement banner, the menu and header, and the footer — shown on every page. Saving makes changes live straight away.',
  },
  versions: { drafts: false, max: 20 },
  access: {
    read: isStaff,
    update: isStaff,
    readVersions: isStaff,
  },
  hooks: {
    afterChange: [invalidateGlobalAfterChange],
  },
  fields: withPlainLabels([
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner',
          fields: [
            {
              name: 'banner',
              type: 'group',
              admin: { description: 'Optional announcement strip under the header on every page.' },
              fields: [
                { name: 'enabled', label: 'Show the announcement banner', type: 'checkbox', defaultValue: false },
                { name: 'text', label: 'Message', type: 'text' },
                { name: 'linkLabel', label: 'Link text', type: 'text', admin: { description: 'Optional, e.g. "Details".' } },
                {
                  name: 'linkUrl',
                  label: 'Link address',
                  type: 'text',
                  validate: (value: unknown) => validateLinkUrl(value),
                },
              ],
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            { name: 'tagline', label: 'Thin line at the very top', type: 'text', required: true, admin: { description: 'Thin strip at the very top, e.g. "SWORN TO PROTECT — STARK COUNTY, OHIO" (stars are added automatically).' } },
            {
              name: 'nav',
              label: 'Navigation menu',
              type: 'array',
              minRows: 1,
              admin: { description: 'New pages are not added automatically — add them here.' },
              fields: [
                { name: 'label', type: 'text', required: true },
                link('href', 'Link'),
              ],
            },
            {
              name: 'headerCta',
              label: 'Header button',
              type: 'group',
              fields: [{ name: 'label', type: 'text', required: true }, link('href', 'Link')],
            },
            {
              name: 'mobileCta',
              label: 'Mobile menu button',
              type: 'group',
              fields: [{ name: 'label', type: 'text', required: true }, link('href', 'Link')],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerBlurb', label: 'Short description', type: 'textarea', required: true },
            { name: 'hqHeading', label: 'Address heading', type: 'text', required: true },
            { name: 'addressLine1', label: 'Address line 1', type: 'text' },
            { name: 'addressLine2', label: 'Address line 2', type: 'text' },
            { name: 'contactEmail', label: 'Contact email', type: 'email' },
            { name: 'actionHeading', label: 'Button heading', type: 'text', required: true },
            {
              name: 'footerCta',
              label: 'Footer button',
              type: 'group',
              fields: [{ name: 'label', type: 'text', required: true }, link('href', 'Link')],
            },
            { name: 'facebookUrl', label: 'Facebook page address', type: 'text', validate: (value: unknown) => validateLinkUrl(value) },
            { name: 'instagramUrl', label: 'Instagram page address', type: 'text', validate: (value: unknown) => validateLinkUrl(value) },
            {
              name: 'disclaimer',
              type: 'text',
              required: true,
              admin: { description: 'Legally required "Paid for by…" line (stars are added automatically).' },
            },
          ],
        },
      ],
    },
  ]),
};
