import Image from "next/image";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { notFound } from "next/navigation";
import { LAWMAN } from "@/components/designs/lawman/theme";
import { CmsButton } from "@/components/ui/cms-button";
import { TAB } from "@/cms/tabs";
import { eventFlyer, loadEvent } from "@/lib/cms/content";
import { editable } from "@/lib/cms/editable";
import { EventHero } from "@/components/designs/lawman/event-hero";
import { listEventSlugs } from "@/lib/cms/public";

const { BLACK, COAL_LIFT, GOLD_BRIGHT, CREAM } = LAWMAN;

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listEventSlugs()).map(({ slug }) => ({ slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  const { pdf: flyerPdf, pictures: flyerImages } = eventFlyer(event);
  return (
    <main style={{ background: BLACK, color: CREAM }}>
      <EventHero
        event={event}
        buttons={
          (event.buttons ?? []).length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-6" {...editable("buttons")}>
              {(event.buttons ?? []).map((button) => (
                <CmsButton key={button.id ?? button.label} button={button} />
              ))}
            </div>
          )
        }
      />

      {flyerImages.length === 0 && flyerPdf && (
        // A PDF with no pictures of it: a button to open the printable flyer.
        <section className="px-5 py-12 md:py-16" style={{ background: BLACK }} {...editable("flyerPdf", TAB.flyer)}>
          <div className="flex flex-col items-center max-w-5xl gap-5 mx-auto text-center">
            <CmsButton
              button={{ label: "View the printable flyer", linkType: "file", file: flyerPdf, style: "primary", newTab: true }}
            />
            {event.flyerCaption && (
              <p className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
                {event.flyerCaption}
              </p>
            )}
          </div>
        </section>
      )}

      {flyerImages.length > 0 && (
        <section className="px-5 py-12 md:py-16" style={{ background: BLACK }} {...editable("flyerImages", TAB.flyer)}>
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
            {event.flyerCaption && (
              <p
                className="text-center text-[11px] font-bold tracking-[0.35em] uppercase"
                style={{ color: GOLD_BRIGHT }}
              >
                {event.flyerCaption}
              </p>
            )}
          </div>
        </section>
      )}
      <RenderBlocks blocks={event.extraSections} />
    </main>
  );
}
