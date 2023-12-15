import { NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY } from './constants/storageKey';

const middleware = async (request: any) => {
  const loginPath = ['/login', '/register'];

  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY);

  const nextAuthToken = request.cookies.get('next-auth.session-token');

  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    if (accessToken && nextAuthToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (!accessToken && !nextAuthToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default middleware;
