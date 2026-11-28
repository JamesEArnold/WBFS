import { describe, expect, it } from 'vitest';
import { eventDateLabel, eventHeading, eventSubtitle, longDate } from '@/lib/cms/eventText';

// Payload stores a date-only pick as midday UTC.
const SEPT_18 = '2026-09-18T12:00:00.000Z';

describe('event wording when fields are left blank', () => {
  it('uses the event name as the headline when no headline is typed', () => {
    expect(eventHeading({ title: 'Summer Picnic' })).toBe('Summer Picnic');
    expect(eventHeading({ title: 'Summer Picnic', heading: '   ' })).toBe('Summer Picnic');
  });

  it('builds the gold date line from the date', () => {
    expect(eventDateLabel({ title: 'x', date: SEPT_18 })).toBe('Friday · September 18, 2026');
  });

  it('shows the date under the name on the list when no subtitle is typed', () => {
    expect(eventSubtitle({ title: 'x', date: SEPT_18 })).toBe('Friday, September 18, 2026');
  });

  it('always keeps what the editor typed', () => {
    const event = { title: 'Golf', date: SEPT_18, heading: 'Annual Golf', dateLabel: 'Fall 2026', subtitle: 'Sable Creek' };
    expect(eventHeading(event)).toBe('Annual Golf');
    expect(eventDateLabel(event)).toBe('Fall 2026');
    expect(eventSubtitle(event)).toBe('Sable Creek');
  });

  it('shows nothing rather than a wrong date when there is no date', () => {
    expect(eventDateLabel({ title: 'x' })).toBeNull();
    expect(eventSubtitle({ title: 'x', date: null })).toBeNull();
  });

  it('uses the Stark County calendar day, not UTC', () => {
    // 11:30 p.m. Sept 18 in New York is already Sept 19 in UTC.
    expect(longDate('2026-09-19T03:30:00.000Z')).toBe('Friday, September 18, 2026');
  });
});
