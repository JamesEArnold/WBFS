import Image from "next/image";

interface GolfEventFlyerProps {
  mode: "save-the-date" | "full-details";
}

const GoldDivider = () => (
  <div className="flex items-center justify-center w-[80%] mx-auto gap-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4a843]" />
    <div className="w-2 h-2 rotate-45 bg-[#d4a843]" />
    <div className="flex-1 h-px bg-[#d4a843]" />
    <div className="flex-1 h-px bg-[#d4a843]" />
    <div className="w-2 h-2 rotate-45 bg-[#d4a843]" />
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4a843]" />
  </div>
);

export const GolfEventFlyer = ({ mode }: GolfEventFlyerProps) => {
  return (
    <div
      className="relative w-full max-w-[540px] mx-auto overflow-hidden rounded-lg shadow-md select-none"
      style={{
        aspectRatio: "540 / 756",
        background: "linear-gradient(180deg, #1a3c2a 0%, #0d2618 100%)",
      }}
    >
      {/* Subtle checkered argyle pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-conic-gradient(
              rgba(255,255,255,0.03) 0% 25%,
              transparent 0% 50%
            )
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
        }}
      />
      {/* Soft radial vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(5,15,8,0.4) 100%)",
        }}
      />

      <div className="relative flex flex-col items-center justify-between h-full px-6 py-6">
        {/* Save The Date */}
        <div className="flex items-center justify-center w-[75%] gap-3">
          <div className="flex-1 h-px bg-[#d4a843]" />
          <p
            className="font-serif font-bold uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(0.7rem, 2.2vw, 1rem)",
              letterSpacing: "0.2em",
              color: "#d4a843",
            }}
          >
            Save The Date
          </p>
          <div className="flex-1 h-px bg-[#d4a843]" />
        </div>

        {/* Re-Elect Sheriff Weisburn */}
        <p
          className="font-serif font-bold text-white uppercase"
          style={{
            fontSize: "clamp(0.55rem, 1.8vw, 0.8rem)",
            letterSpacing: "0.25em",
          }}
        >
          Re-Elect Sheriff Weisburn
        </p>

        {/* Circular photo with gold border */}
        <div className="relative">
          <div
            className="rounded-full"
            style={{
              padding: "3px",
              background:
                "linear-gradient(135deg, #d4a843, #b8912e, #d4a843)",
            }}
          >
            <div
              className="relative overflow-hidden rounded-full"
              style={{
                width: "clamp(100px, 28vw, 160px)",
                height: "clamp(100px, 28vw, 160px)",
              }}
            >
              <Image
                src="/past-events/golf-2.jpg"
                alt="Golf outing group photo"
                fill
                className="object-cover object-[center_30%]"
                sizes="160px"
              />
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <GoldDivider />

        {/* GOLF heading */}
        <h1
          className="font-serif font-black text-white uppercase"
          style={{
            fontSize: "clamp(3.5rem, 14vw, 6.5rem)",
            letterSpacing: "0.15em",
            lineHeight: 0.9,
            textShadow:
              "0 2px 12px rgba(212,168,67,0.15), 0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          GOLF
        </h1>

        {/* OUTING heading */}
        <h2
          className="font-serif font-bold text-white uppercase"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 3rem)",
            letterSpacing: "0.35em",
            lineHeight: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          OUTING
        </h2>

        {/* Gold divider */}
        <GoldDivider />

        {/* Date */}
        <p
          className="font-serif font-bold text-white"
          style={{
            fontSize: "clamp(0.9rem, 2.8vw, 1.3rem)",
            letterSpacing: "0.06em",
          }}
        >
          Friday, September 18th
        </p>

        {/* Sponsorships + More info */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p
            className="italic"
            style={{
              fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)",
              color: "#e8dcc8",
            }}
          >
            Sponsorships will be available
          </p>
          <p
            className="italic"
            style={{
              fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)",
              color: "#e8dcc8",
            }}
          >
            More info to follow
          </p>
        </div>

        {/* Footer with email */}
        <div className="flex items-center justify-center w-[70%] gap-3">
          <div className="flex-1 h-px bg-[#d4a843] opacity-60" />
          <p
            className="italic whitespace-nowrap"
            style={{
              fontSize: "clamp(0.5rem, 1.4vw, 0.7rem)",
              color: "#e8dcc8",
            }}
          >
            weisburnforsheriff@gmail.com
          </p>
          <div className="flex-1 h-px bg-[#d4a843] opacity-60" />
        </div>
      </div>
    </div>
  );
};
