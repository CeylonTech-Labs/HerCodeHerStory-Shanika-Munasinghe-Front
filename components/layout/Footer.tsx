"use client";

import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/stories", label: "Stories" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" }
];

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-background/70 py-12">
      <div className="container grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="text-2xl font-black gradient-text">HerCodeHerStory</div>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            My life, code, stories, growth, and everything in between.
          </p>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <Link aria-label="GitHub" href="https://github.com" className="rounded-full border p-2 hover:text-foreground">
              <Github className="h-4 w-4" />
            </Link>
            <Link aria-label="LinkedIn" href="https://linkedin.com" className="rounded-full border p-2 hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link aria-label="Instagram" href="https://instagram.com" className="rounded-full border p-2 hover:text-foreground">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link aria-label="Email" href="/contact" className="rounded-full border p-2 hover:text-foreground">
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm md:justify-self-end">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
