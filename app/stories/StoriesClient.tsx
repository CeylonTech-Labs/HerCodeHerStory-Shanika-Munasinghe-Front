"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CategoryFilter } from "@/components/posts/CategoryFilter";
import { PostCard } from "@/components/posts/PostCard";
import { SearchBar } from "@/components/posts/SearchBar";
import { Button } from "@/components/ui/button";
import type { Category, Post, Tag } from "@/lib/types";

export function StoriesClient({ posts, categories, tags }: { posts: Post[]; categories: Category[]; tags: Tag[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [mood, setMood] = useState("");
  const [featured, setFeatured] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !search || [post.title, post.excerpt, post.content].join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || post.category?.slug === category;
      const matchesTag = !tag || post.tags?.some((item) => item.tag.slug === tag);
      const matchesMood = !mood || post.mood === mood;
      const matchesFeatured = !featured || post.isFeatured;
      return matchesSearch && matchesCategory && matchesTag && matchesMood && matchesFeatured;
    });
  }, [posts, search, category, tag, mood, featured]);

  const totalPages = Math.max(Math.ceil(filtered.length / perPage), 1);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  const resetPage = (callback: () => void) => {
    callback();
    setPage(1);
  };

  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle
          eyebrow="Stories"
          title="Blog, journal, campus notes and life updates."
          description="Search across published stories, filter by category, tag, mood, or featured status."
        />
        <div className="glass-card mb-8 rounded-lg p-4">
          <div className="grid gap-4">
            <SearchBar value={search} onChange={(value) => resetPage(() => setSearch(value))} />
            <CategoryFilter
              categories={categories}
              tags={tags}
              category={category}
              tag={tag}
              mood={mood}
              featured={featured}
              onCategory={(value) => resetPage(() => setCategory(value))}
              onTag={(value) => resetPage(() => setTag(value))}
              onMood={(value) => resetPage(() => setMood(value))}
              onFeatured={(value) => resetPage(() => setFeatured(value))}
            />
          </div>
        </div>
        {visible.length ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((post, index) => <PostCard key={post.id} post={post} delay={index * 0.03} />)}
            </div>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm font-semibold text-muted-foreground">Page {page} of {totalPages}</span>
              <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <EmptyState title="No stories match those filters" message="Try changing the search text or filters." />
        )}
      </section>
    </PageShell>
  );
}
