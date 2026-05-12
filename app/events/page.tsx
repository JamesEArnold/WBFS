'use client';

import { useState } from "react";
import { SwansonEvent } from "@/components/events/swanson-event"
import { GoldFundraiserEvent } from "@/components/events/golf-fundraiser";
import { JulyPicnicEvent } from "@/components/events/july-picnic";
import { FalconesFundraiserEvent } from "@/components/events/falcones-fundraiser";
import { GolfFundraiserEvent2 } from "@/components/events/golf-fundraiser-2";
import { LAWMAN } from "@/components/designs/lawman/theme";
import Link from "next/link";

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, GOLD_LIGHT, CREAM, BODY } = LAWMAN;

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const eventExpirations = [SwansonEvent.expirationTime, GoldFundraiserEvent.expirationTime, JulyPicnicEvent.expirationTime, FalconesFundraiserEvent.expirationTime, GolfFundraiserEvent2.expirationTime];
const events = [GoldFundraiserEvent, JulyPicnicEvent, FalconesFundraiserEvent, GolfFundraiserEvent2]

export default function EventsPage() {
  const [rightNow] = useState(new Date().valueOf());

  const currentMonth = month[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const activeEvents: Array<{ key: string; component: React.ReactNode }> = [];
  if (rightNow < FalconesFundraiserEvent.expirationTime) {
    activeEvents.push({ key: 'falcones', component: FalconesFundraiserEvent.eventCard });
  }
  if (rightNow < GolfFundraiserEvent2.expirationTime) {
    activeEvents.push({ key: 'golf-2', component: GolfFundraiserEvent2.eventCard });
  }

  return (
    <main style={{ background: BLACK, color: CREAM }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(200,155,60,0.15) 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-5xl px-5 py-16 mx-auto md:py-20">
          <div className="flex items-center gap-3">
            <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
            <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
              Support The Campaign
            </p>
          </div>
          <h1
            className="mt-6 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.75rem, 8vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            Upcoming
            <span
              className="block"
              style={{
                color: GOLD_BRIGHT,
                WebkitTextStroke: `1px ${GOLD}`,
              }}
            >
              Events
            </span>
          </h1>
          <p className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
            Parades, fundraisers, and community gatherings across Stark County. Join the team — every appearance moves the campaign forward.
          </p>
        </div>
      </section>

      {/* Active events */}
      <section className="px-5 py-16" style={{ background: BLACK }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
                ★ {currentMonth} {currentYear} ★
              </p>
              <h2
                className="mt-2 font-serif font-black uppercase"
                style={{
                  color: CREAM,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                }}
              >
                On The Calendar
              </h2>
            </div>
          </div>
          <div
            aria-hidden
            className="w-full mb-12"
            style={{
              borderTop: `1px solid ${COAL_LIFT}`,
              boxShadow: `0 1px 0 ${GOLD}`,
            }}
          />
          {activeEvents.length > 0 ? (
            <div className="space-y-12">
              {activeEvents.map((e) => (
                <div
                  key={e.key}
                  className="p-2"
                  style={{
                    background: COAL,
                    border: `1px solid ${COAL_LIFT}`,
                    borderTop: `3px solid ${GOLD}`,
                  }}
                >
                  {e.component}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="px-6 py-16 text-center"
              style={{
                background: COAL,
                border: `1px solid ${COAL_LIFT}`,
                borderTop: `3px solid ${GOLD}`,
              }}
            >
              <p
                className="text-[11px] font-bold tracking-[0.4em] uppercase"
                style={{ color: GOLD_BRIGHT }}
              >
                ★ Stand By ★
              </p>
              <h3
                className="mt-3 font-serif font-black uppercase"
                style={{
                  color: CREAM,
                  fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)',
                  lineHeight: 1.05,
                }}
              >
                More events coming soon
              </h3>
              <p className="max-w-xl mx-auto mt-4 text-base" style={{ color: BODY }}>
                We&rsquo;re scheduling appearances across Stark County. Check
                back soon, or sign up for updates from the campaign trail.
              </p>
              <div className="flex flex-col items-center gap-3 mt-7 sm:flex-row sm:justify-center">
                <Link
                  href="/donate"
                  className="px-7 py-3 text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ background: GOLD, color: BLACK }}
                >
                  Contribute
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3 text-xs font-bold tracking-[0.3em] uppercase border-2"
                  style={{ borderColor: GOLD, color: GOLD_BRIGHT }}
                >
                  Service Record
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
