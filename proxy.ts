import { NextResponse, type NextRequest } from 'next/server';

/**
 * Defense in depth for CMS account flows (the real guard is the `users`
 * beforeOperation hook in cms/collections/Users.ts):
 * - Public first-user signup is closed outside local development.
 * - Self-serve "forgot password" is replaced by admin-issued setup links.
 */
const FORGOT_HELP = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reset your password</title><meta name="robots" content="noindex"></head>
<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem;line-height:1.5">
<h1>Forgot your password?</h1>
<p>Ask a site admin for a reset link. They can create one from <strong>Users → your name → Copy setup / reset link</strong>. The link works once and expires after 72 hours.</p>
<p><a href="/admin/login">Back to log in</a></p></body></html>`;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLocal = process.env.APP_ENV === 'local';

  if (!isLocal && (pathname === '/admin/create-first-user' || pathname === '/api/users/first-register')) {
    return new NextResponse('Not found', { status: 404 });
  }

  if (pathname === '/admin/forgot') {
    return new NextResponse(FORGOT_HELP, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } });
  }

  if (pathname === '/api/users/forgot-password' && request.method === 'POST') {
    return NextResponse.json({ errors: [{ message: 'Ask a site admin for a reset link.' }] }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/create-first-user', '/admin/forgot', '/api/users/first-register', '/api/users/forgot-password'],
};
