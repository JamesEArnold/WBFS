import Image from "next/image";
import Link from "next/link";
import { LAWMAN } from "@/components/designs/lawman/theme";

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type UpcomingEvent = {
  key: string;
  overline: string;
  title: string;
  subtitle: string;
  facts: string[];
  href: string;
  cta: string;
};

const upcomingEvents: UpcomingEvent[] = [
  {
    key: "golf-2026",
    overline: "Save The Date",
    title: "Annual Golf Fundraiser",
    subtitle: "Friday, September 18, 2026 · Sable Creek Golf Course",
    facts: [
      "9:00 a.m. shotgun start · $500 per team",
      "Donuts, lunch & dinner provided",
      "$10,000 hole-in-one · sponsorships available",
    ],
    href: "/events/golf-fundraiser-3",
    cta: "View The Flyer",
  },
];

export default function EventsPage() {
  const now = new Date();
  const currentMonth = month[now.getMonth()];
  const currentYear = now.getFullYear();

  const activeEvents = upcomingEvents;

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
            <div className="space-y-10">
              {activeEvents.map((e) => (
                <Link
                  key={e.key}
                  href={e.href}
                  className="block transition-transform group hover:-translate-y-0.5"
                  aria-label={`${e.title} — ${e.subtitle}`}
                >
                  <article
                    className="grid items-stretch grid-cols-1 md:grid-cols-12"
                    style={{
                      background: COAL,
                      border: `1px solid ${COAL_LIFT}`,
                      borderTop: `3px solid ${GOLD}`,
                    }}
                  >
                    <div className="flex items-center justify-center px-6 py-8 md:col-span-3 md:py-10" style={{ background: NEAR_BLACK }}>
                      <Image
                        src="/SheriffStar.PNG"
                        alt=""
                        width={120}
                        height={120}
                        className="block w-24 h-auto md:w-32"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-6 py-8 md:col-span-9 md:px-10 md:py-10">
                      <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
                        {e.overline}
                      </p>
                      <h3
                        className="mt-2 font-serif font-bold"
                        style={{
                          color: CREAM,
                          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                          lineHeight: 1.05,
                        }}
                      >
                        {e.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base" style={{ color: BODY }}>
                        {e.subtitle}
                      </p>
                      <ul className="mt-5 space-y-1.5 text-sm md:text-base" style={{ color: CREAM }}>
                        {e.facts.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span style={{ color: GOLD_BRIGHT }}>★</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <span
                        className="inline-flex items-center self-start gap-3 mt-7 text-xs font-bold tracking-[0.3em] uppercase group-hover:gap-4 transition-all"
                        style={{ color: GOLD_BRIGHT, borderBottom: `2px solid ${GOLD}`, paddingBottom: 4 }}
                      >
                        {e.cta} &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
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
