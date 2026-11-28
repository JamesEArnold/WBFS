import { RenderBlocks } from "@/components/blocks/render-blocks";
import { notFound } from "next/navigation";
import { LAWMAN } from "@/components/designs/lawman/theme";
import { CmsButton } from "@/components/ui/cms-button";
import { eventFlyer, loadEvent } from "@/lib/cms/content";
import { editable } from "@/lib/cms/editable";
import { EventFlyerSection } from "@/components/designs/lawman/event-flyer";
import { EventHero } from "@/components/designs/lawman/event-hero";
import { listEventSlugs } from "@/lib/cms/public";

const { BLACK, CREAM } = LAWMAN;

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listEventSlugs()).map(({ slug }) => ({ slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  const flyer = eventFlyer(event);
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

      <EventFlyerSection flyer={flyer} caption={event.flyerCaption} />
      <RenderBlocks blocks={event.extraSections} />
    </main>
  );
}
