import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { getGalleryMedia } from "@/lib/api";
import type { Media } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Masonry gallery for photos, memories and visual moments."
};

export default async function GalleryPage() {
  let media: Media[] = [];
  try {
    const response = await getGalleryMedia(1, 80);
    media = response.media;
  } catch {}

  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Gallery" title="A wall of moments." description="Photos from posts, travel, events, university life and personal memories." />
        <GalleryGrid media={media} />
      </section>
    </PageShell>
  );
}
