import type { Field, GlobalConfig, UnnamedTab } from 'payload';
import { isStaff } from '../access/roles';
import { extraSectionsField } from '../blocks';
import { withPlainLabels } from '../fields/plainLabels';
import { invalidateGlobalAfterChange } from '../hooks/invalidate';
import { livePreviewUrl, previewPath } from '../livePreview';
import { TAB } from '../tabs';

/** Label of the last tab on every page form (holds the optional extra sections). */
export const EXTRA_SECTIONS_TAB = TAB.extraSections;

/**
 * One tab of a page form, usually one part of the page ("Top of page",
 * "Photo gallery"…). Tabs are unnamed, so they only change the form layout:
 * the stored content (and the database) is the same as without them.
 */
export const tab = (label: string, fields: Field[], description?: string): UnnamedTab => ({
  label,
  description,
  fields,
});

/** Rarely changed fields, folded away at the bottom of a tab. */
export const moreOptions = (fields: Field[]): Field => ({
  type: 'collapsible',
  label: 'More options',
  admin: { initCollapsed: true },
  fields,
});

/** The page form: its own tabs, then the "Add more sections" tab. */
export const pageTabs = (tabs: UnnamedTab[], extraSectionsDescription?: string): Field => ({
  type: 'tabs',
  tabs: [
    ...tabs.map((t) => ({ ...t, fields: withPlainLabels(t.fields) })),
    tab(EXTRA_SECTIONS_TAB, [extraSectionsField()], extraSectionsDescription ?? 'Optional extra sections at the bottom of the page, just above the footer.'),
  ],
});

/**
 * A page of the site stored as a global: drafts with autosave (so the live
 * preview beside the form follows along as you type), preview + live preview
 * at the page's path, staff-only API access, and whole-site cache invalidation.
 */
export const pageGlobal = ({
  slug,
  label,
  path,
  description,
  tabs,
}: {
  slug: string;
  label: string;
  path: string;
  description?: string;
  tabs: UnnamedTab[];
}): GlobalConfig => ({
  slug,
  label,
  versions: { drafts: { autosave: { interval: 500 } }, max: 20 },
  access: {
    // No anonymous API reads: the public site reads through lib/cms/public.ts.
    read: isStaff,
    update: isStaff,
    readVersions: isStaff,
  },
  admin: {
    group: 'Pages',
    description,
    preview: () => previewPath(path),
    livePreview: { url: () => livePreviewUrl(path) },
  },
  hooks: {
    afterChange: [invalidateGlobalAfterChange],
  },
  fields: [pageTabs(tabs)],
});

/** Small gold line with stars, e.g. "★ By The Year ★" (stars are added by the page). */
export const overlineField = (name = 'overline', description = 'Small gold line. Stars are added automatically.'): Field => ({
  name,
  type: 'text',
  admin: { description },
});

/** A simple list of text lines (bullets, facts…). */
export const linesField = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'array',
  admin: { description },
  fields: [{ name: 'text', type: 'text', required: true }],
});
