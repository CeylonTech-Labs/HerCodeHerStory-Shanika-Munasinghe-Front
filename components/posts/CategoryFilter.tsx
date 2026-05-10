"use client";

import type { Category, Tag } from "@/lib/types";

export function CategoryFilter({
  categories,
  tags,
  category,
  tag,
  mood,
  featured,
  onCategory,
  onTag,
  onMood,
  onFeatured
}: {
  categories: Category[];
  tags: Tag[];
  category: string;
  tag: string;
  mood: string;
  featured: boolean;
  onCategory: (value: string) => void;
  onTag: (value: string) => void;
  onMood: (value: string) => void;
  onFeatured: (value: boolean) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <select value={category} onChange={(event) => onCategory(event.target.value)} className="h-11 rounded-lg border bg-background/70 px-3 text-sm">
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item.id} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <select value={tag} onChange={(event) => onTag(event.target.value)} className="h-11 rounded-lg border bg-background/70 px-3 text-sm">
        <option value="">All tags</option>
        {tags.map((item) => (
          <option key={item.id} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <select value={mood} onChange={(event) => onMood(event.target.value)} className="h-11 rounded-lg border bg-background/70 px-3 text-sm">
        <option value="">All moods</option>
        {["Inspired", "Happy", "Focused", "Grateful", "Reflective", "Excited"].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label className="flex h-11 items-center gap-3 rounded-lg border bg-background/70 px-3 text-sm font-semibold">
        <input type="checkbox" checked={featured} onChange={(event) => onFeatured(event.target.checked)} />
        Featured only
      </label>
    </div>
  );
}
