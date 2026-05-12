import { SectionTitle } from "@/components/common/SectionTitle";
import { PostCard } from "@/components/posts/PostCard";
import type { Post } from "@/lib/types";

export function RecentStories({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="container py-14">
      <SectionTitle eyebrow="Recent" title="Latest from the journal" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post, index) => (
          <PostCard key={post.id} post={post} delay={index * 0.04} />
        ))}
      </div>
    </section>
  );
}
