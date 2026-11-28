import { describe, expect, it } from 'vitest';
import { editable, fieldElementIds } from '@/lib/cms/editable';

describe('click-to-edit markers', () => {
  it('marks a field, and its tab when given', () => {
    expect(editable('heading')).toEqual({ 'data-cms-field': 'heading' });
    expect(editable('heading', 'Top of page')).toEqual({ 'data-cms-field': 'heading', 'data-cms-tab': 'Top of page' });
  });

  it('finds a plain field by Payload’s input id', () => {
    expect(fieldElementIds('intro')).toEqual(['field-intro']);
  });

  it('finds a list row, then falls back to the whole list', () => {
    expect(fieldElementIds('gallery.2')).toEqual(['gallery-row-2', 'field-gallery']);
  });

  it('finds a field inside a section, then the section, then the sections list', () => {
    expect(fieldElementIds('extraSections.0.heading')).toEqual([
      'field-extraSections__0__heading',
      'extraSections-row-0',
      'field-extraSections',
    ]);
  });

  it('handles lists inside lists', () => {
    expect(fieldElementIds('years.1.events.3')).toEqual(['years-1-events-row-3', 'field-years__1__events', 'years-row-1', 'field-years']);
  });
});
