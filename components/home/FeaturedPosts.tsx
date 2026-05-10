import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PostCard } from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/types";

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="container py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow="Featured" title="Stories worth starting with" description="Highlights from code, campus, research, life lessons and little moments that matter." />
        <Button variant="outline" asChild>
          <Link href="/stories">All stories</Link>
        </Button>
      </div>
      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <PostCard key={post.id} post={post} delay={index * 0.05} />
          ))}
        </div>
      ) : (
        <EmptyState title="Featured stories are coming" />
      )}
    </section>
  );
}
