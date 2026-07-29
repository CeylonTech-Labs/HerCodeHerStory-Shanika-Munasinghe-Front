import { NextResponse } from "next/server";
import { readSharedContent, writeSharedContent } from "@/lib/serverContentStore";
import type { Comment, ContactMessage, ReactionType } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MutationPayload =
  | { type: "reaction"; postId: number; reactionType: ReactionType }
  | { type: "comment"; postId: number; name: string; email?: string; comment: string }
  | { type: "contact"; name: string; email: string; subject?: string; message: string };

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as MutationPayload | null;
  const data = await readSharedContent() as Record<string, any> | null;

  if (!payload || !data) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (payload.type === "reaction") {
    data.reactions ||= {};
    const existing = data.reactions[payload.postId] || [];
    const current = existing.find((item: { reactionType: string }) => item.reactionType === payload.reactionType);

    if (current) {
      current.count += 1;
    } else {
      existing.push({ reactionType: payload.reactionType, count: 1 });
    }

    data.reactions[payload.postId] = existing;
  }

  if (payload.type === "comment") {
    data.comments ||= [];
    const comment: Comment = {
      id: Date.now(),
      postId: payload.postId,
      name: payload.name,
      email: payload.email || null,
      comment: payload.comment,
      status: "APPROVED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.comments.push(comment);
  }

  if (payload.type === "contact") {
    data.messages ||= [];
    const message: ContactMessage = {
      id: Date.now(),
      name: payload.name,
      email: payload.email,
      subject: payload.subject || null,
      message: payload.message,
      status: "NEW",
      createdAt: new Date().toISOString()
    };
    data.messages.push(message);
  }

  await writeSharedContent(data);
  return NextResponse.json({ ok: true });
}
