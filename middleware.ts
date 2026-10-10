import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Protected routes: /product/** and /profile/**.
 * Visitors without a session cookie are sent to /signin and a toast explains why.
 * (The cookie is only checked for presence here; pages still read the real session.)
 */
export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const { pathname, search } = request.nextUrl;
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", pathname + search);
    url.searchParams.set("reason", "protected");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
