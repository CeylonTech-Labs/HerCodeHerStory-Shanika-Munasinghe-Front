import { NextResponse } from "next/server";
import { isValidAdminSession, SESSION_COOKIE } from "@/lib/serverAuth";
import { readSharedContent, writeSharedContent } from "@/lib/serverContentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await readSharedContent();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: null }, { status: 200 });
  }
}

export async function PUT(request: Request) {
  const session = request.headers.get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];

  if (!isValidAdminSession(session)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json().catch(() => null) as { data?: unknown } | null;

  if (!payload || !payload.data || typeof payload.data !== "object") {
    return NextResponse.json({ message: "Invalid content payload." }, { status: 400 });
  }

  await writeSharedContent(payload.data);
  return NextResponse.json({ ok: true });
}
