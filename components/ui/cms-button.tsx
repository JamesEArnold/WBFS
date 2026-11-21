import Link from 'next/link';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { buttonHref, type Button } from '@/lib/cms/content';

const { BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT } = LAWMAN;

/**
 * Renders a CMS button with the site's two existing button styles.
 * - `hero`: event-page hero buttons (inline-flex, taller, shadowed primary)
 * - `compact`: empty-state / card buttons
 */
export function CmsButton({ button, size = 'hero' }: { button: Button; size?: 'hero' | 'compact' }) {
  const href = buttonHref(button);
  if (!href) return null;

  const secondary = button.style === 'secondary';
  const className =
    size === 'hero'
      ? `inline-flex items-center px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase${secondary ? ' border-2' : ''}`
      : `px-7 py-3 text-xs font-bold tracking-[0.3em] uppercase${secondary ? ' border-2' : ''}`;
  const style = secondary
    ? { borderColor: GOLD, color: GOLD_BRIGHT }
    : size === 'hero'
      ? { background: GOLD, color: BLACK, boxShadow: `0 4px 0 ${COAL_LIFT}` }
      : { background: GOLD, color: BLACK };

  const isInternal = href.startsWith('/') && !href.startsWith('//') && button.linkType !== 'file';
  if (isInternal && !button.newTab) {
    return (
      <Link href={href} className={className} style={style}>
        {button.label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      style={style}
      {...(button.newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {button.label}
    </a>
  );
}
