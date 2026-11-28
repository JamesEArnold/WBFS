'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** The "Post a new event" form. Creates the event through /api/events/quick-create (cms/collections/Events.ts). */
export function NewEventForm() {
  const router = useRouter();
  const [busy, setBusy] = useState<'publish' | 'draft' | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <form className="quick-form" onSubmit={submit} data-testid="new-event-form">
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
        <strong>Publish now</strong> puts it on the website straight away. <strong>Save as a draft</strong> keeps it hidden until you click{' '}
        <strong>Publish changes</strong> on the next screen.
      </p>
    </form>
  );
}
