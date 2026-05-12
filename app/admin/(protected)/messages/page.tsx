"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { adminGetMessages, deleteMessage, updateMessageStatus } from "@/lib/api";
import type { ContactMessage } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const load = () => adminGetMessages().then((data) => setItems(data.messages)).catch(() => toast.error("Could not load messages."));
  useEffect(() => { load(); }, []);
  const setStatus = async (id: number, status: ContactMessage["status"]) => { await updateMessageStatus(id, status); toast.success("Message updated."); load(); };
  return <div><AdminPageTitle title="Contact messages" /><DataTable data={items} columns={[{ header: "From", cell: (m) => <div><b>{m.name}</b><p className="text-xs text-muted-foreground">{m.email}</p></div> }, { header: "Message", cell: (m) => <div><b>{m.subject || "No subject"}</b><p className="line-clamp-2 text-muted-foreground">{m.message}</p></div> }, { header: "Status", cell: (m) => <StatusBadge status={m.status} /> }, { header: "Date", cell: (m) => formatDate(m.createdAt) }, { header: "Actions", cell: (m) => <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => setStatus(m.id, "READ")}>Read</Button><Button size="sm" variant="outline" onClick={() => setStatus(m.id, "REPLIED")}>Replied</Button><ConfirmDialog onConfirm={async () => { await deleteMessage(m.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }]} /></div>;
}
