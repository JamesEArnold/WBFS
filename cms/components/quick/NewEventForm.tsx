'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { QUICK_EVENT_MESSAGE, QUICK_EVENT_PREVIEW_PATH, QUICK_EVENT_READY, type QuickEventMessage } from '@/lib/cms/previewMessages';

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
      },
    };
    frame.postMessage(message, window.location.origin);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if ((event.data as { type?: unknown } | null)?.type === QUICK_EVENT_READY) updatePreview();
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [updatePreview]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
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
