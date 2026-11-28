import { describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('next/headers', () => ({ draftMode: vi.fn(), headers: vi.fn() }));
vi.mock('@/lib/cms/preview', () => ({}));
vi.mock('@/lib/cms/public', () => ({}));

const { buttonHref, eventFlyer, sameSiteUrl } = await import('@/lib/cms/content');

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

describe('event flyer', () => {
  const media = (id: number, filename: string, mimeType: string) => ({
    id,
    alt: filename,
    filename,
    mimeType,
    url: `http://localhost:3000/api/media/file/${filename}`,
    updatedAt: '',
    createdAt: '',
  });
  const pdf = media(1, 'flyer.pdf', 'application/pdf');
  const front = media(2, 'front.jpg', 'image/jpeg');

  it('shows a PDF on its own (the page then offers a button to open it)', () => {
    expect(eventFlyer({ flyerPdf: pdf, flyerImages: [] })).toEqual({ pdf: { ...pdf, url: '/api/media/file/flyer.pdf' }, pictures: [] });
  });

  it('shows pictures of the flyer, each linking to the PDF', () => {
    const flyer = eventFlyer({ flyerPdf: pdf, flyerImages: [{ id: 'a', image: front, linkLabel: 'Open the flyer' }] });
    expect(flyer.pdf?.url).toBe('/api/media/file/flyer.pdf');
    expect(flyer.pictures).toEqual([{ id: 'a', linkLabel: 'Open the flyer', media: { ...front, url: '/api/media/file/front.jpg' } }]);
  });

  it('uses a PDF put under "Flyer pictures" as the PDF, instead of a broken picture', () => {
    const flyer = eventFlyer({ flyerPdf: null, flyerImages: [{ image: pdf }, { image: front }] });
    expect(flyer.pdf?.url).toBe('/api/media/file/flyer.pdf');
    expect(flyer.pictures.map((p) => p.media.filename)).toEqual(['front.jpg']);
  });

  it('has nothing to show without uploads', () => {
    expect(eventFlyer({ flyerPdf: null, flyerImages: null })).toEqual({ pdf: null, pictures: [] });
    // An unpopulated id (not loaded) is ignored rather than guessed at.
    expect(eventFlyer({ flyerPdf: 7, flyerImages: [{ image: 8 }] })).toEqual({ pdf: null, pictures: [] });
  });
});
