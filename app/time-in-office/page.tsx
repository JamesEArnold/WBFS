import Link from 'next/link';
import { LAWMAN } from '@/components/designs/lawman/theme';

const { BLACK, NEAR_BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

const YearEntry = ({
  year,
  events,
  outreach,
}: {
  year: string;
  events: string[];
  outreach: string[];
}) => (
  <section
    className="relative pl-6 pt-10 md:pl-10"
    style={{ borderLeft: `1px solid ${COAL_LIFT}` }}
  >
    <div
      className="absolute -left-[7px] top-12 w-3.5 h-3.5 rotate-45"
      aria-hidden
      style={{ background: GOLD_BRIGHT, border: `2px solid ${BLACK}` }}
    />
    <h3
      className="font-serif text-3xl font-black md:text-4xl"
      style={{ color: GOLD_BRIGHT }}
    >
      {year}
    </h3>
    <div
      className="w-24 mt-2 mb-5"
      aria-hidden
      style={{ borderTop: `2px solid ${GOLD}` }}
    />
    <ul className="space-y-2 text-base leading-[1.65] md:text-lg" style={{ color: CREAM }}>
      {events.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 inline-block w-1.5 h-1.5 flex-shrink-0" style={{ background: GOLD_BRIGHT }} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <h4
      className="mt-8 text-[11px] font-bold tracking-[0.35em] uppercase"
      style={{ color: GOLD_BRIGHT }}
    >
      Supporting Non-Profit Organizations and Community Outreach
    </h4>
    <ul className="mt-4 space-y-2 text-base leading-[1.65] md:text-lg" style={{ color: CREAM }}>
      {outreach.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 inline-block w-1.5 h-1.5 flex-shrink-0" style={{ background: GOLD }} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

const ENTRIES = [
  {
    year: '2026',
    events: [
      'Presenter at Ohio Traffic Safety Summit',
      'Hosted Annual Peace Officers Memorial Day Ceremony',
      'Citizens Academy – class graduation',
      'Stark County Motorcycle Ohio Training Site – Collaborative Endeavor with KSU Stark and Motorcycle Ohio',
      'OOCIC Human Trafficking Task Force',
      'Leadership Training at National Sheriffs’ Institute in Quantico, Virginia',
      'Stark County Citizen’s Connect App',
      'National Sheriffs’ Association – Washington, D.C.',
      'Ohio Counterterrorism & Homeland Security Conference',
    ],
    outreach: [
      '“Recovery & Resilience” – Annual Symposium',
      'Red Cross Blood Drive',
      'Eyes Forward Distracted Driving',
      '“Wear Blue” National Child Abuse Prevention Month',
      'Student Sobriety',
      'COMPASS Sexual Assault and Prevention',
      'Seatbelt Safety Awareness',
    ],
  },
  {
    year: '2025',
    events: [
      'Rededication McDonald Garden at Stark County Sheriff’s Office',
      'Buckeye State Sheriffs’ Association – Annual Meeting',
      'Honor Court Graduation',
      'U.S. Marshal Awards – Cleveland',
      'Tour of State House',
      'Stark County Fair',
      'New Jail Groundbreaking Ceremony',
      'Crypto Task Force established',
      'Dog Warden No Kill Award',
      'FBI National Conference',
      'Attorney General Press Conference – Cold Case Solved – Anthony Gulley',
      'Sheriff’s Mounted Division',
      'National Child Safety Campaign',
      'Ohio Attorney General’s Office',
    ],
    outreach: [
      'Hannah House',
      'Greek Hellenic Organization',
      'Patriot Project',
      'Sheriff’s Truck or Treat',
      'Heartland Behavioral Health',
      '48th Annual Victim/Witness Dinner',
      'Keep Seniors Driving',
      'Habitat for Humanity – Sheriff’s Office House Build',
      'Ohio Heros',
      'Legacy of Honor Gala',
      'Greater Stark County Urban League',
      'National Night Out',
      'HOF Events',
      'Italian American Festival Breakfast',
      'Honor Home Food Drive',
      'St. Haralabos Greek Festival',
      'Domestic Violence Project',
      'Veterans Service Commission',
      'Crime Prevention Breakfast',
    ],
  },
];

export default function TimeInOffice() {
  return (
    <main style={{ background: BLACK, color: CREAM }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: NEAR_BLACK }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, rgba(200,155,60,0.15) 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-3xl px-5 pt-14 pb-16 mx-auto md:pt-20 md:pb-20">
          <div className="flex items-center gap-3">
            <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
            <p
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              On Duty &middot; In The Community
            </p>
          </div>
          <h1
            className="mt-6 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            My Time
            <span
              className="block"
              style={{
                color: GOLD_BRIGHT,
                WebkitTextStroke: `1px ${GOLD}`,
              }}
            >
              In Office
            </span>
          </h1>
          <p className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
            A record of events, training, and community engagement since Sheriff
            Weisburn was sworn in on January 6, 2025.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 py-20" style={{ background: NEAR_BLACK }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              &#9733; By The Year &#9733;
            </p>
            <h2
              className="mt-3 font-serif font-black uppercase"
              style={{
                color: CREAM,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1,
              }}
            >
              In Office.
            </h2>
          </div>
          <div className="relative">
            {ENTRIES.map((entry) => (
              <YearEntry
                key={entry.year}
                year={entry.year}
                events={entry.events}
                outreach={entry.outreach}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off CTA */}
      <section className="px-5 py-20" style={{ background: BLACK }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[11px] font-bold tracking-[0.4em] uppercase"
            style={{ color: GOLD_BRIGHT }}
          >
            &#9733; The Fight Continues &#9733;
          </p>
          <h2
            className="mt-3 font-serif font-black"
            style={{
              color: CREAM,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1,
            }}
          >
            Stand with the Sheriff.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
            The fight to keep Stark County safe is far from over. Your support
            keeps this work moving forward.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
            <Link
              href="/donate"
              className="px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase"
              style={{ background: GOLD, color: BLACK }}
            >
              Contribute
            </Link>
            <Link
              href="/about"
              className="px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase border-2"
              style={{ borderColor: GOLD, color: GOLD_BRIGHT }}
            >
              Service Record
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
