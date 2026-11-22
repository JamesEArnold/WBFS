import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RenderBlocks } from '@/components/blocks/render-blocks';
import { LAWMAN } from '@/components/designs/lawman/theme';
import { RESERVED_SLUGS } from '@/cms/fields/validators';
import { loadPage } from '@/lib/cms/content';
import { listPageSlugs } from '@/lib/cms/public';

const { BLACK, CREAM } = LAWMAN;

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listPageSlugs()).map(({ slug }) => ({ slug }));
}

async function pageFor(slug: string) {
  // Reserved paths belong to the app; never serve a CMS page there.
  if (RESERVED_SLUGS.has(slug.toLowerCase())) return null;
  return loadPage(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = await pageFor((await params).slug);
  if (!page) return {};
  return {
    title: `${page.title} | Weisburn for Sheriff`,
    description: page.description ?? undefined,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = await pageFor((await params).slug);
  if (!page) notFound();

  return (
    <main style={{ background: BLACK, color: CREAM }}>
      <RenderBlocks blocks={page.sections} asPage />
    </main>
  );
}
