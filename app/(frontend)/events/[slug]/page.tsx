import Image from "next/image";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { notFound } from "next/navigation";
import { LAWMAN } from "@/components/designs/lawman/theme";
import { CmsButton } from "@/components/ui/cms-button";
import { TAB } from "@/cms/tabs";
import { asMedia, loadEvent } from "@/lib/cms/content";
import { editable, editableTab } from "@/lib/cms/editable";
import { eventDateLabel, eventHeading } from "@/lib/cms/eventText";
import { listEventSlugs } from "@/lib/cms/public";

const { BLACK, NEAR_BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listEventSlugs()).map(({ slug }) => ({ slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  const flyerPdf = asMedia(event.flyerPdf);
  const flyerImages = (event.flyerImages ?? [])
    .map((item) => ({ ...item, media: asMedia(item.image) }))
    .filter((item) => item.media?.url);
  const showSoldOut = event.status === "soldOut" && Boolean(event.soldOutBanner?.heading);
  const dateLabel = eventDateLabel(event);

  return (
    <main style={{ background: BLACK, color: CREAM }}>
      {showSoldOut && (
        <div className="w-full py-5 text-center sticky top-0 z-50" style={{ background: GOLD }} {...editable("soldOutBanner.heading", TAB.soldOut)}>
          <p
            className="font-black uppercase tracking-[0.25em]"
            style={{ color: BLACK, fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
          >
            {event.soldOutBanner?.heading}
          </p>
          {event.soldOutBanner?.body && (
            <p className="max-w-2xl mx-auto mt-2 text-sm font-medium leading-relaxed px-5" style={{ color: BLACK, opacity: 0.8 }}>
              {event.soldOutBanner.body}
            </p>
          )}
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }} {...editableTab(TAB.basics)}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(200,155,60,0.15) 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-5xl px-5 pt-16 pb-10 mx-auto md:pt-20">
          {dateLabel && (
            <div className="flex items-center gap-3" {...editable("dateLabel")}>
              <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
              <p
                className="text-[11px] font-bold tracking-[0.4em] uppercase"
                style={{ color: GOLD_BRIGHT }}
              >
                {dateLabel}
              </p>
            </div>
          )}
          <h1
            {...editable(event.heading ? "heading" : "title")}
            className="mt-6 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: "clamp(2.5rem, 7.5vw, 4.75rem)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
            }}
          >
            {eventHeading(event)}
            {event.headingAccent && (
              <span
                className="block"
                style={{
                  color: GOLD_BRIGHT,
                  WebkitTextStroke: `1px ${GOLD}`,
                }}
              >
                {event.headingAccent}
              </span>
            )}
          </h1>
          {event.heroBlurb && (
            <p
              {...editable("heroBlurb")}
              className="max-w-xl mt-6 text-base leading-relaxed md:text-lg"
              style={{ color: BODY }}
            >
              {event.heroBlurb}
            </p>
          )}

          {(event.buttons ?? []).length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-6" {...editable("buttons")}>
              {(event.buttons ?? []).map((button) => (
                <CmsButton key={button.id ?? button.label} button={button} />
              ))}
            </div>
          )}
        </div>
      </section>

      {flyerImages.length > 0 && (
        <section className="px-5 py-12 md:py-16" style={{ background: BLACK }} {...editable("flyerImages", TAB.flyer)}>
          <div className="max-w-5xl mx-auto space-y-8">
            {flyerImages.map(({ media, linkLabel, id }, index) => {
              const image = (
                <Image
                  src={media!.url!}
                  alt={media!.alt}
                  width={media!.width ?? 2250}
                  height={media!.height ?? 1750}
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
