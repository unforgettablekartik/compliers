import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Check if the request is coming from the markster subdomain
  if (hostname.startsWith('markster.')) {
    // Rewrite the request to the /markster path
    // If the path is already /markster or starts with /markster/, serve it directly
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/markster';
      return NextResponse.rewrite(url);
    }
    
    // For other paths on the markster subdomain (e.g., /dashboard)
    // prepend /markster to the path
    if (!url.pathname.startsWith('/markster')) {
      url.pathname = `/markster${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Redirect /markster requests on main domain to markster subdomain
  if (!hostname.startsWith('markster.') && url.pathname.startsWith('/markster')) {
    // Extract the base domain (e.g., thecompliers.info from www.thecompliers.info or thecompliers.info)
    const baseDomain = hostname.replace(/^www\./, '');
    const subdomain = `markster.${baseDomain}`;
    
    // Build the redirect URL
    const redirectUrl = new URL(request.url);
    redirectUrl.hostname = subdomain;
    // Remove /markster prefix from the path since the subdomain handles this
    redirectUrl.pathname = url.pathname.replace(/^\/markster/, '') || '/';
    
    return NextResponse.redirect(redirectUrl, 301); // 301 permanent redirect
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
