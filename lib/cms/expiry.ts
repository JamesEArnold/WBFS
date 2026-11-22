/**
 * Event listing expiry. An event with "Remove from listings after" set stays
 * listed through that whole day in Stark County (Eastern time) and drops off
 * from the next day. Pure, so it is unit-tested (tests/unit/expiry.test.ts).
 */
export const SITE_TIME_ZONE = 'America/New_York';

/** Calendar date (YYYY-MM-DD) of an instant, in the site's time zone. */
export function siteDate(instant: Date | string): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(instant));
}

export function isExpired(expiresAt: string | null | undefined, now: Date = new Date()): boolean {
  if (!expiresAt) return false;
  return siteDate(now) > siteDate(expiresAt);
}

/** Drop events whose listing has expired. */
export function withoutExpired<T extends { expiresAt?: string | null }>(events: T[], now: Date = new Date()): T[] {
  return events.filter((event) => !isExpired(event.expiresAt, now));
}
