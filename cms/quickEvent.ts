import { longDate } from '../lib/cms/eventText';

/**
 * "Post a new event" quick form (cms/components/quick/NewEventForm.tsx): the
 * few things an editor must decide, turned into a full event. Everything else
 * is filled in on the page from these (lib/cms/eventText.ts) and can be
 * changed later in the full event form. Pure, so it is unit-tested.
 */
export type QuickEventInput = {
  title?: unknown;
  /** YYYY-MM-DD from a date picker. */
  date?: unknown;
  /** e.g. "6 PM · Sable Creek Golf Course". */
  place?: unknown;
  about?: unknown;
  /** Take it off the Events list (and the Home strip) after the event day. */
  dropOffAfter?: unknown;
  publish?: unknown;
};

export type QuickEventData = {
  title: string;
  date: string;
  subtitle?: string;
  heroBlurb?: string;
  expiresAt?: string;
  status: 'upcoming';
  _status: 'draft' | 'published';
};

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

/** A date-only pick, stored the way Payload's own date picker stores it (midday UTC). */
function dayToInstant(day: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const instant = new Date(`${day}T12:00:00.000Z`);
  return Number.isNaN(instant.getTime()) || instant.toISOString().slice(0, 10) !== day ? null : instant.toISOString();
}

export function quickEventErrors(input: QuickEventInput): string[] {
  const errors: string[] = [];
  if (!text(input.title)) errors.push('Type the event’s name.');
  if (text(input.title).length > 120) errors.push('Keep the name under 120 characters.');
  if (!dayToInstant(text(input.date))) errors.push('Choose the day of the event.');
  return errors;
}

export function quickEventData(input: QuickEventInput): QuickEventData {
  const errors = quickEventErrors(input);
  if (errors.length) throw new Error(errors.join(' '));
  const date = dayToInstant(text(input.date))!;
  const place = text(input.place);
  const about = text(input.about);
  return {
    title: text(input.title),
    date,
    ...(place ? { subtitle: `${longDate(date)} · ${place}` } : {}),
    ...(about ? { heroBlurb: about } : {}),
    ...(input.dropOffAfter === false ? {} : { expiresAt: date }),
    status: 'upcoming',
    _status: input.publish === true ? 'published' : 'draft',
  };
}

/** Shown in the preview until a name is typed. */
export const PREVIEW_TITLE = 'Your event name';

/**
 * What the event will look like while the quick form is still being filled
 * in: never throws, and uses a placeholder name until one is typed.
 */
export function quickEventPreview(input: QuickEventInput) {
  const date = dayToInstant(text(input.date));
  const place = text(input.place);
  const about = text(input.about);
  return {
    title: text(input.title) || PREVIEW_TITLE,
    date: date ?? '',
    subtitle: place ? (date ? `${longDate(date)} · ${place}` : place) : null,
    heroBlurb: about || null,
    status: 'upcoming' as const,
    listingCtaLabel: 'View Details',
  };
}
