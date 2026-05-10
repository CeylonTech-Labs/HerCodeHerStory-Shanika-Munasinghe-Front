"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/api";

export function CommentForm({ postId }: { postId: number }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    try {
      await createComment(postId, {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || "") || undefined,
        comment: String(formData.get("comment") || "")
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={onSubmit} className="glass-card rounded-lg p-5">
      <h3 className="text-xl font-bold">Leave a comment</h3>
      <p className="mt-2 text-sm text-muted-foreground">Your comment will appear after approval.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Your name" required />
        <Input name="email" type="email" placeholder="Email optional" />
      </div>
      <Textarea name="comment" placeholder="Write something kind or thoughtful..." className="mt-4" required />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button disabled={status === "submitting"}>
          <Send className="h-4 w-4" />
          {status === "submitting" ? "Submitting" : "Submit comment"}
        </Button>
        {status === "success" ? <p className="text-sm font-semibold text-emerald-600">Comment sent for approval.</p> : null}
        {status === "error" ? <p className="text-sm font-semibold text-destructive">Comment could not be sent.</p> : null}
      </div>
    </form>
  );
}
