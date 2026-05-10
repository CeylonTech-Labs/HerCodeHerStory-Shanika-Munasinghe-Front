"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { adminGetComments, deleteComment, updateCommentStatus } from "@/lib/api";
import type { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminCommentsPage() {
  const [items, setItems] = useState<Comment[]>([]);
  const [status, setStatus] = useState("");
  const load = () => adminGetComments(status).then((data) => setItems(data.comments)).catch(() => toast.error("Could not load comments."));
  useEffect(() => { load(); }, [status]);
  const setCommentStatus = async (id: number, next: Comment["status"]) => { await updateCommentStatus(id, next); toast.success("Comment updated."); load(); };
  return <div><AdminPageTitle title="Comment moderation" /><div className="mb-4"><select className="h-11 rounded-lg border bg-background px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All</option><option value="PENDING">Pending</option><option value="APPROVED">Approved</option><option value="HIDDEN">Hidden</option><option value="SPAM">Spam</option></select></div><DataTable data={items} columns={[{ header: "Comment", cell: (c) => <div><b>{c.name}</b><p className="line-clamp-2 text-muted-foreground">{c.comment}</p></div> }, { header: "Status", cell: (c) => <StatusBadge status={c.status} /> }, { header: "Date", cell: (c) => formatDate(c.createdAt) }, { header: "Actions", cell: (c) => <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => setCommentStatus(c.id, "APPROVED")}>Approve</Button><Button size="sm" variant="outline" onClick={() => setCommentStatus(c.id, "HIDDEN")}>Hide</Button><Button size="sm" variant="outline" onClick={() => setCommentStatus(c.id, "SPAM")}>Spam</Button><ConfirmDialog onConfirm={async () => { await deleteComment(c.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }]} /></div>;
}
