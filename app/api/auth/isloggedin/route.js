import { NextResponse } from "next/server";
import { parse } from "cookie";

export async function GET(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);

  const token = cookies["auth-token"];

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({ isLoggedIn: true });
}
