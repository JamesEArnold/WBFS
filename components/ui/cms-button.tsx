import Link from 'next/link';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { buttonHref, type Button } from '@/lib/cms/media';

const { BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT } = LAWMAN;

/**
 * The site's existing button variants, by where they appear:
 * - `hero`: event-page hero buttons (inline-flex, shadowed primary)
 * - `compact`: empty-state / card buttons
 * - `cta`: closing call-to-action buttons on content pages
 * - `raised`: like `cta`, with the shadowed primary (home page top)
 * - `signoff`: About page sign-off buttons (centred text, shadowed primary)
 */
const SIZES = {
  hero: { className: 'inline-flex items-center px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase', shadow: true },
  compact: { className: 'px-7 py-3 text-xs font-bold tracking-[0.3em] uppercase', shadow: false },
  cta: { className: 'px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase', shadow: false },
  raised: { className: 'px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase', shadow: true },
  signoff: { className: 'px-7 py-4 text-xs font-bold tracking-[0.3em] text-center uppercase', shadow: true },
} as const;

export function CmsButton({ button, size = 'hero' }: { button: Button; size?: keyof typeof SIZES }) {
  const href = buttonHref(button);
  if (!href) return null;

  const variant = SIZES[size];
  const secondary = button.style === 'secondary';
  const className = `${variant.className}${secondary ? ' border-2' : ''}`;
  const style = secondary
    ? { borderColor: GOLD, color: GOLD_BRIGHT }
    : variant.shadow
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
