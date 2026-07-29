import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/api";
import type { Post } from "@/lib/types";
import { StoryClient } from "./StoryClient";

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

  return <StoryClient slug={slug} initialPost={post} />;
}
