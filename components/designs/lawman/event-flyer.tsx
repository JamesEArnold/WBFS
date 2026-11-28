import Image from 'next/image';
import { TAB } from '@/cms/tabs';
import { CmsButton } from '@/components/ui/cms-button';
import { editable } from '@/lib/cms/editable';
import type { EventFlyer } from '@/lib/cms/media';
import { LAWMAN } from './theme';

const { BLACK, COAL_LIFT, GOLD_BRIGHT } = LAWMAN;

/**
 * An event's flyer (see eventFlyer in lib/cms/media.ts): pictures of its pages
 * linking to the PDF, or a button to open a PDF that has no pictures. Plain
 * markup, shared by the event page and the "Post a new event" preview.
 */
export function EventFlyerSection({ flyer, caption }: { flyer: EventFlyer; caption?: string | null }) {
  const { pdf: flyerPdf, pictures: flyerImages } = flyer;
  return (
    <>
      {flyerImages.length === 0 && flyerPdf && (
        // A PDF with no pictures of it: a button to open the printable flyer.
        <section className="px-5 py-12 md:py-16" style={{ background: BLACK }} {...editable('flyerPdf', TAB.flyer)}>
          <div className="flex flex-col items-center max-w-5xl gap-5 mx-auto text-center">
            <CmsButton button={{ label: 'View the printable flyer', linkType: 'file', file: flyerPdf, style: 'primary', newTab: true }} />
            {caption && (
              <p className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
                {caption}
              </p>
            )}
          </div>
        </section>
      )}

      {flyerImages.length > 0 && (
        <section className="px-5 py-12 md:py-16" style={{ background: BLACK }} {...editable('flyerImages', TAB.flyer)}>
          <div className="max-w-5xl mx-auto space-y-8">
            {flyerImages.map(({ media, linkLabel, id }, index) => {
              const image = (
                <Image
                  src={media.url!}
                  alt={media.alt}
                  width={media.width ?? 2250}
                  height={media.height ?? 1750}
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className="w-full h-auto"
                  priority={index === 0}
                />
              );
              return flyerPdf?.url ? (
                <a
                  key={id ?? index}
                  href={flyerPdf.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={linkLabel ?? undefined}
                  className="block transition-opacity hover:opacity-95"
                  style={{ border: `1px solid ${COAL_LIFT}` }}
                >
                  {image}
                </a>
              ) : (
                <div key={id ?? index} style={{ border: `1px solid ${COAL_LIFT}` }}>
                  {image}
                </div>
              );
            })}
            {caption && (
              <p className="text-center text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
                {caption}
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
