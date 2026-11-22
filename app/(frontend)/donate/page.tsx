import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { Highlighted } from '@/components/ui/highlighted';
import { loadPageGlobal } from '@/lib/cms/content';

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, GOLD_LIGHT, CREAM, BODY } = LAWMAN;

export default async function Donate() {
  const page = await loadPageGlobal('donate');
  if (!page) notFound();

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
        <div className="relative max-w-3xl px-5 py-16 mx-auto text-center md:py-20">
          <div className="flex justify-center">
            <Image
              src="/SheriffStar.PNG"
              alt="Sheriff Eric Weisburn campaign badge"
              width={140}
              height={140}
              priority
            />
          </div>
          <p className="mt-5 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
            ★ {page.overline} ★
          </p>
          <h1
            className="mt-3 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              lineHeight: 0.95,
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
            <p className="max-w-xl mx-auto mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
              {page.intro}
            </p>
          )}
        </div>
      </section>

      {/* Donation widget */}
      <section className="px-5 py-16" style={{ background: BLACK }}>
        <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-12">
          <div className="md:col-span-7">
            <div
              className="relative p-3"
              style={{ background: CREAM, border: `4px solid ${GOLD}` }}
            >
              <iframe
                src={page.donorboxUrl}
                name="donorbox"
                data-allowpaymentrequest="allowpaymentrequest"
                data-seamless="seamless"
                data-frameborder="0"
                scrolling="no"
                height="900px"
                width="100%"
                className="max-w-[500px] w-full mx-auto block max-h-none"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <p
              className="text-[11px] font-bold tracking-[0.4em] uppercase"
              style={{ color: GOLD_BRIGHT }}
            >
              ★ {page.mailOverline} ★
            </p>
            <h2
              className="mt-3 font-serif font-black uppercase"
              style={{
                color: CREAM,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1,
              }}
            >
              {page.mailHeading}
            </h2>
            {page.mailBody && (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: BODY }}>
                <Highlighted text={page.mailBody} style={{ color: CREAM }} />
              </p>
            )}
            <div
              className="p-6 mt-6"
              style={{
                background: COAL,
                border: `1px solid ${COAL_LIFT}`,
                borderLeft: `4px solid ${GOLD}`,
              }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: GOLD_BRIGHT }}
              >
                {page.mailToLabel}
              </p>
              <p className="mt-3 font-serif text-xl font-bold" style={{ color: CREAM }}>
                {page.mailToName}
              </p>
              {page.mailToLine1 && (
                <p className="mt-1" style={{ color: CREAM }}>
                  {page.mailToLine1}
                </p>
              )}
              {page.mailToLine2 && <p style={{ color: CREAM }}>{page.mailToLine2}</p>}
              {page.mailNote && (
                <p
                  className="mt-4 text-[11px] tracking-[0.15em]"
                  style={{ color: BODY }}
                >
                  {page.mailNote}
                </p>
              )}
            </div>
            {(page.stats ?? []).length > 0 && (
            <div
              className="grid grid-cols-3 gap-px mt-6"
              style={{ background: COAL_LIFT }}
            >
              {(page.stats ?? []).map((s, i) => (
                <div
                  key={s.id ?? i}
                  className="px-2 py-4 text-center"
                  style={{ background: COAL }}
                >
                  <p
                    className="font-serif text-base font-black sm:text-xl"
                    style={{ color: GOLD_BRIGHT }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="mt-1 text-[9px] font-bold tracking-[0.25em] uppercase"
                    style={{ color: BODY }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer disclaimer */}
      <section className="px-5 py-10" style={{ background: NEAR_BLACK }}>
        <p
          className="max-w-3xl mx-auto text-xs leading-relaxed text-center"
          style={{ color: BODY }}
        >
          {page.disclaimer}
        </p>
      </section>
    </main>
  );
}
