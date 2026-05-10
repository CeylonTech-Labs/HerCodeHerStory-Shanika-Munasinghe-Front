"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { getToken } from "@/lib/auth";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="-mt-20 flex min-h-screen items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="-mt-20 min-h-screen bg-muted/25">
      <AdminSidebar />
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <AdminSidebar open onNavigate={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="lg:pl-72">
        <AdminHeader onMenu={() => setOpen(true)} />
        <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-4 lg:p-8">
          {children}
        </motion.main>
      </div>
    </div>
  );
}
