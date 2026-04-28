'use client';

import { useState } from 'react';
import { Design, designLabels } from './use-design';

export const DesignSwitcher = ({
  design,
  setDesign,
}: {
  design: Design;
  setDesign: (d: Design) => void;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Slide-out tab handle (visible when minimized) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open design picker"
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        className="fixed z-[100] right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 pl-2 pr-1.5 py-3 bg-black text-white rounded-l-lg shadow-2xl transition-all duration-300 ease-out hover:bg-gray-800"
        style={{
          transform: open
            ? 'translate(110%, -50%)'
            : 'translate(0, -50%)',
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
        }}
      >
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-rl] rotate-180">
          Design {design}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Expanded panel */}
      <div
        role="region"
        aria-label="Design picker"
        aria-hidden={!open}
        className="fixed z-[100] bottom-4 right-4 w-[min(20rem,calc(100vw-2rem))] p-4 bg-white border border-gray-200 rounded-2xl shadow-2xl transition-all duration-300 ease-out"
        style={{
          transform: open
            ? 'translateX(0)'
            : 'translateX(calc(100% + 1.5rem))',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              Preview Mode
            </p>
            <p className="text-sm font-semibold text-gray-900">Choose a design</p>
          </div>
          <button
            type="button"
            aria-label="Minimize design picker"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-7 h-7 -mt-1 -mr-1 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-900"
            title="Minimize"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-1.5 max-h-[55vh] overflow-y-auto pr-1">
          {([1, 2, 3, 4, 5, 6] as Design[]).map((d) => {
            const active = design === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDesign(d)}
                className={`flex items-center gap-3 px-3 py-2 text-left rounded-lg border transition-colors ${
                  active
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-black'
                }`}
              >
                <span
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-md ${
                    active ? 'bg-white text-black' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {d}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold leading-tight">
                    {designLabels[d].name}
                  </span>
                  <span
                    className={`text-[11px] leading-tight ${
                      active ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {designLabels[d].tagline}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
