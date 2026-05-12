import { GolfEventFlyer } from "@/components/ui/golf-event-flyer";
import { LAWMAN } from "@/components/designs/lawman/theme";

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export default function GolfFundraiser3Page() {
  return (
    <main style={{ background: BLACK, color: CREAM }}>
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
              Save The Date · 2026
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
            Mark your calendars for Friday, September 18th. Registration,
            sponsorship details, and pricing to follow.
          </p>
        </div>
      </section>

      {/* Flyer */}
      <section className="px-5 py-12" style={{ background: BLACK }}>
        <div className="flex flex-col items-center justify-center">
          <GolfEventFlyer mode="save-the-date" />
        </div>
      </section>

      {/* Details + Contact */}
      <section className="px-5 pb-20" style={{ background: BLACK }}>
        <div
          className="max-w-2xl mx-auto p-8 md:p-10"
          style={{
            background: COAL,
            border: `1px solid ${COAL_LIFT}`,
            borderTop: `3px solid ${GOLD}`,
          }}
        >
          <p
            className="text-[11px] font-bold tracking-[0.4em] uppercase"
            style={{ color: GOLD_BRIGHT }}
          >
            ★ More Details Coming Soon ★
          </p>
          <h2
            className="mt-3 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)",
              lineHeight: 1.05,
            }}
          >
            2026 Golf Fundraiser
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
            We&rsquo;re excited to announce the 2026 Sheriff Weisburn Golf
            Fundraiser. Stay tuned for registration details, pricing, and
            sponsorship opportunities.
          </p>
          <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
            Questions in the meantime? Reach out at{" "}
            <a
              href="mailto:weisburnforsheriff@gmail.com"
              className="font-semibold underline"
              style={{ color: GOLD_BRIGHT }}
            >
              weisburnforsheriff@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
