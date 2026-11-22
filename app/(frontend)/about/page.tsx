import Image from 'next/image';
import { RenderBlocks } from '@/components/blocks/render-blocks';
import { notFound } from 'next/navigation';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { CmsButton } from '@/components/ui/cms-button';
import { Highlighted } from '@/components/ui/highlighted';
import { asMedia, loadPageGlobal } from '@/lib/cms/content';

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

export default async function About() {
  const page = await loadPageGlobal('about');
  if (!page) notFound();
  const heroImage = asMedia(page.heroImage);
  const signature = asMedia(page.signature);
  const signOffImage = asMedia(page.signOffImage);

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
                {page.overline}
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
              {page.heading}
              {page.headingAccent && (
                <span
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
              <p className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
                {page.intro}
              </p>
            )}
          </div>
          <div className="relative md:col-span-5">
            <div className="relative" style={{ border: `4px solid ${GOLD}` }}>
              {heroImage?.url && (
              <Image
                src={heroImage.url}
                width={900}
                height={1100}
                sizes="(max-width: 768px) 100vw, 480px"
                className="w-full h-[24rem] md:h-[28rem] object-cover object-center"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                alt={heroImage.alt}
                priority
              />
              )}
              {page.heroImageCaption && (
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-2 text-[11px] font-bold tracking-[0.35em] uppercase"
                style={{ background: 'rgba(10,10,10,0.85)', color: GOLD_BRIGHT, borderTop: `1px solid ${GOLD}` }}
              >
                ★ {page.heroImageCaption} ★
              </div>
              )}
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
            ★ {page.originsOverline} ★
          </p>
          {page.originsBody && (
            <p
              className="mt-4 text-base leading-[1.85] md:text-lg"
              style={{ color: CREAM }}
            >
              {page.originsBody}
            </p>
          )}
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
              ★ {page.timelineOverline} ★
            </p>
            <h2
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
            {(page.timeline ?? []).map((entry, i) => (
              <TimelineEntry key={entry.id ?? i} year={entry.year}>
                <Highlighted
                  text={entry.text}
                  className="px-1.5 font-bold"
                  style={{ background: GOLD, color: BLACK }}
                />
              </TimelineEntry>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className="px-5 py-20" style={{ background: BLACK }}>
        <div className="grid items-center max-w-5xl gap-12 mx-auto md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              className="font-serif text-2xl md:text-3xl"
              style={{ color: CREAM, fontWeight: 700 }}
            >
              {page.signOffGreeting}
            </p>
            {signature?.url && (
            <div className="relative w-48 mt-2 overflow-hidden">
              <Image
                src={signature.url}
                width={300}
                height={120}
                sizes="240px"
                className="w-full h-auto"
                style={{ filter: 'invert(1) brightness(1.4)' }}
                alt={signature.alt}
              />
            </div>
            )}
            <p
              className="mt-4 font-serif text-2xl font-bold"
              style={{ color: GOLD_BRIGHT }}
            >
              {page.signOffName}
            </p>
            <div className="flex flex-col gap-3 mt-8 sm:flex-row">
              {(page.signOffButtons ?? []).map((button, i) => (
                <CmsButton key={button.id ?? i} button={button} size="signoff" />
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            {signOffImage?.url && (
            <div
              className="relative p-2"
              style={{ background: COAL, border: `1px solid ${GOLD}` }}
            >
              <Image
                src={signOffImage.url}
                width={800}
                height={1000}
                sizes="(max-width: 768px) 100vw, 420px"
                className="w-full h-auto object-cover"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                alt={signOffImage.alt}
              />
            </div>
            )}
            {page.signOffImageCaption && (
            <p
              className="mt-3 text-[10px] tracking-[0.3em] text-center uppercase"
              style={{ color: BODY }}
            >
              ★ {page.signOffImageCaption} ★
            </p>
            )}
          </div>
        </div>
      </section>
      <RenderBlocks blocks={page.extraSections} />
    </main>
  );
}
