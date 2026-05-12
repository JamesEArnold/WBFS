import Image from 'next/image';
import Link from 'next/link';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { WeisburnStar } from '@/components/designs/weisburn-star';

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, GOLD_LIGHT, CREAM, BODY } = LAWMAN;

const TimelineEntry = ({
  year,
  children,
}: {
  year: string;
  children: React.ReactNode;
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
      className="w-24 mt-2 mb-4"
      aria-hidden
      style={{ borderTop: `2px solid ${GOLD}` }}
    />
    <div
      className="text-base leading-[1.75] md:text-lg"
      style={{ color: CREAM }}
    >
      {children}
    </div>
  </section>
);

export default function About() {
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
        <div className="relative grid items-center max-w-6xl gap-10 px-5 pt-14 pb-16 mx-auto md:grid-cols-12 md:pt-20 md:pb-20">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
              <p
                className="text-[11px] font-bold tracking-[0.4em] uppercase"
                style={{ color: GOLD_BRIGHT }}
              >
                On Oath · Service Record
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
              Meet Sheriff
              <span
                className="block"
                style={{
                  color: GOLD_BRIGHT,
                  WebkitTextStroke: `1px ${GOLD}`,
                }}
              >
                Eric Weisburn
              </span>
            </h1>
            <p className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
              Thank you for taking the time to learn more about me and my career
              with the Stark County Sheriff&rsquo;s Office. A career built on
              service to my community — from the firehouse, to the patrol car,
              to the badge.
            </p>
          </div>
          <div className="relative md:col-span-5">
            <div className="relative" style={{ border: `4px solid ${GOLD}` }}>
              <Image
                src="/weisburn-family-2-min.jpg"
                width={900}
                height={1100}
                sizes="(max-width: 768px) 100vw, 480px"
                className="w-full h-[24rem] md:h-[28rem] object-cover object-center"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                alt="Sheriff Weisburn and family"
                priority
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-2 text-[11px] font-bold tracking-[0.35em] uppercase"
                style={{ background: 'rgba(10,10,10,0.85)', color: GOLD_BRIGHT, borderTop: `1px solid ${GOLD}` }}
              >
                ★ The Weisburn Family ★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro paragraph */}
      <section className="px-5 py-16" style={{ background: BLACK }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] font-bold tracking-[0.4em] uppercase"
            style={{ color: GOLD_BRIGHT }}
          >
            ★ Origins ★
          </p>
          <p
            className="mt-4 text-base leading-[1.85] md:text-lg"
            style={{ color: CREAM }}
          >
            I am a lifetime resident of Stark County. Growing up in a small
            town, my parents Jack and Maxine instilled upon me at a young age
            the importance of service to our community. At 16 years old, I
            started my career of service as a firefighter for the Waynesburg
            Volunteer Fire Department&hellip;eventually rising to the rank of
            Fire Chief as my father and brother had done before me. I also
            aided my community as an EMT with Quad ambulance.
          </p>
        </div>
      </section>

      {/* Service record timeline */}
      <section className="px-5 py-20" style={{ background: NEAR_BLACK }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              ★ Career In Service ★
            </p>
            <h2
              className="mt-3 font-serif font-black uppercase"
              style={{
                color: CREAM,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1,
              }}
            >
              Service Record.
            </h2>
          </div>
          <div className="relative">
            <TimelineEntry year="1991">
              My career in law enforcement started when I was hired as a
              Corrections Officer for the Stark County Sheriff&rsquo;s Office.
              In that position, I was responsible for the safety and security
              of the inmates held within the jail. I was often assigned to the
              mental health wing of the jail, where I saw first-hand the
              mental health struggles so many inmates deal with and the
              devastating effects it has on them and our community. I strongly
              believe early intervention with mental health services is
              crucial for the betterment of both the inmate and society.
            </TimelineEntry>
            <TimelineEntry year="1998">
              I completed the police officer academy and was assigned to the
              patrol division. While in this division, I traveled throughout
              Stark County responding to every type of call imaginable. I had
              several specialized assignments, including being the first SRO
              (School Resource Officer) for Plain Local School District,
              where I served for three years. I was then selected to be the
              Investigator for child sexual and physical abuse cases, working
              closely with case workers, prosecutors and other police
              agencies to successfully arrest and incarcerate the monsters
              who abuse children. Our mission was to always bring any
              resemblance of justice to the victims and families.
            </TimelineEntry>
            <TimelineEntry year="2005">
              I was promoted to Sergeant where I continued to serve the
              citizens of Stark County as a shift supervisor. I was
              responsible for the safety of not only the citizens of the
              county, but for the deputies who served under my command. It
              was a true honor to supervise professional and dedicated
              deputies, who worked together to protect and serve the citizens
              of Stark County.
            </TimelineEntry>
            <TimelineEntry year="2007">
              I was the lead investigator in the missing person case of
              Jessie Marie Davis, who was in her final month of pregnancy
              when she was murdered. Her body was taken to another location
              and her two-year-old son was left at home alone for two days
              forced to survive on his own. I worked closely with deputies
              and countless other federal, state and local agencies to find
              the suspects responsible for the deaths of Jessie and her
              unborn daughter, Chloe. So many lives were destroyed in this
              incident and the pain will last forever for those affected.
              But someone had to go to prison, I had no problem putting him
              there.
            </TimelineEntry>
            <TimelineEntry year="2016">
              I was promoted to Lieutenant and was transferred to the
              corrections division and served as an Assistant Jail Commander.
              I was involved in all aspects of jail management and the daily
              operations of the correction division. Furthermore, in this
              position I ensured the Sheriff&rsquo;s Office was compliant
              with the minimum jail standards for Ohio set by the Department
              of Rehabilitation and Corrections, along with local fire and
              health codes.
            </TimelineEntry>
            <TimelineEntry year="2022">
              After a rewarding 31 years, I retired from the Stark County
              Sheriff&rsquo;s Office.
            </TimelineEntry>
            <TimelineEntry year="2024">
              Team Weisburn for Sheriff worked tirelessly all summer to share
              Eric Weisburn&rsquo;s vision and why he was the right choice
              for Sheriff. From parades and festivals to community events, we
              connected with voters across Stark County. On November 5th,
              the people spoke — choosing Eric Weisburn to lead the
              Sheriff&rsquo;s Office in a new direction.
            </TimelineEntry>
            <TimelineEntry year="Currently">
              Sheriff Eric Weisburn began his term January 6, 2025. Sheriff
              Weisburn is honored to serve as{' '}
              <span
                className="px-1.5 font-bold"
                style={{ background: GOLD, color: BLACK }}
              >
                YOUR
              </span>{' '}
              Sheriff of Stark County. Thank you for your trust and support.
              We won the election in November 2024, but the fight to keep
              Stark County safe is far from over. Please consider
              contributing today to support Weisburn For Sheriff.
            </TimelineEntry>
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className="px-5 py-20" style={{ background: BLACK }}>
        <div className="grid items-center max-w-5xl gap-12 mx-auto md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              ★ With Respect ★
            </p>
            <p
              className="mt-3 font-serif text-2xl md:text-3xl"
              style={{ color: CREAM, fontWeight: 700 }}
            >
              Respectfully,
            </p>
            <div className="relative w-48 mt-2 overflow-hidden">
              <Image
                src="/signature.png"
                width={300}
                height={120}
                sizes="240px"
                className="w-full h-auto"
                style={{ filter: 'invert(1) brightness(1.4)' }}
                alt="Eric Weisburn signature"
              />
            </div>
            <p
              className="mt-4 font-serif text-2xl font-bold"
              style={{ color: GOLD_BRIGHT }}
            >
              Sheriff Eric Weisburn
            </p>
            <div className="flex flex-col gap-3 mt-8 sm:flex-row">
              <Link
                href="/donate"
                className="px-7 py-4 text-xs font-bold tracking-[0.3em] text-center uppercase"
                style={{
                  background: GOLD,
                  color: BLACK,
                  boxShadow: `0 4px 0 ${COAL_LIFT}`,
                }}
              >
                Contribute
              </Link>
              <Link
                href="/events"
                className="px-7 py-4 text-xs font-bold tracking-[0.3em] text-center uppercase border-2"
                style={{ borderColor: GOLD, color: GOLD_BRIGHT }}
              >
                Upcoming Events
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div
              className="relative p-2"
              style={{ background: COAL, border: `1px solid ${GOLD}` }}
            >
              <Image
                src="/weisburn-grandkids-min.jpg"
                width={800}
                height={1000}
                sizes="(max-width: 768px) 100vw, 420px"
                className="w-full h-auto object-cover"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                alt="Sheriff Weisburn with grandkids"
              />
            </div>
            <p
              className="mt-3 text-[10px] tracking-[0.3em] text-center uppercase"
              style={{ color: BODY }}
            >
              ★ Family — Stark County ★
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
