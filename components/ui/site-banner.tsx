import Link from 'next/link';
import { LAWMAN } from '@/components/designs/lawman/theme';

const { NEAR_BLACK, GOLD, GOLD_BRIGHT, CREAM } = LAWMAN;

/** Announcement strip under the header, controlled from Site Settings → Banner. */
export const SiteBanner = ({
  text,
  linkLabel,
  linkUrl,
}: {
  text: string;
  linkLabel?: string | null;
  linkUrl?: string | null;
}) => (
  <div
    data-testid="site-banner"
    className="px-5 py-2 text-center text-[11px] font-bold tracking-[0.3em] uppercase"
    style={{ background: NEAR_BLACK, color: CREAM, borderBottom: `1px solid ${GOLD}` }}
  >
    <span>{text}</span>
    {linkLabel && linkUrl && (
      <>
        {' '}
        <Link href={linkUrl} className="underline" style={{ color: GOLD_BRIGHT }}>
          {linkLabel}
        </Link>
      </>
    )}
  </div>
);
