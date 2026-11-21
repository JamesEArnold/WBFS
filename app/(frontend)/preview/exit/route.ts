import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/** Leave draft preview and return to the published page. */
export async function GET(request: Request): Promise<Response> {
  (await draftMode()).disable();
  const path = new URL(request.url).searchParams.get('path');
  redirect(path && path.startsWith('/') && !path.startsWith('//') ? path : '/');
}
