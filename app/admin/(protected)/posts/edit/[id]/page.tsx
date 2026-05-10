"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { PostForm } from "@/components/admin/PostForm";
import { getCategories, getPosts } from "@/lib/api";
import type { Category, Post } from "@/lib/types";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then(setCategories).catch(() => undefined);
    getPosts({ limit: 200, status: "DRAFT" }).then((drafts) => {
      getPosts({ limit: 200, status: "PUBLISHED" }).then((pubs) => setPost([...drafts.posts, ...pubs.posts].find((item) => item.id === Number(params.id)) || null));
    }).catch(() => undefined);
  }, [params.id]);
  return <><AdminPageTitle title="Edit post" description="Update story content, media and publishing settings." />{post ? <PostForm post={post} categories={categories} /> : <p className="text-muted-foreground">Loading post...</p>}</>;
}
