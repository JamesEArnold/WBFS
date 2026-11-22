import { describe, expect, it } from 'vitest';
import { valuesAtPath } from '@/cms/hooks/mediaRefs';

describe('finding where a file is used in page content', () => {
  const page = {
    ctaButtons: [
      { label: 'Flyer', linkType: 'file', file: 7 },
      { label: 'Donate', linkType: 'url', url: '/donate', file: null },
    ],
    sections: [{ images: [{ image: 3 }, { image: { id: 9, url: '/x.jpg' } }] }],
  };

  it('finds files inside lists of buttons', () => {
    expect(valuesAtPath(page, ['ctaButtons', 'file'])).toEqual([7, null]);
  });

  it('walks nested lists, whether files are ids or loaded documents', () => {
    expect(valuesAtPath(page, ['sections', 'images', 'image'])).toEqual([3, { id: 9, url: '/x.jpg' }]);
  });

  it('returns nothing when the content has no such field', () => {
    expect(valuesAtPath(page, ['flyerPdf'])).toEqual([undefined]);
    expect(valuesAtPath(null, ['ctaButtons', 'file'])).toEqual([]);
  });
});
