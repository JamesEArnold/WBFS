import { notFound } from 'next/navigation';
import { RenderBlocks } from '@/components/blocks/render-blocks';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { CmsButton } from '@/components/ui/cms-button';
import { TAB } from '@/cms/tabs';
import { loadPageGlobal } from '@/lib/cms/content';
import { editable } from '@/lib/cms/editable';

const { BLACK, NEAR_BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

type Line = { id?: string | null; text: string };

const YearEntry = ({
  year,
  events,
  outreach,
  outreachHeading,
  index,
}: {
  year: string;
  events: Line[];
  outreach: Line[];
  outreachHeading: string;
  index: number;
}) => (
  <section
    {...editable(`years.${index}`, TAB.yearByYear)}
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
      {events.map((item, i) => (
        <li key={item.id ?? i} className="flex items-start gap-3" {...editable(`years.${index}.events.${i}`, TAB.yearByYear)}>
          <span className="mt-2 inline-block w-1.5 h-1.5 flex-shrink-0" style={{ background: GOLD_BRIGHT }} aria-hidden />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
    <h4
      className="mt-8 text-[11px] font-bold tracking-[0.35em] uppercase"
      style={{ color: GOLD_BRIGHT }}
    >
      <span {...editable('outreachHeading', TAB.yearByYear)}>{outreachHeading}</span>
    </h4>
    <ul className="mt-4 space-y-2 text-base leading-[1.65] md:text-lg" style={{ color: CREAM }}>
      {outreach.map((item, i) => (
        <li key={item.id ?? i} className="flex items-start gap-3" {...editable(`years.${index}.outreach.${i}`, TAB.yearByYear)}>
          <span className="mt-2 inline-block w-1.5 h-1.5 flex-shrink-0" style={{ background: GOLD }} aria-hidden />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default async function TimeInOffice() {
  const page = await loadPageGlobal('inOffice');
  if (!page) notFound();

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
            <p {...editable('overline', TAB.top)}
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              {page.overline}
            </p>
          </div>
          <h1 {...editable('heading', TAB.top)}
            className="mt-6 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            {page.heading}
            {page.headingAccent && (
              <span {...editable('headingAccent', TAB.top)}
                className="block"
                style={{
                  color: GOLD_BRIGHT,
                  WebkitTextStroke: `1px ${GOLD}`,
                }}
              >
                {page.headingAccent}
              </span>
            )}
          </h1>
          {page.intro && (
            <p {...editable('intro', TAB.top)} className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
              {page.intro}
            </p>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 py-20" style={{ background: NEAR_BLACK }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p {...editable('timelineOverline', TAB.yearByYear)}
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              &#9733; {page.timelineOverline} &#9733;
            </p>
            <h2 {...editable('timelineHeading', TAB.yearByYear)}
              className="mt-3 font-serif font-black uppercase"
              style={{
                color: CREAM,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1,
              }}
            >
              {page.timelineHeading}
            </h2>
          </div>
          <div className="relative">
            {(page.years ?? []).map((entry, i) => (
              <YearEntry
                key={entry.id ?? i}
                year={entry.year}
                events={entry.events ?? []}
                outreach={entry.outreach ?? []}
                outreachHeading={page.outreachHeading}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off CTA */}
      <section className="px-5 py-20" style={{ background: BLACK }}>
        <div className="max-w-3xl mx-auto text-center">
          <p {...editable('ctaOverline', TAB.closing)}
            className="text-[11px] font-bold tracking-[0.4em] uppercase"
            style={{ color: GOLD_BRIGHT }}
          >
            &#9733; {page.ctaOverline} &#9733;
          </p>
          <h2 {...editable('ctaHeading', TAB.closing)}
            className="mt-3 font-serif font-black"
            style={{
              color: CREAM,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1,
            }}
          >
            {page.ctaHeading}
          </h2>
          {page.ctaBody && (
            <p {...editable('ctaBody', TAB.closing)} className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
              {page.ctaBody}
            </p>
          )}
          <div {...editable('ctaButtons', TAB.closing)} className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
            {(page.ctaButtons ?? []).map((button, i) => (
              <CmsButton key={button.id ?? i} button={button} size="cta" />
            ))}
          </div>
        </div>
      </section>
      <RenderBlocks blocks={page.extraSections} />
    </main>
  );
}
