import type { GlobalConfig } from 'payload';
import { isStaff } from '../access/roles';
import { validateLinkUrl } from '../fields/validators';
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
  versions: { drafts: false, max: 20 },
  access: {
    read: isStaff,
    update: isStaff,
    readVersions: isStaff,
  },
  hooks: {
    afterChange: [invalidateGlobalAfterChange],
  },
  fields: [
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
                { name: 'enabled', type: 'checkbox', defaultValue: false },
                { name: 'text', type: 'text' },
                { name: 'linkLabel', type: 'text' },
                {
                  name: 'linkUrl',
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
            { name: 'tagline', type: 'text', required: true, admin: { description: 'Thin strip at the very top, e.g. "SWORN TO PROTECT — STARK COUNTY, OHIO" (stars are added automatically).' } },
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
            { name: 'footerBlurb', type: 'textarea', required: true },
            { name: 'hqHeading', type: 'text', required: true },
            { name: 'addressLine1', type: 'text' },
            { name: 'addressLine2', type: 'text' },
            { name: 'contactEmail', type: 'email' },
            { name: 'actionHeading', type: 'text', required: true },
            {
              name: 'footerCta',
              label: 'Footer button',
              type: 'group',
              fields: [{ name: 'label', type: 'text', required: true }, link('href', 'Link')],
            },
            { name: 'facebookUrl', type: 'text', validate: (value: unknown) => validateLinkUrl(value) },
            { name: 'instagramUrl', type: 'text', validate: (value: unknown) => validateLinkUrl(value) },
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
  ],
};
