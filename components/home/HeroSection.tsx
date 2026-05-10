"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpenText, Code2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

const roles = ["Software Developer", "AI Learner", "CS Undergraduate", "Storyteller"];

export function HeroSection({ profile }: { profile?: Profile | null }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <Badge className="mb-5">HerCodeHerStory</Badge>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-slate-950 dark:text-white md:text-7xl">
            Shanika Munasinghe
            <span className="block gradient-text">writes life in code.</span>
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xl font-bold text-muted-foreground">
            <span>I am a</span>
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="gradient-text"
            >
              {roles[roleIndex]}
            </motion.span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {profile?.shortBio ||
              "My life, code, stories, growth, and everything in between. A personal platform for software engineering, AI learning, university memories and becoming."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/stories">
                Read stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                <Code2 className="h-4 w-4" />
                View projects
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["Code", "Projects"],
              ["AI", "Learning"],
              ["Life", "Stories"]
            ].map(([top, bottom]) => (
              <div key={top} className="glass-card rounded-lg p-4">
                <p className="text-2xl font-black">{top}</p>
                <p className="text-xs font-semibold text-muted-foreground">{bottom}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="glass-card relative overflow-hidden rounded-lg p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gradient-to-br from-violet-500 via-pink-400 to-cyan-400">
              {profile?.profileImage ? (
                <Image src={profile.profileImage} alt={profile.fullName} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 45vw" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center text-white">
                  <Sparkles className="mb-5 h-12 w-12" />
                  <p className="text-5xl font-black">SM</p>
                  <p className="mt-3 max-w-xs text-sm font-semibold leading-6">
                    A personal brand space ready for Shanika's profile image.
                  </p>
                </div>
              )}
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -bottom-6 left-6 right-6 rounded-lg border bg-background/90 p-4 shadow-glow backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <BookOpenText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">Today’s story</p>
                <p className="text-sm text-muted-foreground">Learning, building, reflecting, growing.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
