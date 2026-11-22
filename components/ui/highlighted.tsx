import type { CSSProperties } from 'react';

/**
 * Renders editor text where words wrapped in **double stars** are highlighted
 * (e.g. "Please make payable to **Weisburn For Sheriff**").
 */
export function Highlighted({ text, style, className }: { text: string; style: CSSProperties; className?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className} style={style}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
