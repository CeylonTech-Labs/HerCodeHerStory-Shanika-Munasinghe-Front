"use client";

import {
  Award,
  BookOpenText,
  FolderKanban,
  Gauge,
  Image as ImageIcon,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Newspaper,
  Settings,
  Tags,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/timeline", label: "Timeline", icon: BookOpenText },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/messages", label: "Messages", icon: LayoutGrid },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminSidebar({ open, onNavigate }: { open?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    clearSession();
    router.replace("/admin/login");
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r bg-slate-950 p-4 text-white transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <Link href="/admin/dashboard" onClick={onNavigate} className="block rounded-lg bg-white/10 p-4">
        <p className="text-lg font-black">HerCodeHerStory</p>
        <p className="text-xs text-white/65">Admin Dashboard</p>
      </Link>
      <nav className="mt-6 grid gap-1">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white",
                active && "bg-white text-slate-950 hover:bg-white hover:text-slate-950"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Button variant="secondary" className="absolute bottom-4 left-4 right-4" onClick={logout}>
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </aside>
  );
}
