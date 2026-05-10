"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { deleteAchievement, getAchievements } from "@/lib/api";
import type { Achievement } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const load = () => getAchievements().then(setItems).catch(() => toast.error("Could not load achievements."));
  useEffect(() => { load(); }, []);
  return <div><AdminPageTitle title="Achievements" actionHref="/admin/achievements/create" actionLabel="Create achievement" /><DataTable data={items} columns={[{ header: "Title", cell: (i) => <b>{i.title}</b> }, { header: "Category", cell: (i) => i.category || "-" }, { header: "Date", cell: (i) => formatDate(i.date) }, { header: "Actions", cell: (i) => <div className="flex gap-2"><Button size="sm" variant="outline" asChild><Link href={`/admin/achievements/edit/${i.id}`}><Edit className="h-4 w-4" /></Link></Button><ConfirmDialog onConfirm={async () => { await deleteAchievement(i.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }]} /></div>;
}
