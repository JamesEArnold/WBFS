import Image from 'next/image';
import { eventSubtitle } from '@/lib/cms/eventText';
import type { Event } from '@/payload-types';
import { LAWMAN } from './theme';

const { NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export type EventCardData = Pick<Event, 'title' | 'date' | 'subtitle' | 'overline' | 'facts' | 'listingCtaLabel'>;

/**
 * An event's box on the Events list. The link around it is added by the
 * list (app/(frontend)/events/page.tsx); the "Post a new event" preview shows
 * the box on its own.
 */
export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article
      className="grid items-stretch grid-cols-1 md:grid-cols-12"
      style={{
        background: COAL,
        border: `1px solid ${COAL_LIFT}`,
        borderTop: `3px solid ${GOLD}`,
      }}
    >
      <div className="flex items-center justify-center px-6 py-8 md:col-span-3 md:py-10" style={{ background: NEAR_BLACK }}>
        <Image src="/SheriffStar.PNG" alt="" width={120} height={120} className="block w-24 h-auto md:w-32" />
      </div>
      <div className="flex flex-col justify-center px-6 py-8 md:col-span-9 md:px-10 md:py-10">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          {event.overline}
        </p>
        <h3
          className="mt-2 font-serif font-bold"
          style={{
            color: CREAM,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            lineHeight: 1.05,
          }}
        >
          {event.title}
        </h3>
        <p className="mt-2 text-sm md:text-base" style={{ color: BODY }}>
          {eventSubtitle(event)}
        </p>
        <ul className="mt-5 space-y-1.5 text-sm md:text-base" style={{ color: CREAM }}>
          {(event.facts ?? []).map((f) => (
            <li key={f.id ?? f.text} className="flex items-start gap-3">
              <span style={{ color: GOLD_BRIGHT }}>★</span>
              {f.text}
            </li>
          ))}
        </ul>
        <span
          className="inline-flex items-center self-start gap-3 mt-7 text-xs font-bold tracking-[0.3em] uppercase group-hover:gap-4 transition-all"
          style={{ color: GOLD_BRIGHT, borderBottom: `2px solid ${GOLD}`, paddingBottom: 4 }}
        >
          {event.listingCtaLabel} &rarr;
        </span>
      </div>
    </article>
  );
}
