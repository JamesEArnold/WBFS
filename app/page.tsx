'use client';

import { useDesign } from '@/components/designs/use-design';
import { DesignSwitcher } from '@/components/designs/design-switcher';
import { Design1OldGlory } from '@/components/designs/design-1-old-glory';
import { Design2Editorial } from '@/components/designs/design-2-editorial';
import { Design3Authority } from '@/components/designs/design-3-authority';
import { Design4Documentary } from '@/components/designs/design-4-documentary';
import { Design5Lawman } from '@/components/designs/design-5-lawman';
import { Design6Banner } from '@/components/designs/design-6-banner';

const designs = {
  1: Design1OldGlory,
  2: Design2Editorial,
  3: Design3Authority,
  4: Design4Documentary,
  5: Design5Lawman,
  6: Design6Banner,
} as const;

export default function Home() {
  const { design, setDesign, hydrated } = useDesign();

  if (!hydrated) {
    return <div className="min-h-screen bg-white" aria-hidden />;
  }

  const Active = designs[design];

  return (
    <>
      <Active />
      <DesignSwitcher design={design} setDesign={setDesign} />
    </>
  );
}
