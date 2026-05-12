import { Mail } from "lucide-react";
import Link from "next/link";
import { CertificateHighlights } from "@/components/home/CertificateHighlights";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectHighlights } from "@/components/home/ProjectHighlights";
import { RecentStories } from "@/components/home/RecentStories";
import { TimelinePreview } from "@/components/home/TimelinePreview";
import { Button } from "@/components/ui/button";
import { getAchievements, getCertificates, getFeaturedPosts, getPosts, getProfile, getProjects, getTimelineEvents } from "@/lib/api";
import type { Achievement, Certificate, Post, Profile, Project, TimelineEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [profile, featuredPosts, recentPosts, projects, certificates, achievements, timeline] = await Promise.all([
    safe<Profile | null>(getProfile(), null),
    safe<Post[]>(getFeaturedPosts(), []),
    safe(getPosts({ limit: 6 }), { posts: [], meta: { total: 0, page: 1, limit: 6, totalPages: 0 } }),
    safe<Project[]>(getProjects(), []),
    safe<Certificate[]>(getCertificates(), []),
    safe<Achievement[]>(getAchievements(), []),
    safe<TimelineEvent[]>(getTimelineEvents(), [])
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <FeaturedPosts posts={featuredPosts} />
      <RecentStories posts={recentPosts.posts} />
      <ProjectHighlights projects={projects.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))} />
      <CertificateHighlights certificates={certificates} />
      <section className="container py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {achievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="glass-card rounded-lg p-5">
              <p className="text-sm font-bold text-secondary">{achievement.category || "Achievement"}</p>
              <h3 className="mt-2 text-xl font-black">{achievement.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
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
