import { MessageCircle } from "lucide-react";
import type { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function CommentList({ comments = [] }: { comments?: Comment[] }) {
  const approved = comments.filter((comment) => comment.status === "APPROVED");

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold">
        <MessageCircle className="h-5 w-5 text-primary" />
        Comments
      </h3>
      {approved.length ? (
        approved.map((comment) => (
          <div key={comment.id} className="rounded-lg border bg-background/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold">{comment.name}</p>
              <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{comment.comment}</p>
          </div>
        ))
      ) : (
        <p className="rounded-lg border bg-background/70 p-4 text-sm text-muted-foreground">
          No approved comments yet. You can be the first to start the conversation.
        </p>
      )}
    </div>
  );
}
