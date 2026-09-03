"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { getApiErrorMessage, uploadMedia } from "@/lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CropShape, ImageCropperModal } from "./ImageCropperModal";

export function ImageUploader({
  value,
  onChange,
  label = "Image",
  multiple = false,
  postId
}: {
  value?: string | string[] | null;
  onChange: (url: string | string[], shape?: string) => void;
  label?: string;
  multiple?: boolean;
  postId?: number;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image.jpg");
  const [uploading, setUploading] = useState(false);

  const selectFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file for cropping.");
      return;
    }
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const saveCrop = async (file: File, shape: CropShape) => {
    setUploading(true);
    try {
      const media = await uploadMedia([file], { cropShape: shape, postId });
      const urls = media.map((item) => item.fileUrl);
      onChange(multiple ? [...(Array.isArray(value) ? value : value ? [value] : []), ...urls] : urls[0], shape);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Upload failed. Check backend Cloudinary settings."));
    } finally {
      setUploading(false);
    }
  };

  const values = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold">{label}</label>
      <Input type="file" accept="image/*" onChange={(event) => selectFile(event.target.files?.[0])} disabled={uploading} />
      {values.length ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {values.map((url) => (
            <div key={url} className="relative aspect-video overflow-hidden rounded-lg border">
              <Image src={url} alt={label} fill className="object-cover" sizes="20vw" />
            </div>
          ))}
        </div>
      ) : null}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange(multiple ? [] : "")}>Clear</Button>
      <ImageCropperModal open={Boolean(preview)} image={preview} fileName={fileName} onClose={() => setPreview(null)} onSave={saveCrop} />
    </div>
  );
}
