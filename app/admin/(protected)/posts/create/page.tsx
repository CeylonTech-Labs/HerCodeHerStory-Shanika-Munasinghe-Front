"use client";

import { useEffect, useState } from "react";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { PostForm } from "@/components/admin/PostForm";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";

export default function CreatePostPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => { getCategories().then(setCategories).catch(() => undefined); }, []);
  return <><AdminPageTitle title="Create post" description="Write a new story with rich formatting and media." /><PostForm categories={categories} /></>;
}
