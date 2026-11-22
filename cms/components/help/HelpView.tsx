import Link from 'next/link';
import { DefaultTemplate } from '@payloadcms/next/templates';
import { Gutter } from '@payloadcms/ui';
import { notFound, redirect } from 'next/navigation';
import type { AdminViewServerProps } from 'payload';
import { CATEGORIES, GUIDES, guideBySlug, type Guide } from '../../help/guides';
import { GuideSearch } from './GuideSearch';
import { Rich } from './Rich';

/** /admin/help (all guides) and /admin/help/<guide>. Logged-in users only. */
export function HelpView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, locale, permissions, visibleEntities } = initPageResult;
  if (!req.user) redirect('/admin/login?redirect=%2Fadmin%2Fhelp');

  const segments = (params?.segments as string[] | undefined) ?? [];
  const slug = segments[1];
  const guide = slug ? guideBySlug(slug) : undefined;
  if (slug && !guide) notFound();

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
      <Gutter className="help">{guide ? <GuidePage guide={guide} /> : <GuideIndex />}</Gutter>
    </DefaultTemplate>
  );
}

function GuideIndex() {
  const items = GUIDES.map((g) => ({
    slug: g.slug,
    title: g.title,
    summary: g.summary,
    category: g.category,
    minutes: g.minutes,
    adminsOnly: g.adminsOnly,
    // What people search for: the task, its summary and the headings inside it.
    text: [g.title, g.summary, g.category, ...g.parts.map((p) => p.heading ?? '')].join(' ').toLowerCase(),
  }));
  return (
    <div className="help-index">
      <header className="help-hero">
        <p className="help-kicker">How-to guides</p>
        <h1>How do I…?</h1>
        <p>
          Step-by-step instructions for everything you can change on the website, with pictures. Pick what you want to do. New here? Start
          with <Link href="/admin/help/getting-started">Start here: finding your way around</Link>.
        </p>
      </header>
      <GuideSearch items={items} categories={[...CATEGORIES]} />
    </div>
  );
}

function GuidePage({ guide }: { guide: Guide }) {
  // Steps are numbered continuously across the guide's parts.
  const firstNumber = guide.parts.map((_, p) => guide.parts.slice(0, p).reduce((n, part) => n + part.steps.length, 1));
  const related = (guide.related ?? []).map(guideBySlug).filter((g): g is Guide => Boolean(g));
  return (
    <article className="help-guide" data-testid="help-guide">
      <nav className="help-crumbs">
        <Link href="/admin/help">← All how-to guides</Link>
      </nav>
      <p className="help-kicker">
        {guide.category} · About {guide.minutes} min{guide.adminsOnly ? ' · Admins only' : ''}
      </p>
      <h1>{guide.title}</h1>
      <p className="help-summary">{guide.summary}</p>

      {guide.beforeYouStart && (
        <aside className="help-box help-box--info">
          <h2>Before you start</h2>
          <ul>
            {guide.beforeYouStart.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
        </aside>
      )}

      {guide.parts.map((part, p) => (
        <section key={p} className="help-part">
          {part.heading && <h2>{part.heading}</h2>}
          {part.intro && (
            <p className="help-intro">
              <Rich text={part.intro} />
            </p>
          )}
          <ol className="help-steps">
            {part.steps.map((step, s) => {
              const stepNumber = firstNumber[p] + s;
              return (
                <li key={stepNumber} className="help-step">
                  <span className="help-step__number" aria-hidden>
                    {stepNumber}
                  </span>
                  <div className="help-step__body">
                    <p className="help-step__text">
                      <Rich text={step.text} />
                    </p>
                    {step.detail && (
                      <p className="help-step__detail">
                        <Rich text={step.detail} />
                      </p>
                    )}
                    {step.tip && (
                      <p className="help-tip">
                        <strong>Tip:</strong> <Rich text={step.tip} />
                      </p>
                    )}
                    {step.image && (
                      <a href={`/admin-help/${step.image}.jpg`} target="_blank" rel="noreferrer" className="help-shot">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/admin-help/${step.image}.jpg`} alt={`Screenshot for step ${stepNumber}`} loading="lazy" />
                        <span className="help-shot__hint">Click the picture to see it full size. The red box shows where to click or look.</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {guide.checkYourWork && (
        <aside className="help-box help-box--success">
          <h2>Check your work</h2>
          <ul>
            {guide.checkYourWork.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
        </aside>
      )}

      {guide.troubleshooting && (
        <section className="help-part">
          <h2>If something goes wrong</h2>
          <dl className="help-faq">
            {guide.troubleshooting.map((item) => (
              <div key={item.problem}>
                <dt>
                  <Rich text={item.problem} />
                </dt>
                <dd>
                  <Rich text={item.fix} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="help-part">
          <h2>Related guides</h2>
          <div className="help-cards">
            {related.map((g) => (
              <Link key={g.slug} href={`/admin/help/${g.slug}`} className="help-card">
                <strong>{g.title}</strong>
                <span>{g.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <p className="help-back">
        <Link href="/admin/help">← All how-to guides</Link> · <Link href="/admin">Back to the home screen</Link>
      </p>
    </article>
  );
}
