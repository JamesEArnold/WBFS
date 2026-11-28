import { describe, expect, it } from 'vitest';
import { PREVIEW_TITLE, quickEventData, quickEventErrors, quickEventPreview } from '@/cms/quickEvent';

const base = { title: 'Summer Picnic', date: '2027-06-05' };

describe('"Post a new event" quick form', () => {
  it('needs only a name and a day', () => {
    expect(quickEventErrors(base)).toEqual([]);
    const data = quickEventData(base);
    expect(data).toMatchObject({ title: 'Summer Picnic', date: '2027-06-05T12:00:00.000Z', status: 'upcoming', _status: 'draft' });
  });

  it('explains what is missing in plain words', () => {
    expect(quickEventErrors({})).toEqual(['Type the event’s name.', 'Choose the day of the event.']);
    expect(quickEventErrors({ title: '   ', date: '2027-02-30' })).toEqual(['Type the event’s name.', 'Choose the day of the event.']);
    expect(() => quickEventData({ title: 'x' })).toThrow('Choose the day of the event.');
  });

  it('writes the date and place line shown on the Events list', () => {
    expect(quickEventData({ ...base, place: ' 1 PM · North Canton Park ' }).subtitle).toBe('Saturday, June 5, 2027 · 1 PM · North Canton Park');
    // No place: left blank, so the list shows just the date.
    expect(quickEventData(base).subtitle).toBeUndefined();
  });

  it('takes the event off the list after its day unless asked not to', () => {
    expect(quickEventData(base).expiresAt).toBe('2027-06-05T12:00:00.000Z');
    expect(quickEventData({ ...base, dropOffAfter: false }).expiresAt).toBeUndefined();
  });

  it('publishes only when asked', () => {
    expect(quickEventData({ ...base, publish: true })._status).toBe('published');
    expect(quickEventData({ ...base, publish: 'yes' })._status).toBe('draft');
  });

  it('keeps the description, trimmed', () => {
    expect(quickEventData({ ...base, about: '  Food and games for the family.  ' }).heroBlurb).toBe('Food and games for the family.');
  });
});

describe('"Post a new event" flyer', () => {
  it('attaches the chosen flyer PDF and pictures', () => {
    expect(quickEventData({ ...base, flyerPdf: 7, flyerImages: [8, 9] })).toMatchObject({
      flyerPdf: 7,
      flyerImages: [{ image: 8 }, { image: 9 }],
    });
  });

  it('leaves them out when none are chosen', () => {
    const data = quickEventData(base);
    expect(data).not.toHaveProperty('flyerPdf');
    expect(data).not.toHaveProperty('flyerImages');
  });

  it('ignores anything that isn’t a file id, and repeats', () => {
    expect(quickEventData({ ...base, flyerPdf: 'abc', flyerImages: [8, 8, -1, 2.5, '9', null] })).toMatchObject({ flyerImages: [{ image: 8 }] });
    expect(quickEventData({ ...base, flyerPdf: 'abc' })).not.toHaveProperty('flyerPdf');
  });
});

describe('"Post a new event" preview while typing', () => {
  it('shows a placeholder name and no date until they are filled in', () => {
    expect(quickEventPreview({})).toMatchObject({ title: PREVIEW_TITLE, date: '', subtitle: null, heroBlurb: null });
  });

  it('matches what will be saved once the form is complete', () => {
    const input = { ...base, place: '1 PM · North Canton Park', about: 'Food and games.' };
    const saved = quickEventData(input);
    expect(quickEventPreview(input)).toMatchObject({ title: saved.title, date: saved.date, subtitle: saved.subtitle, heroBlurb: saved.heroBlurb });
  });

  it('shows the place on its own before a day is picked', () => {
    expect(quickEventPreview({ title: 'Picnic', place: 'North Canton Park' }).subtitle).toBe('North Canton Park');
  });
});
