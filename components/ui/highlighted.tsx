/**
 * Renders editor text where words wrapped in **double stars** are shown in a
 * highlight colour (e.g. "Please make payable to **Weisburn For Sheriff**").
 */
export function Highlighted({ text, color }: { text: string; color: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} style={{ color }}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
