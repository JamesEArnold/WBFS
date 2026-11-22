import Link from 'next/link';
import { GUIDES, POPULAR_GUIDES } from '../../help/guides';

/** Top of the admin home screen: the how-to guides, front and centre. */
export function HowToDashboard() {
  const popular = POPULAR_GUIDES.map((slug) => GUIDES.find((g) => g.slug === slug)).filter(Boolean);
  return (
    <section className="howto-dash" data-testid="howto-dashboard">
      <div className="howto-dash__intro">
        <p className="help-kicker">How-to guides</p>
        <h2>What would you like to do?</h2>
        <p>Step-by-step instructions with pictures for everything on the website. No experience needed. You can’t break the design, and every change can be undone.</p>
        <Link className="howto-dash__all" href="/admin/help">
          See all {GUIDES.length} guides →
        </Link>
      </div>
      <div className="howto-dash__links">
        {popular.map((g) => (
          <Link key={g!.slug} href={`/admin/help/${g!.slug}`} className="howto-dash__link">
            <strong>{g!.title}</strong>
            <span>{g!.summary}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
