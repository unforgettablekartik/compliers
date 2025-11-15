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
