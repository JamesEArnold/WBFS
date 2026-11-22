import { notFound } from 'next/navigation';
import { LawmanHome } from '@/components/designs/lawman/home';
import { loadPageGlobal } from '@/lib/cms/content';
import { getSiteSettings } from '@/lib/cms/public';

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
