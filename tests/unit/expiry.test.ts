import { describe, expect, it } from 'vitest';
import { isExpired, withoutExpired } from '@/lib/cms/expiry';

// Payload stores a date-only pick as a timestamp; editors are in Eastern time.
const NOV_30 = '2026-11-30T12:00:00.000Z';

describe('event listing expiry', () => {
  it('keeps events with no expiry date listed forever', () => {
    expect(isExpired(null, new Date('2030-01-01T00:00:00Z'))).toBe(false);
    expect(isExpired(undefined)).toBe(false);
  });

  it('keeps the event listed for the whole expiry day, Stark County time', () => {
    expect(isExpired(NOV_30, new Date('2026-11-30T05:00:00Z'))).toBe(false); // 12:00 a.m. Nov 30 EST
    expect(isExpired(NOV_30, new Date('2026-12-01T04:59:00Z'))).toBe(false); // 11:59 p.m. Nov 30 EST
  });

  it('removes it from the next day', () => {
    expect(isExpired(NOV_30, new Date('2026-12-01T05:00:00Z'))).toBe(true); // 12:00 a.m. Dec 1 EST
    expect(isExpired(NOV_30, new Date('2027-03-01T12:00:00Z'))).toBe(true);
  });

  it('works whether the date was saved as local midnight or midday UTC', () => {
    const localMidnight = '2026-11-30T05:00:00.000Z'; // midnight Nov 30 in New York
    expect(isExpired(localMidnight, new Date('2026-12-01T03:00:00Z'))).toBe(false);
    expect(isExpired(localMidnight, new Date('2026-12-01T06:00:00Z'))).toBe(true);
  });

  it('filters only the expired events out of a list', () => {
    const now = new Date('2026-12-05T15:00:00Z');
    const events = [
      { title: 'expired', expiresAt: NOV_30 },
      { title: 'no expiry', expiresAt: null },
      { title: 'later', expiresAt: '2026-12-20T12:00:00.000Z' },
    ];
    expect(withoutExpired(events, now).map((e) => e.title)).toEqual(['no expiry', 'later']);
  });
});
