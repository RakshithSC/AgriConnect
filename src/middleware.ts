
import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const idToken = request.cookies.get('idToken')?.value;

  if (idToken) {
    requestHeaders.set('Authorization', `Bearer ${idToken}`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
};
