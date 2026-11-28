'use client';

import { useEffect, useState } from 'react';
import { quickEventPreview } from '@/cms/quickEvent';
import { isQuickEventMessage, QUICK_EVENT_READY, type QuickEventMessage } from '@/lib/cms/previewMessages';
import { EventCard } from './event-card';
import { EventHero } from './event-hero';
import { LAWMAN } from './theme';

const { BLACK, GOLD_BRIGHT, CREAM } = LAWMAN;

/**
 * Live preview for the "Post a new event" quick form: the top of the event's
 * page and its box on the Events list, drawn with the real site components
 * from what's typed so far (sent by cms/components/quick/NewEventForm.tsx).
 */
export function QuickEventPreview() {
  const [input, setInput] = useState<QuickEventMessage['input']>({});

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      if (isQuickEventMessage(event.data)) setInput(event.data.input);
    };
    window.addEventListener('message', onMessage);
    // Ask the form for what's typed so far (it may have been filled in before this loaded).
    if (window.parent !== window) window.parent.postMessage({ type: QUICK_EVENT_READY }, window.location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const event = quickEventPreview(input);
  return (
    <main style={{ background: BLACK, color: CREAM }} data-testid="quick-event-preview">
      <EventHero event={{ ...event, heading: null, headingAccent: null, dateLabel: null, soldOutBanner: undefined }} />
      <section className="px-5 py-14" style={{ background: BLACK }}>
        <div className="max-w-5xl mx-auto">
          <p className="mb-6 text-[11px] font-bold tracking-[0.4em] uppercase text-center" style={{ color: GOLD_BRIGHT }}>
            ★ On the Events list ★
          </p>
          <EventCard event={{ ...event, overline: null, facts: null }} />
        </div>
      </section>
    </main>
  );
}
