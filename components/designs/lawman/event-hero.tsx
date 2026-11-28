import type { ReactNode } from 'react';
import { TAB } from '@/cms/tabs';
import { editable, editableTab } from '@/lib/cms/editable';
import { eventDateLabel, eventHeading } from '@/lib/cms/eventText';
import type { Event } from '@/payload-types';
import { LAWMAN } from './theme';

const { BLACK, NEAR_BLACK, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export type EventHeroData = Pick<Event, 'title' | 'date' | 'status' | 'heading' | 'headingAccent' | 'dateLabel' | 'heroBlurb' | 'soldOutBanner'>;

/**
 * Top of an event's page: the sold-out banner (when sold out), date line,
 * headline and paragraph. Plain markup with no data loading, so the "Post a
 * new event" preview (components/designs/lawman/quick-event-preview.tsx)
 * shows exactly what the real page (app/(frontend)/events/[slug]) will.
 */
export function EventHero({ event, buttons }: { event: EventHeroData; buttons?: ReactNode }) {
  const showSoldOut = event.status === 'soldOut' && Boolean(event.soldOutBanner?.heading);
  const dateLabel = eventDateLabel(event);
  return (
    <>
      {showSoldOut && (
        <div className="w-full py-5 text-center sticky top-0 z-50" style={{ background: GOLD }} {...editable('soldOutBanner.heading', TAB.soldOut)}>
          <p className="font-black uppercase tracking-[0.25em]" style={{ color: BLACK, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
            {event.soldOutBanner?.heading}
          </p>
          {event.soldOutBanner?.body && (
            <p className="max-w-2xl mx-auto mt-2 text-sm font-medium leading-relaxed px-5" style={{ color: BLACK, opacity: 0.8 }}>
              {event.soldOutBanner.body}
            </p>
          )}
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }} {...editableTab(TAB.basics)}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(200,155,60,0.15) 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-5xl px-5 pt-16 pb-10 mx-auto md:pt-20">
          {dateLabel && (
            <div className="flex items-center gap-3" {...editable('dateLabel')}>
              <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
              <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
                {dateLabel}
              </p>
            </div>
          )}
          <h1
            {...editable(event.heading ? 'heading' : 'title')}
            className="mt-6 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.5rem, 7.5vw, 4.75rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            {eventHeading(event)}
            {event.headingAccent && (
              <span
                className="block"
                style={{
                  color: GOLD_BRIGHT,
                  WebkitTextStroke: `1px ${GOLD}`,
                }}
              >
                {event.headingAccent}
              </span>
            )}
          </h1>
          {event.heroBlurb && (
            <p {...editable('heroBlurb')} className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
              {event.heroBlurb}
            </p>
          )}
          {buttons}
        </div>
      </section>
    </>
  );
}
