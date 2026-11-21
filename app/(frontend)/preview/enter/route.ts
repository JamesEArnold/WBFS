import { draftMode, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/cms/payload';

/** Only same-site paths, e.g. "/events/golf-fundraiser-3". */
function safePath(value: string | null): string | null {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return null;
  return value;
}

/**
 * Turns on draft mode for a logged-in CMS user and sends them to the page.
 * Linked from the admin "Preview" button.
 */
export async function GET(request: Request): Promise<Response> {
  const path = safePath(new URL(request.url).searchParams.get('path'));
  if (!path) return new NextResponse('Invalid preview path.', { status: 400 });

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) return new NextResponse('Log in to the CMS to preview drafts.', { status: 401 });

  (await draftMode()).enable();
  redirect(path);
}
