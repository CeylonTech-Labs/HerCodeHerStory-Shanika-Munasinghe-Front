"use client";

import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteCategory, getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const load = () => getCategories().then(setItems).catch(() => toast.error("Could not load categories."));
  useEffect(() => { load(); }, []);
  return <div><AdminPageTitle title="Categories" description="Manage story categories, icons and colors." /><div className="mb-6"><CategoryForm onDone={load} /></div><DataTable data={items} columns={[{ header: "Name", cell: (c) => <b>{c.name}</b> }, { header: "Slug", cell: (c) => c.slug }, { header: "Color", cell: (c) => c.color || "-" }, { header: "Actions", cell: (c) => <div className="flex gap-2"><Dialog><DialogTrigger asChild><Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button></DialogTrigger><DialogContent className="p-6"><DialogHeader><DialogTitle>Edit category</DialogTitle></DialogHeader><CategoryForm item={c} onDone={load} /></DialogContent></Dialog><ConfirmDialog onConfirm={async () => { await deleteCategory(c.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }]} /></div>;
}
