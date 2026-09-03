import type { Metadata } from "next";
import { CalendarDays, Facebook, Linkedin, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CommentForm } from "@/components/posts/CommentForm";
import { CommentList } from "@/components/posts/CommentList";
import { PostCard } from "@/components/posts/PostCard";
import { ReactionBar } from "@/components/posts/ReactionBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getPosts } from "@/lib/api";
import type { Post } from "@/lib/types";
import { formatDate, imageFallback } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

const stripHtml = (value?: string | null) => (value || "").replace(/<[^>]*>?/gm, "").slice(0, 155);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await safe<Post | null>(getPostBySlug(slug), null);

  if (!post) {
    return { title: "Story" };
  }

  return {
    title: post.title,
    description: post.excerpt || stripHtml(post.content),
    openGraph: {
      title: post.title,
      description: post.excerpt || stripHtml(post.content),
      images: post.coverImage ? [post.coverImage] : ["/images/og-default.svg"],
      type: "article"
    }
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const post = await safe<Post | null>(getPostBySlug(slug), null);
  const relatedData = await safe(getPosts({ limit: 4 }), { posts: [] as Post[], meta: { total: 0, page: 1, limit: 4, totalPages: 0 } });

  if (!post) {
    return (
      <section className="container py-20">
        <h1 className="text-4xl font-black">Story not found</h1>
        <Button className="mt-6" asChild><Link href="/stories">Back to stories</Link></Button>
      </section>
    );
  }

  const image = post.coverImage || imageFallback(post.slug);
  const storyUrl = `/stories/${post.slug}`;
  const gallery = post.media?.filter((item) => item.fileType === "IMAGE") || [];

  return (
    <article>
      <section className="container py-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-2">
            {post.category ? <Badge>{post.category.name}</Badge> : null}
            {post.mood ? <Badge variant="secondary">{post.mood}</Badge> : null}
            {post.location ? <Badge variant="cyan"><MapPin className="mr-1 h-3 w-3" /> {post.location}</Badge> : null}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {formatDate(post.publishedAt || post.createdAt)}</span>
            <span>{post._count?.comments || 0} comments</span>
            <span>{post._count?.reactions || 0} reactions</span>
          </div>
        </div>
        <div className="relative mx-auto mt-8 aspect-[16/9] max-w-5xl overflow-hidden rounded-lg">
          <Image src={image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        </div>
      </section>

      <section className="container pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <div className="content-rich glass-card rounded-lg p-6 md:p-9" dangerouslySetInnerHTML={{ __html: post.content }} />

            {post.videoUrl ? (
              <div className="overflow-hidden rounded-lg border bg-slate-950">
                <iframe src={post.videoUrl} title={post.title} className="aspect-video w-full" allowFullScreen />
              </div>
            ) : null}

            {gallery.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((item) => (
                  <div key={item.id} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image src={item.fileUrl} alt={item.altText || item.caption || post.title} fill className="object-cover" sizes="50vw" />
                  </div>
                ))}
              </div>
            ) : null}

            {post.allowReactions ? <ReactionBar postId={post.id} /> : null}
            <CommentList comments={post.comments} />
            {post.allowComments ? <CommentForm postId={post.id} /> : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="glass-card rounded-lg p-5">
              <h2 className="mb-4 flex items-center gap-2 font-bold"><Share2 className="h-4 w-4" /> Share story</h2>
              <div className="grid gap-2">
                <Button variant="outline" asChild><Link href={`https://www.facebook.com/sharer/sharer.php?u=${storyUrl}`}><Facebook className="h-4 w-4" /> Facebook</Link></Button>
                <Button variant="outline" asChild><Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${storyUrl}`}><Linkedin className="h-4 w-4" /> LinkedIn</Link></Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container pb-20">
        <h2 className="mb-6 text-3xl font-black">Related stories</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedData.posts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
