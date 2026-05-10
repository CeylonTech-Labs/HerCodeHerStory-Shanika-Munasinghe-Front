"use client";

import { useEffect, useState } from "react";
import { getGalleryMedia } from "@/lib/api";
import type { Media } from "@/lib/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export function MediaPicker({ onPick, children }: { onPick: (url: string) => void; children: React.ReactNode }) {
  const [media, setMedia] = useState<Media[]>([]);
  useEffect(() => {
    getGalleryMedia(1, 60).then((result) => setMedia(result.media)).catch(() => setMedia([]));
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Pick media</DialogTitle></DialogHeader>
        <div className="grid max-h-[60vh] gap-2 overflow-auto">
          {media.map((item) => (
            <Button key={item.id} variant="outline" onClick={() => onPick(item.fileUrl)}>{item.fileType} · {item.caption || item.fileUrl.slice(0, 46)}</Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
