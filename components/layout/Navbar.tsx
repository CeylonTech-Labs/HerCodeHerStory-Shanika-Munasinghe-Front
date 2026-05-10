"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/timeline", label: "Timeline" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all",
        scrolled ? "border-b border-white/30 bg-background/75 shadow-sm backdrop-blur-xl dark:border-white/10" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="group">
          <div className="text-lg font-black tracking-normal">
            <span className="gradient-text">HerCodeHerStory</span>
          </div>
          <div className="text-xs font-medium text-muted-foreground">Shanika Munasinghe</div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                pathname === item.href && "bg-muted text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="/resume">Resume</Link>
          </Button>
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container grid gap-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground",
                    pathname === item.href && "bg-muted text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="/resume">Resume</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
