'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { QUICK_EVENT_MESSAGE, QUICK_EVENT_PREVIEW_PATH, QUICK_EVENT_READY, type PreviewMedia, type QuickEventMessage } from '@/lib/cms/previewMessages';
import { MediaPicker, PickedFile, type PickedMedia } from './MediaPicker';

/** What the preview needs about a chosen file (not its thumbnail). */
const forPreview = (media: PickedMedia): PreviewMedia => ({
  id: media.id,
  url: media.url,
  mimeType: media.mimeType,
  alt: media.alt,
  filename: media.filename,
  width: media.width,
  height: media.height,
});

/**
 * The "Post a new event" form, with a live preview of the event beside it
 * (app/(frontend)/preview/new-event). Creates the event through
 * /api/events/quick-create (cms/collections/Events.ts).
 */
export function NewEventForm() {
  const router = useRouter();
  const [busy, setBusy] = useState<'publish' | 'draft' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [flyerPdf, setFlyerPdf] = useState<PickedMedia | null>(null);
  const [flyerImages, setFlyerImages] = useState<PickedMedia[]>([]);
  // The latest chosen files, for sending to the preview from event handlers.
  const filesRef = useRef({ flyerPdf, flyerImages });
  useEffect(() => {
    filesRef.current = { flyerPdf, flyerImages };
  }, [flyerPdf, flyerImages]);

  /** Send what's typed so far to the preview. */
  const updatePreview = useCallback(() => {
    const form = formRef.current;
    const frame = frameRef.current?.contentWindow;
    if (!form || !frame) return;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? '');
    const message: QuickEventMessage = {
      type: QUICK_EVENT_MESSAGE,
      input: {
        title: field('title'),
        date: field('date'),
        place: field('place'),
        about: field('about'),
        flyerPdf: filesRef.current.flyerPdf ? forPreview(filesRef.current.flyerPdf) : null,
        flyerImages: filesRef.current.flyerImages.map(forPreview),
      },
    };
    frame.postMessage(message, window.location.origin);
  }, []);

  // Show newly chosen or removed files in the preview.
  useEffect(() => {
    updatePreview();
  }, [flyerPdf, flyerImages, updatePreview]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if ((event.data as { type?: unknown } | null)?.type === QUICK_EVENT_READY) updatePreview();
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [updatePreview]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    // The upload windows have their own forms; their Save must not submit this one.
    if (event.target !== event.currentTarget) return;
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const publish = submitter?.value === 'publish';
    const form = new FormData(event.currentTarget);
    setBusy(publish ? 'publish' : 'draft');
    setError(null);
    try {
      const res = await fetch('/api/events/quick-create', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.get('title'),
          date: form.get('date'),
          place: form.get('place'),
          about: form.get('about'),
          dropOffAfter: form.get('dropOffAfter') === 'on',
          flyerPdf: flyerPdf?.id,
          flyerImages: flyerImages.map((media) => media.id),
          publish,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.errors?.[0]?.message ?? body?.message ?? 'Something went wrong. Please try again.');
      router.push(`/admin/collections/events/${body.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setBusy(null);
    }
  }

  return (
    <div className="quick-layout">
      <form
        ref={formRef}
        className="quick-form"
        onSubmit={submit}
        onInput={updatePreview}
        onChange={updatePreview}
        data-testid="new-event-form"
      >
        <label className="quick-form__field">
          <span>Event name</span>
          <input name="title" required maxLength={120} placeholder="e.g. Summer Picnic" autoComplete="off" />
        </label>
        <label className="quick-form__field">
          <span>Day of the event</span>
          <input name="date" type="date" required />
        </label>
        <label className="quick-form__field">
          <span>
            Time and place <small>(optional)</small>
          </span>
          <input name="place" placeholder="e.g. 1 PM · North Canton Park" autoComplete="off" />
          <small>Shown after the date on the Events list, like “Saturday, June 5, 2027 · 1 PM · North Canton Park”.</small>
        </label>
        <label className="quick-form__field">
          <span>
            About the event <small>(optional)</small>
          </span>
          <textarea name="about" rows={3} placeholder="A sentence or two for the event’s page." />
        </label>
        <fieldset className="quick-media" data-testid="flyer-pdf">
          <legend>
            Flyer PDF <small>(optional)</small>
          </legend>
          <small>The printable flyer. The event’s page shows a gold “View the printable flyer” button that opens it.</small>
          {flyerPdf ? (
            <PickedFile media={flyerPdf} onRemove={() => setFlyerPdf(null)} />
          ) : (
            <MediaPicker kind="pdf" uploadLabel="Upload the flyer PDF" onPick={setFlyerPdf} />
          )}
        </fieldset>
        <fieldset className="quick-media" data-testid="flyer-pictures">
          <legend>
            Pictures of the flyer <small>(optional)</small>
          </legend>
          <small>A picture (JPG or PNG) of each page. They show on the event’s page, and open the PDF when clicked.</small>
          {flyerImages.map((media) => (
            <PickedFile key={media.id} media={media} onRemove={() => setFlyerImages((list) => list.filter((m) => m.id !== media.id))} />
          ))}
          <MediaPicker
            kind="image"
            uploadLabel={flyerImages.length ? 'Upload another picture' : 'Upload a picture'}
            onPick={(media) => setFlyerImages((list) => (list.some((m) => m.id === media.id) ? list : [...list, media]))}
          />
        </fieldset>
        <label className="quick-form__check">
          <input name="dropOffAfter" type="checkbox" defaultChecked />
          <span>Take it off the Events list after that day. Its own page stays up for anyone with the link.</span>
        </label>
        {error && (
          <p className="quick-form__error" role="alert">
            {error}
          </p>
        )}
        <div className="quick-form__actions">
          <button type="submit" value="publish" className="quick-form__primary" disabled={busy !== null}>
            {busy === 'publish' ? 'Publishing…' : 'Publish now'}
          </button>
          <button type="submit" value="draft" className="quick-form__secondary" disabled={busy !== null}>
            {busy === 'draft' ? 'Saving…' : 'Save as a draft'}
          </button>
        </div>
        <p className="quick-form__note">
          <strong>Publish now</strong> puts it on the website straight away. <strong>Save as a draft</strong> keeps it hidden until you
          click <strong>Publish changes</strong> on the next screen.
        </p>
      </form>
      <aside className="quick-preview" aria-label="Preview">
        <p className="quick-preview__label">Preview: how it will look on the website</p>
        <iframe
          ref={frameRef}
          src={QUICK_EVENT_PREVIEW_PATH}
          title="Preview of the new event"
          className="quick-preview__frame"
          data-testid="new-event-preview"
        />
      </aside>
    </div>
  );
}
