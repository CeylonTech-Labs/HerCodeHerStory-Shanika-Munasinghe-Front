"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CertificateHighlights } from "@/components/home/CertificateHighlights";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectHighlights } from "@/components/home/ProjectHighlights";
import { RecentStories } from "@/components/home/RecentStories";
import { TimelinePreview } from "@/components/home/TimelinePreview";
import { Button } from "@/components/ui/button";
import { getAchievements, getCertificates, getFeaturedPosts, getPosts, getProfile, getProjects, getTimelineEvents } from "@/lib/api";
import type { Achievement, Certificate, Post, Profile, Project, TimelineEvent } from "@/lib/types";
import { imageFallback } from "@/lib/utils";

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<{ posts: Post[]; meta: { total: number; page: number; limit: number; totalPages: number } }>({ posts: [], meta: { total: 0, page: 1, limit: 6, totalPages: 0 } });
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [nextProfile, nextFeatured, nextPosts, nextProjects, nextCertificates, nextAchievements, nextTimeline] = await Promise.all([
          getProfile(),
          getFeaturedPosts(),
          getPosts({ limit: 6, status: "PUBLISHED" }),
          getProjects(),
          getCertificates(),
          getAchievements(),
          getTimelineEvents()
        ]);
        if (!active) return;
        setProfile(nextProfile);
        setFeaturedPosts(nextFeatured);
        setRecentPosts(nextPosts);
        setProjects(nextProjects);
        setCertificates(nextCertificates);
        setAchievements(nextAchievements);
        setTimeline(nextTimeline);
      } catch {
        if (active) {
          setProfile(null);
          setFeaturedPosts([]);
          setRecentPosts({ posts: [], meta: { total: 0, page: 1, limit: 6, totalPages: 0 } });
          setProjects([]);
          setCertificates([]);
          setAchievements([]);
          setTimeline([]);
        }
      }
    };

    load();
    const onContentUpdated = () => {
      load();
    };

    window.addEventListener("hercodeherstory-content-updated", onContentUpdated);
    return () => {
      active = false;
      window.removeEventListener("hercodeherstory-content-updated", onContentUpdated);
    };
  }, []);

  return (
    <>
      <HeroSection profile={profile} />
      <FeaturedPosts posts={featuredPosts} />
      <RecentStories posts={recentPosts.posts} />
      <ProjectHighlights projects={projects.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))} />
      <CertificateHighlights certificates={certificates} />
      <section className="container py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {achievements.slice(0, 3).map((achievement) => {
            const image = achievement.imageUrl || imageFallback(achievement.title);
            return (
              <div key={achievement.id} className="glass-card overflow-hidden rounded-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={image} alt={achievement.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-secondary">{achievement.category || "Achievement"}</p>
                  <h3 className="mt-2 text-xl font-black">{achievement.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <TimelinePreview events={timeline} />
      <section className="container pb-20 pt-8">
        <div className="glass-card grid items-center gap-6 rounded-lg p-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Connect</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Let’s build, learn, and tell better stories.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">Send a message, collaboration idea, opportunity, or a simple hello.</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact"><Mail className="h-4 w-4" /> Contact Shanika</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
