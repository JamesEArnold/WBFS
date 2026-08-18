import Image from "next/image";
import { LAWMAN } from "@/components/designs/lawman/theme";

const { BLACK, NEAR_BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

const FLYER_PDF = "/250-SheriffWeisburn_GolfOuting_TriFold.pdf";

export default function GolfFundraiser3Page() {
  return (
    <main style={{ background: BLACK, color: CREAM }}>
      {/* Sold Out full-width sticky banner */}
      <div className="w-full py-5 text-center sticky top-0 z-50" style={{ background: GOLD }}>
        <p
          className="font-black uppercase tracking-[0.25em]"
          style={{ color: BLACK, fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
        >
          Golf Spots — Sold Out
        </p>
        <p className="max-w-2xl mx-auto mt-2 text-sm font-medium leading-relaxed px-5" style={{ color: BLACK, opacity: 0.8 }}>
          Thank you to everyone who registered — we&apos;re excited for a great event. If you
          didn&apos;t secure a golf spot, there are still meaningful ways to support: become an
          event sponsor, a meal sponsor, or join us for the post-outing meal and silent auction.
        </p>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(200,155,60,0.15) 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-5xl px-5 pt-16 pb-10 mx-auto md:pt-20">
          <div className="flex items-center gap-3">
            <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
            <p
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              Friday · September 18, 2026
            </p>
          </div>
          <h1
            className="mt-6 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: "clamp(2.5rem, 7.5vw, 4.75rem)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
            }}
          >
            Annual Golf
            <span
              className="block"
              style={{
                color: GOLD_BRIGHT,
                WebkitTextStroke: `1px ${GOLD}`,
              }}
            >
              Fundraiser
            </span>
          </h1>
          <p
            className="max-w-xl mt-6 text-base leading-relaxed md:text-lg"
            style={{ color: BODY }}
          >
            Sable Creek Golf Course · 9:00 a.m. shotgun start · $500 per team.
            Sponsorship opportunities, $10,000 hole-in-one, donuts, lunch and
            dinner provided.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href={FLYER_PDF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase"
              style={{ background: GOLD, color: BLACK, boxShadow: `0 4px 0 ${COAL_LIFT}` }}
            >
              View / Print Flyer
            </a>
            <a
              href="mailto:weisburnforsheriff@gmail.com?subject=2026%20Golf%20Outing%20Sponsorship"
              className="inline-flex items-center px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase border-2"
              style={{ borderColor: GOLD, color: GOLD_BRIGHT }}
            >
              Inquire About Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* Trifold flyer pages */}
      <section className="px-5 py-12 md:py-16" style={{ background: BLACK }}>
        <div className="max-w-5xl mx-auto space-y-8">
          <a
            href={FLYER_PDF}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the printable golf outing flyer PDF — outside"
            className="block transition-opacity hover:opacity-95"
            style={{ border: `1px solid ${COAL_LIFT}` }}
          >
            <Image
              src="/golf-trifold-outside.jpg"
              alt="Sheriff Weisburn Golf Outing flyer — cover, sponsor thank-you, and registration form"
              width={2250}
              height={1750}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="w-full h-auto"
              priority
            />
          </a>
          <a
            href={FLYER_PDF}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the printable golf outing flyer PDF — inside"
            className="block transition-opacity hover:opacity-95"
            style={{ border: `1px solid ${COAL_LIFT}` }}
          >
            <Image
              src="/golf-trifold-inside.jpg"
              alt="Sheriff Weisburn Golf Outing flyer — sponsorship tiers, $10,000 hole-in-one, and registration form details"
              width={2250}
              height={1750}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="w-full h-auto"
            />
          </a>
          <p
            className="text-center text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ color: GOLD_BRIGHT }}
          >
            Tap either page to open the printable PDF
          </p>
        </div>
      </section>
    </main>
  );
}
