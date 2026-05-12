"use client";

import { Menu } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { Button } from "../ui/button";
import { ThemeToggle } from "../layout/ThemeToggle";

export function AdminHeader({ onMenu }: { onMenu: () => void }) {
  const user = getSessionUser();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={onMenu}>
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm font-bold">Welcome back</p>
            <p className="text-xs text-muted-foreground">{user?.name || "Admin"}</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
