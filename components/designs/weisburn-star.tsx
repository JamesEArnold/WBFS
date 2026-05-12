'use client';

interface WeisburnStarProps {
  size?: number;
  /** Inner medallion text (line 1) */
  title?: string;
  /** Inner medallion text (line 2) */
  subtitle?: string;
  /** Inner medallion text (line 3, smaller) */
  caption?: string;
  goldDeep?: string;
  goldBright?: string;
  goldShadow?: string;
  outline?: string;
  cream?: string;
  ink?: string;
  className?: string;
}

/**
 * Polished classic 5-point sheriff star, with metallic gold gradient,
 * inscribed bezel, and centered candidate text.
 *
 * NOTE: This is a designed in-product star mark. If the campaign has an
 * official Sheriff Weisburn star asset (PNG/SVG), drop it in /public and
 * swap the wrapping component to render that instead.
 */
export const WeisburnStar = ({
  size = 220,
  title = 'SHERIFF',
  subtitle = 'WEISBURN',
  caption = '★ STARK COUNTY ★',
  goldDeep = '#8a6a25',
  goldBright = '#f3d77a',
  goldShadow = '#5e4413',
  outline = '#1a1208',
  cream = '#f4ecdb',
  ink = '#0a0a0a',
  className,
}: WeisburnStarProps) => {
  // 5-point star geometry (classic sheriff star shape)
  const cx = 100;
  const cy = 102;
  const outerR = 96;
  const innerR = 40;
  const points = (() => {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * 36 - 90) * (Math.PI / 180);
      const r = i % 2 === 0 ? outerR : innerR;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return pts.join(' ');
  })();

  // Small "ball" decorations on each star point (classic sheriff badge detail)
  const balls = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const r = outerR - 6;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  });

  return (
    <svg
      viewBox="0 0 200 204"
      width={size}
      height={size * (204 / 200)}
      className={className}
      role="img"
      aria-label="Sheriff Weisburn campaign star"
    >
      <defs>
        <radialGradient id="ws-fill" cx="0.5" cy="0.34" r="0.72">
          <stop offset="0%" stopColor={goldBright} />
          <stop offset="55%" stopColor={goldDeep} />
          <stop offset="100%" stopColor={goldShadow} />
        </radialGradient>
        <linearGradient id="ws-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={goldBright} />
          <stop offset="100%" stopColor={goldShadow} />
        </linearGradient>
        <radialGradient id="ws-center" cx="0.5" cy="0.4" r="0.65">
          <stop offset="0%" stopColor={cream} />
          <stop offset="100%" stopColor="#d8c9aa" />
        </radialGradient>
        <filter id="ws-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id="ws-arc-top" d="M 36 102 A 64 64 0 0 1 164 102" />
        <path id="ws-arc-bot" d="M 36 102 A 64 64 0 0 0 164 102" />
      </defs>

      {/* Star body */}
      <g filter="url(#ws-shadow)">
        <polygon
          points={points}
          fill="url(#ws-fill)"
          stroke={outline}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner highlight along upper edges of star */}
        <polygon
          points={points}
          fill="none"
          stroke={goldBright}
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity="0.6"
          transform="translate(0,-1.2)"
        />
      </g>

      {/* Decorative ball at each star point */}
      {balls.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r="4.6" fill={goldShadow} />
          <circle cx={b.x - 1.2} cy={b.y - 1.2} r="2" fill={goldBright} opacity="0.7" />
        </g>
      ))}

      {/* Bezel ring around medallion */}
      <circle
        cx={cx}
        cy={cy}
        r="46"
        fill="none"
        stroke="url(#ws-rim)"
        strokeWidth="3.5"
      />
      <circle
        cx={cx}
        cy={cy}
        r="42.5"
        fill="none"
        stroke={outline}
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* Center medallion */}
      <circle
        cx={cx}
        cy={cy}
        r="40"
        fill="url(#ws-center)"
        stroke={outline}
        strokeWidth="1.2"
      />

      {/* Top arc text "FOR SHERIFF" — removed (replaced by stack) */}

      {/* Stack of medallion text */}
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="900"
        fontSize="10"
        letterSpacing="2.5"
        fill={ink}
      >
        {title}
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="900"
        fontSize="16"
        letterSpacing="1.4"
        fill={ink}
      >
        {subtitle}
      </text>
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="700"
        fontSize="6.5"
        letterSpacing="1.6"
        fill={goldDeep}
      >
        {caption}
      </text>
    </svg>
  );
};
