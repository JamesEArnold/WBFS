import { describe, expect, it } from 'vitest';
import { plainLabel, rowName, withPlainLabels } from '@/cms/fields/plainLabels';

describe('plain-English field labels for editors', () => {
  it('names common page parts in everyday words', () => {
    expect(plainLabel('ctaOverline')).toBe('Small gold line');
    expect(plainLabel('heading')).toBe('Headline');
    expect(plainLabel('headingAccent')).toBe('Headline — gold second line');
    expect(plainLabel('timelineHeading')).toBe('Heading');
    expect(plainLabel('portraitBody')).toBe('Paragraph');
    expect(plainLabel('portraitLinkLabel')).toBe('Link text');
    expect(plainLabel('ctaUrl')).toBe('Link address');
    expect(plainLabel('donorboxUrl')).toBeUndefined();
  });

  it('names list rows so the add buttons read naturally ("Add Button", "Add Photo")', () => {
    expect(rowName('heroButtons')).toBe('Button');
    expect(rowName('gallery')).toBe('Photo');
    expect(rowName('volunteerTasks')).toBe('Line');
    const [list] = withPlainLabels([{ name: 'ctaButtons', type: 'array', label: 'Buttons', fields: [] }]) as unknown as [
      { labels: { singular: string; plural: string } },
    ];
    expect(list.labels).toEqual({ singular: 'Button', plural: 'Buttons' });
  });

  it('keeps labels that were written on purpose, and reaches nested fields', () => {
    const [group] = withPlainLabels([
      {
        type: 'collapsible',
        label: 'Top of page',
        fields: [
          { name: 'overline', type: 'text' },
          { name: 'heading', type: 'text', label: 'Custom' },
        ],
      },
    ]) as unknown as [{ fields: { label?: string }[] }];
    expect(group.fields.map((f) => f.label)).toEqual(['Small gold line', 'Custom']);
  });
});
