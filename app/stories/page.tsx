import type { Metadata } from "next";
import { getCategories, getPosts, getTags } from "@/lib/api";
import type { Category, Post, Tag } from "@/lib/types";
import { StoriesClient } from "./StoriesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stories",
  description: "Published posts, journal entries, university life, AI learning and personal growth stories."
};

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

export default async function StoriesPage() {
  const [postData, categories, tags] = await Promise.all([
    safe(getPosts({ limit: 100, status: "PUBLISHED" }), { posts: [] as Post[], meta: { total: 0, page: 1, limit: 100, totalPages: 0 } }),
    safe<Category[]>(getCategories(), []),
    safe<Tag[]>(getTags(), [])
  ]);

  return <StoriesClient posts={postData.posts} categories={categories} tags={tags} />;
}
