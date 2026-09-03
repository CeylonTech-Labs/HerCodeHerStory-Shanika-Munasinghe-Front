"use client";

import Cropper, { Area } from "react-easy-crop";
import { useCallback, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export type CropShape = "Original" | "Square" | "Circle" | "Rounded rectangle" | "Portrait 4:5" | "Landscape 16:9" | "Story 9:16" | "Banner 3:1";

const shapes: CropShape[] = ["Original", "Square", "Circle", "Rounded rectangle", "Portrait 4:5", "Landscape 16:9", "Story 9:16", "Banner 3:1"];

const aspectFor = (shape: CropShape) => {
  if (shape === "Square" || shape === "Circle") return 1;
  if (shape === "Portrait 4:5") return 4 / 5;
  if (shape === "Landscape 16:9") return 16 / 9;
  if (shape === "Story 9:16") return 9 / 16;
  if (shape === "Banner 3:1") return 3 / 1;
  return 4 / 3;
};

async function createImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.crossOrigin = "anonymous";
    image.src = url;
  });
}

async function cropToFile(imageSrc: string, crop: Area, rotation: number, fileName: string) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");

  const radians = (rotation * Math.PI) / 180;
  const safeArea = Math.max(image.width, image.height) * 2;
  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(radians);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData((safeArea - image.width) / 2 + crop.x, (safeArea - image.height) / 2 + crop.y, crop.width, crop.height);
  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.putImageData(data, 0, 0);

  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob as Blob], fileName.replace(/\.[^.]+$/, "-cropped.jpg"), { type: "image/jpeg" }));
    }, "image/jpeg", 0.92);
  });
}

export function ImageCropperModal({
  open,
  image,
  fileName,
  onClose,
  onSave
}: {
  open: boolean;
  image: string | null;
  fileName: string;
  onClose: () => void;
  onSave: (file: File, shape: CropShape) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [shape, setShape] = useState<CropShape>("Landscape 16:9");
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => setCroppedPixels(pixels), []);

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const save = async () => {
    if (!image || !croppedPixels) return;
    const file = await cropToFile(image, croppedPixels, rotation, fileName);
    onSave(file, shape);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-5xl p-0">
        <DialogHeader className="p-5 pb-0">
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 p-5 lg:grid-cols-[1fr_280px]">
          <div className="relative h-[420px] overflow-hidden rounded-lg bg-slate-950">
            {image ? (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspectFor(shape)}
                cropShape={shape === "Circle" ? "round" : "rect"}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            ) : null}
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-semibold">
              Shape
              <select value={shape} onChange={(event) => setShape(event.target.value as CropShape)} className="mt-2 h-10 w-full rounded-lg border bg-background px-3">
                {shapes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Zoom
              <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="mt-2 w-full" />
            </label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setRotation((value) => value - 90)}><RotateCcw className="h-4 w-4" /> Left</Button>
              <Button type="button" variant="outline" onClick={() => setRotation((value) => value + 90)}><RotateCw className="h-4 w-4" /> Right</Button>
            </div>
            <Button type="button" variant="outline" onClick={reset}>Reset crop</Button>
            <div className="flex gap-2 pt-3">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="button" onClick={save}>Save crop</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
