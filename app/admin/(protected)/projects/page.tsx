"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { deleteProject, getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const load = () => getProjects().then(setItems).catch(() => toast.error("Could not load projects."));
  useEffect(() => { load(); }, []);
  return <div><AdminPageTitle title="Projects" actionHref="/admin/projects/create" actionLabel="Create project" /><DataTable data={items} columns={[{ header: "Title", cell: (i) => <b>{i.title}</b> }, { header: "Status", cell: (i) => i.status || "-" }, { header: "Featured", cell: (i) => i.isFeatured ? "Yes" : "No" }, { header: "Actions", cell: (i) => <div className="flex gap-2"><Button size="sm" variant="outline" asChild><Link href={`/admin/projects/edit/${i.id}`}><Edit className="h-4 w-4" /></Link></Button><ConfirmDialog onConfirm={async () => { await deleteProject(i.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }]} /></div>;
}
