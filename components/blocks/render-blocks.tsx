import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { CmsButton } from '@/components/ui/cms-button';
import { Highlighted } from '@/components/ui/highlighted';
import { TAB } from '@/cms/tabs';
import { asMedia, type Button } from '@/lib/cms/content';
import { editable } from '@/lib/cms/editable';
import type { Page } from '@/payload-types';

/**
 * Renders design-locked section blocks (cms/blocks) with the site's Lawman
 * markup. Each block maps to a pattern already used on the original pages.
 */

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export type SectionBlock = NonNullable<Page['sections']>[number];
type BlockOf<T extends SectionBlock['blockType']> = Extract<SectionBlock, { blockType: T }>;

const BACKGROUNDS = { black: BLACK, nearBlack: NEAR_BLACK } as const;
const bg = (value?: string | null) => BACKGROUNDS[(value ?? 'black') as keyof typeof BACKGROUNDS] ?? BLACK;

const Overline = ({ text, className = '' }: { text?: string | null; className?: string }) =>
  text ? (
    <p className={`text-[11px] font-bold tracking-[0.4em] uppercase ${className}`} style={{ color: GOLD_BRIGHT }}>
      &#9733; {text} &#9733;
    </p>
  ) : null;

const SectionHeading = ({ text }: { text?: string | null }) =>
  text ? (
    <h2
      className="mt-3 font-serif font-black uppercase"
      style={{ color: CREAM, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}
    >
      {text}
    </h2>
  ) : null;

const Section = ({ background, children, narrow = false }: { background?: string | null; children: ReactNode; narrow?: boolean }) => (
  <section className="px-5 py-20" style={{ background: bg(background) }}>
    <div className={`${narrow ? 'max-w-3xl' : 'max-w-6xl'} mx-auto`}>{children}</div>
  </section>
);

const Buttons = ({ buttons, center = false }: { buttons?: Button[] | null; center?: boolean }) =>
  (buttons ?? []).length > 0 ? (
    <div className={`flex flex-col items-center gap-3 mt-8 sm:flex-row ${center ? 'justify-center' : ''}`}>
      {(buttons ?? []).map((button, i) => (
        <CmsButton key={button.id ?? i} button={button} size="raised" />
      ))}
    </div>
  ) : null;

function HeroBanner({ block, first }: { block: BlockOf<'heroBanner'>; first: boolean }) {
  const photo = asMedia(block.image);
  const Heading = first ? 'h1' : 'h2';
  return (
    <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: `radial-gradient(circle at 80% 20%, rgba(200,155,60,0.15) 0%, transparent 55%)` }}
      />
      <div
        className={`relative grid items-center gap-10 px-5 pt-14 pb-16 mx-auto md:pt-20 md:pb-20 ${photo?.url ? 'max-w-6xl md:grid-cols-12' : 'max-w-3xl'}`}
      >
        <div className={photo?.url ? 'md:col-span-7' : ''}>
          {block.overline && (
            <div className="flex items-center gap-3">
              <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
              <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
                {block.overline}
              </p>
            </div>
          )}
          <Heading
            className="mt-6 font-serif font-black uppercase"
            style={{ color: CREAM, fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.95, letterSpacing: '0.01em' }}
          >
            {block.heading}
            {block.headingAccent && (
              <span className="block" style={{ color: GOLD_BRIGHT, WebkitTextStroke: `1px ${GOLD}` }}>
                {block.headingAccent}
              </span>
            )}
          </Heading>
          {block.intro && (
            <p className="max-w-xl mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
              {block.intro}
            </p>
          )}
          <Buttons buttons={block.buttons} />
        </div>
        {photo?.url && (
          <div className="relative md:col-span-5">
            <div className="relative" style={{ border: `4px solid ${GOLD}` }}>
              <Image
                src={photo.url}
                alt={photo.alt}
                width={photo.width ?? 900}
                height={photo.height ?? 1100}
                sizes="(max-width: 768px) 100vw, 480px"
                className="w-full h-[24rem] md:h-[28rem] object-cover object-center"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                priority={first}
              />
              {block.imageCaption && <PhotoCaption text={block.imageCaption} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const PhotoCaption = ({ text }: { text: string }) => (
  <div
    className="absolute bottom-0 left-0 right-0 px-4 py-2 text-[11px] font-bold tracking-[0.35em] uppercase"
    style={{ background: 'rgba(10,10,10,0.85)', color: GOLD_BRIGHT, borderTop: `1px solid ${GOLD}` }}
  >
    &#9733; {text} &#9733;
  </div>
);

function RichTextSection({ block }: { block: BlockOf<'richText'> }) {
  return (
    <Section background={block.background} narrow>
      <Overline text={block.overline} />
      <SectionHeading text={block.heading} />
      <div className="cms-prose mt-6 text-base leading-[1.85] md:text-lg" style={{ color: CREAM }}>
        <RichText data={block.body} />
      </div>
    </Section>
  );
}

function ImageWithText({ block }: { block: BlockOf<'imageWithText'> }) {
  const photo = asMedia(block.image);
  const right = block.imagePosition === 'right';
  return (
    <Section background={block.background}>
      <div className="grid items-center gap-10 md:grid-cols-12">
        {photo?.url && (
          <div className={`relative md:col-span-6 ${right ? 'md:order-2' : ''}`}>
            <div className="relative" style={{ border: `4px solid ${GOLD}` }}>
              <Image
                src={photo.url}
                alt={photo.alt}
                width={photo.width ?? 1200}
                height={photo.height ?? 1500}
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-[24rem] md:h-[28rem] object-cover object-center"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
              />
              {block.imageCaption && <PhotoCaption text={block.imageCaption} />}
            </div>
          </div>
        )}
        <div className={photo?.url ? 'md:col-span-6' : 'md:col-span-12'}>
          <Overline text={block.overline} />
          <h2
            className="mt-3 font-serif font-black"
            style={{ color: CREAM, fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1 }}
          >
            {block.heading}
          </h2>
          {block.body && (
            <p className="mt-5 text-base leading-relaxed whitespace-pre-line" style={{ color: BODY }}>
              <Highlighted text={block.body} className="font-semibold" style={{ color: CREAM }} />
            </p>
          )}
          <Buttons buttons={block.buttons} />
        </div>
      </div>
    </Section>
  );
}

function PhotoGallery({ block }: { block: BlockOf<'photoGallery'> }) {
  return (
    <Section background={block.background}>
      {(block.overline || block.heading) && (
        <div className="text-center mb-12">
          <Overline text={block.overline} />
          <SectionHeading text={block.heading} />
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {(block.photos ?? []).map((item, i) => {
          const photo = asMedia(item.image);
          if (!photo?.url) return null;
          return (
            <figure key={item.id ?? i} className="relative" style={{ border: `1px solid ${GOLD}` }}>
              <div className="relative h-[22rem] overflow-hidden" style={{ filter: 'contrast(1.08) brightness(0.95)' }}>
                <Image src={photo.url} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover object-center" />
              </div>
              {item.caption && (
                <figcaption
                  className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-bold tracking-[0.35em] uppercase"
                  style={{ background: 'rgba(10,10,10,0.9)', color: GOLD_BRIGHT, borderLeft: `2px solid ${GOLD}` }}
                >
                  {item.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </Section>
  );
}

function FactsList({ block }: { block: BlockOf<'factsList'> }) {
  return (
    <Section background={block.background} narrow>
      <Overline text={block.overline} />
      <SectionHeading text={block.heading} />
      <ul className="mt-6 space-y-2 text-base md:text-lg" style={{ color: CREAM }}>
        {(block.items ?? []).map((item, i) => (
          <li key={item.id ?? i} className="flex items-start gap-3">
            <span style={{ color: GOLD_BRIGHT }}>★</span> {item.text}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CtaButtons({ block }: { block: BlockOf<'ctaButtons'> }) {
  return (
    <Section background={block.background} narrow>
      <div className="text-center">
        <Overline text={block.overline} />
        <h2 className="mt-3 font-serif font-black" style={{ color: CREAM, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
          {block.heading}
        </h2>
        {block.body && (
          <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
            {block.body}
          </p>
        )}
        <Buttons buttons={block.buttons} center />
      </div>
    </Section>
  );
}

function Timeline({ block }: { block: BlockOf<'timeline'> }) {
  return (
    <Section background={block.background} narrow>
      {(block.overline || block.heading) && (
        <div className="text-center mb-14">
          <Overline text={block.overline} />
          <SectionHeading text={block.heading} />
        </div>
      )}
      <div className="relative">
        {(block.entries ?? []).map((entry, i) => (
          <div key={entry.id ?? i} className="relative pl-6 pt-10 md:pl-10" style={{ borderLeft: `1px solid ${COAL_LIFT}` }}>
            <div
              className="absolute -left-[7px] top-12 w-3.5 h-3.5 rotate-45"
              aria-hidden
              style={{ background: GOLD_BRIGHT, border: `2px solid ${BLACK}` }}
            />
            <h3 className="font-serif text-3xl font-black md:text-4xl" style={{ color: GOLD_BRIGHT }}>
              {entry.label}
            </h3>
            <div className="w-24 mt-2 mb-4" aria-hidden style={{ borderTop: `2px solid ${GOLD}` }} />
            <div className="text-base leading-[1.75] md:text-lg" style={{ color: CREAM }}>
              <Highlighted text={entry.text} className="px-1.5 font-bold" style={{ background: GOLD, color: BLACK }} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function QuoteBand({ block }: { block: BlockOf<'quoteBand'> }) {
  return (
    <section className="px-5 py-20" style={{ background: CREAM }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-serif font-bold italic" style={{ color: BLACK, fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.15 }}>
          <Highlighted text={block.quote} className="not-italic" />
        </p>
        {block.attribution && (
          <div className="flex items-center justify-center gap-4 mt-7">
            <span className="block w-12 h-px" style={{ background: BLACK }} />
            <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: BLACK }}>
              {block.attribution}
            </p>
            <span className="block w-12 h-px" style={{ background: BLACK }} />
          </div>
        )}
      </div>
    </section>
  );
}

function Embed({ block }: { block: BlockOf<'embed'> }) {
  return (
    <Section background={block.background} narrow>
      {(block.overline || block.heading) && (
        <div className="text-center mb-10">
          <Overline text={block.overline} />
          <SectionHeading text={block.heading} />
        </div>
      )}
      <div className="relative p-3" style={{ background: COAL, border: `1px solid ${GOLD}` }}>
        <iframe
          src={block.url}
          title={block.title}
          height={block.height ?? 600}
          width="100%"
          className="block w-full"
          loading="lazy"
          allow="payment; fullscreen; encrypted-media; picture-in-picture"
        />
      </div>
    </Section>
  );
}

function NoticeBanner({ block }: { block: BlockOf<'soldOutBanner'> }) {
  return (
    <div className="w-full py-5 text-center" style={{ background: GOLD }}>
      <p className="font-black uppercase tracking-[0.25em]" style={{ color: BLACK, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
        {block.heading}
      </p>
      {block.body && (
        <p className="max-w-2xl mx-auto mt-2 text-sm font-medium leading-relaxed px-5" style={{ color: BLACK, opacity: 0.8 }}>
          {block.body}
        </p>
      )}
    </div>
  );
}

function renderBlock(block: SectionBlock, index: number, firstIsPageHeading: boolean): ReactNode {
  switch (block.blockType) {
    case 'heroBanner':
      return <HeroBanner block={block} first={firstIsPageHeading && index === 0} />;
    case 'richText':
      return <RichTextSection block={block} />;
    case 'imageWithText':
      return <ImageWithText block={block} />;
    case 'photoGallery':
      return <PhotoGallery block={block} />;
    case 'factsList':
      return <FactsList block={block} />;
    case 'ctaButtons':
      return <CtaButtons block={block} />;
    case 'timeline':
      return <Timeline block={block} />;
    case 'quoteBand':
      return <QuoteBand block={block} />;
    case 'embed':
      return <Embed block={block} />;
    case 'soldOutBanner':
      return <NoticeBanner block={block} />;
    default:
      return null;
  }
}

/**
 * Renders a list of section blocks. On a CMS page (`asPage`), a leading
 * "Page heading" block becomes the page's <h1>; in extra sections it stays an <h2>.
 */
export function RenderBlocks({ blocks, asPage = false }: { blocks?: SectionBlock[] | null; asPage?: boolean }) {
  if (!blocks?.length) return null;
  // Custom pages keep their sections in `sections`; other pages in the "Add more sections" tab.
  const field = asPage ? 'sections' : 'extraSections';
  const tab = asPage ? undefined : TAB.extraSections;
  return (
    <>
      {blocks.map((block, i) => (
        <div key={block.id ?? i} data-block={block.blockType} {...editable(`${field}.${i}`, tab)}>
          {renderBlock(block, i, asPage)}
        </div>
      ))}
    </>
  );
}
