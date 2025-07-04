import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    NextResponse.redirect(new URL("/login", request.url));
    return new Response("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notification/:path*",
    "/reservation-history/:path*",
    "/favorites-concepts/:path*",
  ],
};
