'use client';

import Link from 'next/link';

const Star = ({ size, color }: { size: number; color: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden>
    <path d="M12 2.5l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 17l-5.9 3.6 1.7-6.7L2.5 9.4l6.9-.5z" />
  </svg>
);

interface LogoProps {
  variant?: 'horizontal' | 'stacked';
  /** Color of the candidate name text. */
  primary?: string;
  /** Color of stars and "Re-Elect" / "For Sheriff" supporting text. */
  accent?: string;
  /** Approximate total height in px (controls scale). */
  height?: number;
  /** Optional outline color for the heavy candidate name (mimics original mark). */
  outline?: string;
  href?: string | null;
  className?: string;
}

/**
 * Typographic recreation of the "Re-Elect Sheriff Weisburn" mark.
 *
 * Renders as styled text + inline SVG stars rather than the PNG asset, so it
 * inherits the design's color palette with no opaque white background.
 */
export const Logo = ({
  variant = 'horizontal',
  primary = '#0f0f0f',
  accent = '#b91c1c',
  outline,
  height = 48,
  href = '/',
  className,
}: LogoProps) => {
  const heavyTextStyle = (size: number) => ({
    color: primary,
    fontSize: size,
    fontWeight: 900,
    letterSpacing: '0.04em',
    lineHeight: 0.95,
    fontFamily: "'Inter', system-ui, sans-serif",
    ...(outline
      ? { WebkitTextStroke: `1px ${outline}` as string }
      : null),
  });

  let body: React.ReactNode;

  if (variant === 'stacked') {
    const starSize = height * 0.13;
    body = (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: 1,
          gap: height * 0.04,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: height * 0.06,
          }}
        >
          <Star size={starSize} color={accent} />
          <Star size={starSize} color={accent} />
          <Star size={starSize} color={accent} />
          <span
            style={{
              color: accent,
              fontSize: height * 0.18,
              fontStyle: 'italic',
              fontWeight: 700,
              fontFamily: "var(--font-playfair), Georgia, serif",
              padding: `0 ${height * 0.1}px`,
            }}
          >
            Re-Elect
          </span>
          <Star size={starSize} color={accent} />
          <Star size={starSize} color={accent} />
          <Star size={starSize} color={accent} />
        </span>
        <span style={heavyTextStyle(height * 0.32)}>SHERIFF</span>
        <span style={heavyTextStyle(height * 0.32)}>WEISBURN</span>
      </span>
    );
  } else {
    body = (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: height * 0.18,
          lineHeight: 1,
        }}
      >
        <Star size={height * 0.42} color={accent} />
        <span
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <span style={heavyTextStyle(height * 0.6)}>WEISBURN</span>
          <span
            style={{
              color: accent,
              fontSize: height * 0.21,
              fontWeight: 700,
              letterSpacing: '0.32em',
              paddingLeft: '0.32em',
              textTransform: 'uppercase',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            For Sheriff
          </span>
        </span>
        <Star size={height * 0.42} color={accent} />
      </span>
    );
  }

  if (!href) return <>{body}</>;
  return (
    <Link
      href={href}
      aria-label="Weisburn for Sheriff — Home"
      style={{ display: 'inline-flex' }}
    >
      {body}
    </Link>
  );
};
