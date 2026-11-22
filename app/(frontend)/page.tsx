import { notFound } from 'next/navigation';
import { LawmanHome } from '@/components/designs/lawman/home';
import { loadPageGlobal } from '@/lib/cms/content';
import { getSiteSettings } from '@/lib/cms/public';

// Re-render hourly so a featured event drops off after its listing expiry date
// (publishing still refreshes immediately).
export const revalidate = 3600;

export default async function Home() {
  const [page, settings] = await Promise.all([loadPageGlobal('home'), getSiteSettings()]);
  if (!page) notFound();
  return (
    <LawmanHome
      page={page}
      social={{ facebookUrl: settings?.facebookUrl, instagramUrl: settings?.instagramUrl }}
    />
  );
}
