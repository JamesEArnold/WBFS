import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CATEGORIES, GUIDES, POPULAR_GUIDES, guideBySlug } from '@/cms/help/guides';

describe('how-to guides', () => {
  it('have unique addresses', () => {
    const slugs = GUIDES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every screenshot a guide refers to exists', () => {
    const images = GUIDES.flatMap((g) => g.parts.flatMap((p) => p.steps.map((s) => s.image))).filter(Boolean);
    expect(images.length).toBeGreaterThan(20);
    for (const image of images) expect(fs.existsSync(`public/admin-help/${image}.jpg`), image).toBe(true);
  });

  it('links only to guides that exist, and every category is used', () => {
    for (const g of GUIDES) for (const r of g.related ?? []) expect(guideBySlug(r), `${g.slug} → ${r}`).toBeDefined();
    for (const slug of POPULAR_GUIDES) expect(guideBySlug(slug), slug).toBeDefined();
    for (const c of CATEGORIES) expect(GUIDES.some((g) => g.category === c), c).toBe(true);
  });

  it('avoid technical jargon in what editors read', () => {
    const text = GUIDES.flatMap((g) => [
      g.title,
      g.summary,
      ...(g.beforeYouStart ?? []),
      ...(g.checkYourWork ?? []),
      ...(g.troubleshooting ?? []).flatMap((t) => [t.problem, t.fix]),
      ...g.parts.flatMap((p) => [p.heading ?? '', p.intro ?? '', ...p.steps.flatMap((s) => [s.text, s.detail ?? '', s.tip ?? ''])]),
    ])
      .join('\n')
      .toLowerCase();
    for (const word of ['slug', 'global', 'collection', 'cms', 'url', 'database', 'deploy', 'cache', 'api']) {
      expect(text, word).not.toMatch(new RegExp(`\\b${word}\\b`));
    }
  });
});
