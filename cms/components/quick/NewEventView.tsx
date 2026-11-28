import Link from 'next/link';
import { DefaultTemplate } from '@payloadcms/next/templates';
import { Gutter } from '@payloadcms/ui';
import { redirect } from 'next/navigation';
import type { AdminViewServerProps } from 'payload';
import { NewEventForm } from './NewEventForm';

/** /admin/new-event — "Post a new event" in one short form. Logged-in staff only (the API checks too). */
export function NewEventView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, locale, permissions, visibleEntities } = initPageResult;
  if (!req.user) redirect('/admin/login?redirect=%2Fadmin%2Fnew-event');

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user}
      visibleEntities={visibleEntities}
    >
      <Gutter className="help quick">
        <header className="help-hero">
          <p className="help-kicker">Quick form</p>
          <h1>Post a new event</h1>
          <p>
            Name, day and place, plus a flyer if you have one. The date line, headline and Events list box are filled in for you, and
            the preview on the right shows the result as you type. On the next screen you can add buttons and change anything.
          </p>
        </header>
        <NewEventForm />
        <p className="quick__aside">
          Want every option? Use the <Link href="/admin/collections/events/create">full event form</Link>. Step-by-step help:{' '}
          <Link href="/admin/help/add-event">Add a new event</Link>.
        </p>
      </Gutter>
    </DefaultTemplate>
  );
}
