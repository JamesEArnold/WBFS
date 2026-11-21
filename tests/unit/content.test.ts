import { describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('next/headers', () => ({ draftMode: vi.fn(), headers: vi.fn() }));
vi.mock('@/lib/cms/preview', () => ({}));
vi.mock('@/lib/cms/public', () => ({}));

const { buttonHref, sameSiteUrl } = await import('@/lib/cms/content');

describe('media URLs', () => {
  it('makes locally stored Payload files relative to any host', () => {
    expect(sameSiteUrl('http://localhost:3000/api/media/file/flyer.pdf')).toBe('/api/media/file/flyer.pdf');
    expect(sameSiteUrl('/api/media/file/flyer.pdf')).toBe('/api/media/file/flyer.pdf');
  });

  it('leaves Vercel Blob URLs absolute', () => {
    const blob = 'https://abc.public.blob.vercel-storage.com/flyer-x1y2.pdf';
    expect(sameSiteUrl(blob)).toBe(blob);
  });
});

describe('buttons', () => {
  it('links "file" buttons to the uploaded file and others to their URL', () => {
    const file = { id: 1, alt: 'Flyer', url: 'http://localhost:3000/api/media/file/f.pdf', updatedAt: '', createdAt: '' };
    expect(buttonHref({ label: 'Flyer', linkType: 'file', file })).toBe('/api/media/file/f.pdf');
    expect(buttonHref({ label: 'Donate', linkType: 'url', url: '/donate' })).toBe('/donate');
    expect(buttonHref({ label: 'Broken', linkType: 'file', file: null })).toBeNull();
  });
});
