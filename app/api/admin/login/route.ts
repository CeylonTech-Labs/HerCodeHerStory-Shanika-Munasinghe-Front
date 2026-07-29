import { NextResponse } from "next/server";
import { createAdminSessionValue, SESSION_COOKIE } from "@/lib/serverAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  const adminEmail = (process.env.ADMIN_EMAIL || "shanika.uok2@gmail.com").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "21PQshani@";

  if (!payload || payload.email?.trim().toLowerCase() !== adminEmail || payload.password !== adminPassword) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({
    token: "server-admin-session",
    user: {
      id: 1,
      name: "Shanika Munasinghe",
      email: adminEmail,
      role: "ADMIN",
      bio: "Admin session"
    }
  });

  response.cookies.set(SESSION_COOKIE, createAdminSessionValue(adminEmail), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}
