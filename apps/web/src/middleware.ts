import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  readSessionCookie,
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/auth";

const protectedPaths = ["/", "/api/cards", "/api/coach", "/api/trade"];

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get(SESSION_COOKIE)?.value ??
    readSessionCookie(request.headers.get("cookie"));
  const session = token ? await verifySessionToken(token) : null;

  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/api/cards/:path*", "/api/coach/:path*", "/api/trade/:path*"],
};
