import type { Field, GlobalConfig } from 'payload';
import { isStaff } from '../access/roles';
import { extraSectionsField } from '../blocks';
import { withPlainLabels } from '../fields/plainLabels';
import { invalidateGlobalAfterChange } from '../hooks/invalidate';
import { livePreviewUrl, previewPath } from '../livePreview';

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
  fields,
}: {
  slug: string;
  label: string;
  path: string;
  description?: string;
  fields: Field[];
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
  fields: [...withPlainLabels(fields), extraSectionsField()],
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
