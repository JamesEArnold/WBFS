'use client';

import Image from 'next/image';
import { LAWMAN } from '@/components/designs/lawman/theme';

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, GOLD_LIGHT, CREAM, BODY } = LAWMAN;

export default function Donate() {
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
            ★ Fund The Mission ★
          </p>
          <h1
            className="mt-3 font-serif font-black uppercase"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              lineHeight: 0.95,
            }}
          >
            Contribute to
            <span
              className="block"
              style={{
                color: GOLD_BRIGHT,
                WebkitTextStroke: `1px ${GOLD}`,
              }}
            >
              Sheriff Weisburn
            </span>
          </h1>
          <p className="max-w-xl mx-auto mt-6 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
            Your donation will make a huge impact. The fight to keep Stark
            County safe is far from over. Thank you for your support.
          </p>
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
                src="https://donorbox.org/embed/weisburn-for-sheriff"
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
              ★ Mail-in Contributions ★
            </p>
            <h2
              className="mt-3 font-serif font-black uppercase"
              style={{
                color: CREAM,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1,
              }}
            >
              Prefer to pay by check?
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: BODY }}>
              Checks are accepted. Please make payable to{' '}
              <span style={{ color: CREAM }}>Weisburn For Sheriff</span> and
              mail to the campaign headquarters listed below.
            </p>
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
                Mail To
              </p>
              <p className="mt-3 font-serif text-xl font-bold" style={{ color: CREAM }}>
                Weisburn For Sheriff
              </p>
              <p className="mt-1" style={{ color: CREAM }}>
                4849 Tree Line Circle NW
              </p>
              <p style={{ color: CREAM }}>
                North Canton, OH 44720
              </p>
              <p
                className="mt-4 text-[11px] tracking-[0.15em]"
                style={{ color: BODY }}
              >
                * Cannot accept corporate checks
              </p>
            </div>
            <div
              className="grid grid-cols-3 gap-px mt-6"
              style={{ background: COAL_LIFT }}
            >
              {[
                { k: '31', v: 'Years Service' },
                { k: '01.06.25', v: 'Sworn In' },
                { k: 'Stark Co.', v: 'Sheriff' },
              ].map((s) => (
                <div
                  key={s.v}
                  className="px-2 py-4 text-center"
                  style={{ background: COAL }}
                >
                  <p
                    className="font-serif text-base font-black sm:text-xl"
                    style={{ color: GOLD_BRIGHT }}
                  >
                    {s.k}
                  </p>
                  <p
                    className="mt-1 text-[9px] font-bold tracking-[0.25em] uppercase"
                    style={{ color: BODY }}
                  >
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer disclaimer */}
      <section className="px-5 py-10" style={{ background: NEAR_BLACK }}>
        <p
          className="max-w-3xl mx-auto text-xs leading-relaxed text-center"
          style={{ color: BODY }}
        >
          Contributions or gifts to Weisburn for Sheriff are not tax
          deductible. The maximum amount an individual may contribute is
          governed by Ohio campaign finance law. Federal law prohibits
          contributions from foreign nationals and from any corporation.
        </p>
      </section>
    </main>
  );
}
