import { SITE_TIME_ZONE } from './expiry';

/**
 * Sensible wording for event fields an editor leaves blank, so a new event
 * only needs a name and a date. Anything the editor types always wins.
 * Pure, so it is unit-tested (tests/unit/event-text.test.ts).
 */
type EventText = {
  title: string;
  date?: string | null;
  heading?: string | null;
  dateLabel?: string | null;
  subtitle?: string | null;
};

const parts = (instant: string) => {
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE_TIME_ZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).formatToParts(new Date(instant));
  const get = (type: Intl.DateTimeFormatPartTypes) => formatted.find((p) => p.type === type)?.value ?? '';
  return { weekday: get('weekday'), month: get('month'), day: get('day'), year: get('year') };
};

const filled = (value: string | null | undefined): value is string => typeof value === 'string' && value.trim() !== '';

/** "Friday, September 18, 2026" */
export function longDate(instant: string): string {
  const { weekday, month, day, year } = parts(instant);
  return `${weekday}, ${month} ${day}, ${year}`;
}

/** Big headline on the event page: the headline, or else the event's name. */
export function eventHeading(event: EventText): string {
  return filled(event.heading) ? event.heading : event.title;
}

/** Gold line above the headline: "Friday · September 18, 2026" from the date when left blank. */
export function eventDateLabel(event: EventText): string | null {
  if (filled(event.dateLabel)) return event.dateLabel;
  if (!event.date) return null;
  const { weekday, month, day, year } = parts(event.date);
  return `${weekday} · ${month} ${day}, ${year}`;
}

/** Line under the name on the Events list and Home strip: the date when left blank. */
export function eventSubtitle(event: EventText): string | null {
  if (filled(event.subtitle)) return event.subtitle;
  return event.date ? longDate(event.date) : null;
}
