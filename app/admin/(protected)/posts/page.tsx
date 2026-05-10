"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deletePost, getCategories, getPosts, updatePost } from "@/lib/api";
import type { Category, Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const load = () => {
    getPosts({ limit: 100, status: status as "DRAFT" | "PUBLISHED" | undefined, category: category || undefined }).then((data) => setPosts(data.posts)).catch(() => toast.error("Could not load posts."));
  };
  useEffect(() => { load(); }, [status, category]);
  useEffect(() => { getCategories().then(setCategories).catch(() => undefined); }, []);

  const filtered = useMemo(() => posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())), [posts, search]);
  const toggle = async (post: Post) => { await updatePost(post.id, { status: post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }); toast.success("Status updated."); load(); };

  return (
    <div>
      <AdminPageTitle title="Posts" description="Create, publish and manage stories." actionHref="/admin/posts/create" actionLabel="Create new post" />
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="h-11 rounded-lg border bg-background px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All status</option><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option></select>
        <select className="h-11 rounded-lg border bg-background px-3 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option>{categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}</select>
      </div>
      <DataTable data={filtered} columns={[
        { header: "Title", cell: (p) => <div><p className="font-bold">{p.title}</p><p className="text-xs text-muted-foreground">{p.slug}</p></div> },
        { header: "Status", cell: (p) => <StatusBadge status={p.status} /> },
        { header: "Category", cell: (p) => p.category?.name || "-" },
        { header: "Date", cell: (p) => formatDate(p.createdAt) },
        { header: "Actions", cell: (p) => <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" asChild><Link href={`/stories/${p.slug}`}><Eye className="h-4 w-4" /></Link></Button><Button size="sm" variant="outline" asChild><Link href={`/admin/posts/edit/${p.id}`}><Edit className="h-4 w-4" /></Link></Button><Button size="sm" variant="outline" onClick={() => toggle(p)}>{p.status === "PUBLISHED" ? "Unpublish" : "Publish"}</Button><ConfirmDialog onConfirm={async () => { await deletePost(p.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }
      ]} />
    </div>
  );
}
