"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Media } from "@/lib/types";

export function ImageModal({
  media,
  open,
  onOpenChange
}: {
  media: Media | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0">
        {media ? (
          <>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <Image
                src={media.fileUrl}
                alt={media.altText || media.caption || "Gallery image"}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <DialogHeader>
              <DialogTitle>{media.caption || "HerCodeHerStory Gallery"}</DialogTitle>
              <DialogDescription>{media.altText || media.post?.title || "A captured moment from Shanika's story."}</DialogDescription>
            </DialogHeader>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
