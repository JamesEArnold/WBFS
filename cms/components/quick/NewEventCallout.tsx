import Link from 'next/link';

/** Above the Events list: point people at the quick form. */
export function NewEventCallout() {
  return (
    <div className="quick-callout" data-testid="new-event-callout">
      <span>
        <strong>Posting a new event?</strong> The quick form asks for just the name, day and place.
      </span>
      <Link href="/admin/new-event" className="howto-dash__all">
        Post a new event →
      </Link>
    </div>
  );
}
