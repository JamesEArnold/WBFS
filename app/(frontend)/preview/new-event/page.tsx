import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { QuickEventPreview } from '@/components/designs/lawman/quick-event-preview';
import { getPayloadClient } from '@/lib/cms/payload';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New event preview', robots: { index: false, follow: false } };

/** The preview beside the "Post a new event" form (/admin/new-event). Logged-in CMS users only. */
export default async function NewEventPreviewPage() {
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) notFound();
  return <QuickEventPreview />;
}
