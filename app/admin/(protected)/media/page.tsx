"use client";

import { Copy, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteMedia, getApiErrorMessage, getGalleryMedia, uploadMedia } from "@/lib/api";
import type { Media } from "@/lib/types";

export default function AdminMediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [uploading, setUploading] = useState(false);
  const load = () => getGalleryMedia(1, 100).then((data) => setItems(data.media)).catch(() => toast.error("Could not load media."));
  useEffect(() => { load(); }, []);
  const filtered = useMemo(() => items.filter((m) => (!type || m.fileType === type) && [m.caption, m.altText, m.fileUrl].join(" ").toLowerCase().includes(search.toLowerCase())), [items, search, type]);
  const upload = async (files: FileList | null) => { if (!files?.length) return; setUploading(true); try { await uploadMedia(Array.from(files)); toast.success("Media uploaded."); load(); } catch (error) { toast.error(getApiErrorMessage(error, "Upload failed. Please choose smaller local files.")); } finally { setUploading(false); } };
  return <div><AdminPageTitle title="Media library" description="Upload, search, copy and delete locally stored media." /><div className="mb-6 grid gap-3 md:grid-cols-4"><Input type="file" multiple onChange={(e) => upload(e.target.files)} disabled={uploading} /><Input placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} /><select className="h-11 rounded-lg border bg-background px-3 text-sm" value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option><option value="IMAGE">Images</option><option value="VIDEO">Videos</option><option value="DOCUMENT">Documents</option></select><Button variant="outline" onClick={load}><Upload className="h-4 w-4" /> Refresh</Button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{filtered.map((m) => <div key={m.id} className="overflow-hidden rounded-lg border bg-background">{m.fileType === "IMAGE" ? <div className="relative aspect-video"><Image src={m.fileUrl} alt={m.altText || "Media"} fill className="object-cover" sizes="25vw" unoptimized /></div> : <div className="flex aspect-video items-center justify-center bg-muted text-sm font-bold">{m.fileType}</div>}<div className="space-y-3 p-4"><StatusBadge status={m.fileType} /><p className="line-clamp-1 text-xs text-muted-foreground">{m.cropShape || "Original"}</p><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(m.fileUrl); toast.success("URL copied."); }}><Copy className="h-4 w-4" /></Button><ConfirmDialog onConfirm={async () => { await deleteMedia(m.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div></div></div>)}</div></div>;
}
