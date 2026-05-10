"use client";

import { Award, FolderKanban, Heart, MessageSquare, Newspaper, Send, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminGetComments, adminGetMessages, getDashboardStats, getPosts } from "@/lib/api";
import type { Comment, ContactMessage, DashboardStats, Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => undefined);
    adminGetComments().then((data) => setComments(data.comments.slice(0, 5))).catch(() => undefined);
    adminGetMessages().then((data) => setMessages(data.messages.slice(0, 5))).catch(() => undefined);
    getPosts({ limit: 50, status: "PUBLISHED" }).then((data) => setPosts(data.posts.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0)).slice(0, 5))).catch(() => undefined);
  }, []);

  return (
    <div>
      <AdminPageTitle title="Dashboard" description="A quick pulse check for HerCodeHerStory." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total posts" value={stats?.posts ?? 0} icon={Newspaper} />
        <StatCard title="Published" value={stats?.publishedPosts ?? 0} icon={Send} />
        <StatCard title="Drafts" value={stats?.draftPosts ?? 0} icon={Newspaper} />
        <StatCard title="Reactions" value={stats?.reactions ?? 0} icon={Heart} />
        <StatCard title="Comments" value={stats?.comments ?? 0} icon={MessageSquare} />
        <StatCard title="Pending comments" value={stats?.pendingComments ?? 0} icon={MessageSquare} />
        <StatCard title="Projects" value={stats?.projects ?? 0} icon={FolderKanban} />
        <StatCard title="Certificates" value={stats?.certificates ?? 0} icon={Award} />
        <StatCard title="Achievements" value={stats?.achievements ?? 0} icon={Trophy} />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <Panel title="Recent messages"><DataTable data={messages} columns={[{ header: "Name", cell: (m) => m.name }, { header: "Status", cell: (m) => <StatusBadge status={m.status} /> }, { header: "Date", cell: (m) => formatDate(m.createdAt) }]} /></Panel>
        <Panel title="Recent comments"><DataTable data={comments} columns={[{ header: "Name", cell: (c) => c.name }, { header: "Status", cell: (c) => <StatusBadge status={c.status} /> }, { header: "Date", cell: (c) => formatDate(c.createdAt) }]} /></Panel>
        <Panel title="Most reacted posts"><DataTable data={posts} columns={[{ header: "Post", cell: (p) => p.title }, { header: "Reactions", cell: (p) => p._count?.reactions || 0 }]} /></Panel>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="mb-3 text-lg font-black">{title}</h2>{children}</div>;
}
