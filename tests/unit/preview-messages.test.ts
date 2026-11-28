import { describe, expect, it } from 'vitest';
import { isEditFieldMessage, isQuickEventMessage, QUICK_EVENT_MESSAGE } from '@/lib/cms/previewMessages';

const pdf = { id: 1, url: '/api/media/file/flyer.pdf', mimeType: 'application/pdf', alt: 'Flyer' };
const photo = { id: 2, url: 'https://abc.public.blob.vercel-storage.com/front.jpg', mimeType: 'image/jpeg', alt: 'Front', width: 800, height: 600 };

describe('messages between the admin and its previews', () => {
  it('accepts the quick event form’s contents, with or without files', () => {
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { title: 'Picnic', date: '2027-06-05' } })).toBe(true);
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { title: 'Picnic', flyerPdf: pdf, flyerImages: [photo] } })).toBe(true);
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { flyerPdf: null, flyerImages: [] } })).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isQuickEventMessage({ type: 'other', input: {} })).toBe(false);
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { title: 5 } })).toBe(false);
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { flyerPdf: { ...pdf, url: 'javascript:alert(1)' } } })).toBe(false);
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { flyerPdf: { ...pdf, url: '//evil.example/x.pdf' } } })).toBe(false);
    expect(isQuickEventMessage({ type: QUICK_EVENT_MESSAGE, input: { flyerImages: [{ url: '/x.jpg' }] } })).toBe(false);
    expect(isQuickEventMessage(null)).toBe(false);
  });

  it('accepts click-to-edit messages naming a field and tab', () => {
    expect(isEditFieldMessage({ type: 'wbfs:edit-field', field: 'heading', tab: 'Top of page' })).toBe(true);
    expect(isEditFieldMessage({ type: 'wbfs:edit-field', field: 3 })).toBe(false);
  });
});
