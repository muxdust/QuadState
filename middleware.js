import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth-token")?.value;

  const path = request.nextUrl.pathname;

  if (!token && path === "/dashboard") {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (token && (path === "/auth/sign-in" || path === "/auth/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth/sign-in", "/auth/sign-up"],
};
