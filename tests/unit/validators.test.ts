import { describe, expect, it } from 'vitest';
import { slugify, validateEmbedUrl, validateLinkUrl, validateSlug } from '@/cms/fields/validators';

describe('slugs', () => {
  it('turns titles into clean URL slugs', () => {
    expect(slugify('Annual Golf Fundraiser')).toBe('annual-golf-fundraiser');
    expect(slugify('  Fish & Chips — Café Night!  ')).toBe('fish-and-chips-cafe-night');
  });

  it('accepts well-formed slugs', () => {
    expect(validateSlug('summer-picnic-2026')).toBe(true);
  });

  it('rejects malformed slugs with an editor-friendly message', () => {
    for (const bad of ['', 'Has Caps', 'double--dash', '-leading', 'trailing-', 'under_score']) {
      expect(validateSlug(bad), bad).toEqual(expect.any(String));
    }
  });

  it('rejects slugs that would shadow site routes', () => {
    for (const reserved of ['admin', 'api', 'events', 'about', 'donate', 'time-in-office', 'preview']) {
      expect(validateSlug(reserved), reserved).toMatch(/reserved/);
    }
  });
});

describe('links typed into content', () => {
  it('allows site paths, https, mailto and tel', () => {
    for (const ok of ['/donate', 'https://example.com/x', 'mailto:a@b.c?subject=Hi', 'tel:+13305551234']) {
      expect(validateLinkUrl(ok), ok).toBe(true);
    }
  });

  it('allows jumping to a section of the same page', () => {
    expect(validateLinkUrl('#volunteer')).toBe(true);
    expect(validateLinkUrl('#')).toEqual(expect.any(String));
  });

  it('treats empty as fine unless required', () => {
    expect(validateLinkUrl('')).toBe(true);
    expect(validateLinkUrl('', { required: true })).toEqual(expect.any(String));
  });

  it('rejects raw Vercel Blob URLs so files go through Media', () => {
    expect(validateLinkUrl('https://abc123.public.blob.vercel-storage.com/flyer.pdf')).toMatch(/Link to file/);
  });

  it('rejects protocol-relative and script URLs', () => {
    expect(validateLinkUrl('//evil.example')).toEqual(expect.any(String));
    expect(validateLinkUrl('javascript:alert(1)')).toEqual(expect.any(String));
  });
});

describe('embeds', () => {
  it('only allows approved hosts over https', () => {
    expect(validateEmbedUrl('https://donorbox.org/embed/weisburn-for-sheriff')).toBe(true);
    expect(validateEmbedUrl('https://www.youtube.com/embed/abc')).toBe(true);
    expect(validateEmbedUrl('http://donorbox.org/embed/x')).toEqual(expect.any(String));
    expect(validateEmbedUrl('https://evil.example/embed')).toMatch(/limited to/);
  });
});
