"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import type { Media } from "@/lib/types";
import { ImageModal } from "./ImageModal";

export function GalleryGrid({ media }: { media: Media[] }) {
  const [active, setActive] = useState<Media | null>(null);
  const [filter, setFilter] = useState("all");
  const categories = useMemo(
    () => Array.from(new Set(media.map((item) => item.post?.title || item.cropShape || "Moments"))),
    [media]
  );
  const images = media.filter((item) => item.fileType === "IMAGE");
  const filtered = filter === "all" ? images : images.filter((item) => (item.post?.title || item.cropShape || "Moments") === filter);

  if (!images.length) {
    return <EmptyState title="Gallery is waiting for memories" message="Uploaded images will become a beautiful masonry wall here." />;
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.035 }}
            whileHover={{ y: -4 }}
            onClick={() => setActive(item)}
            className="group mb-4 block w-full overflow-hidden rounded-lg border bg-background/70 text-left"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.fileUrl}
                alt={item.altText || item.caption || "Gallery image"}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {item.caption ? <p className="p-3 text-sm font-semibold">{item.caption}</p> : null}
          </motion.button>
        ))}
      </div>
      <ImageModal media={active} open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)} />
    </>
  );
}
