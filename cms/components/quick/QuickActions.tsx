import Link from 'next/link';

/** Admin home screen: one-click shortcuts for the most common jobs. */
const ACTIONS = [
  { href: '/admin/new-event', title: 'Post a new event', summary: 'Name, day and place. Everything else is filled in for you.' },
  { href: '/admin/globals/siteSettings', title: 'Announcement banner', summary: 'Turn the strip across the top of every page on or off.' },
  { href: '/admin/globals/home', title: 'Change the Home page', summary: 'Click anything in the preview to edit it.' },
  { href: '/admin/collections/events', title: 'Update an event', summary: 'Mark it sold out, change details or take it down.' },
];

export function QuickActions() {
  return (
    <nav className="quick-actions" aria-label="Quick actions" data-testid="quick-actions">
      <p className="help-kicker">Quick actions</p>
      <div className="quick-actions__links">
        {ACTIONS.map((action) => (
          <Link key={action.href} href={action.href} className="howto-dash__link">
            <strong>{action.title}</strong>
            <span>{action.summary}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
