"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Upload } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { exportContentData, getProfile, importContentData, updateProfile } from "@/lib/api";

const schema = z.object({
  fullName: z.string().min(1),
  portfolioTitle: z.string().optional(),
  title: z.string().optional(),
  shortBio: z.string().optional(),
  longBio: z.string().optional(),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional()
});

type Values = z.infer<typeof schema>;

export default function AdminSettingsPage() {
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { fullName: "Shanika Munasinghe" } });
  const loadProfile = () => {
    getProfile().then((profile) => {
      if (profile) {
        form.reset({
          fullName: profile.fullName || "Shanika Munasinghe",
          portfolioTitle: profile.portfolioTitle || "",
          title: profile.title || "",
          shortBio: profile.shortBio || "",
          longBio: profile.longBio || "",
          profileImage: profile.profileImage || "",
          coverImage: profile.coverImage || "",
          email: profile.email || "",
          phone: profile.phone || "",
          location: profile.location || "",
          githubUrl: profile.githubUrl || "",
          linkedinUrl: profile.linkedinUrl || "",
          facebookUrl: profile.facebookUrl || "",
          instagramUrl: profile.instagramUrl || ""
        });
      }
    }).catch(() => undefined);
  };

  useEffect(() => {
    loadProfile();
  }, [form]);

  const submit = async (values: Values) => { try { await updateProfile(values); toast.success("Profile updated."); } catch { toast.error("Could not update profile."); } };
  const exportBackup = async () => {
    try {
      const data = await exportContentData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `hercodeherstory-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Content backup exported.");
    } catch {
      toast.error("Could not export content backup.");
    }
  };

  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      await importContentData(data);
      loadProfile();
      toast.success("Content backup imported.");
    } catch {
      toast.error("Could not import that backup file.");
    }
  };

  return <div><AdminPageTitle title="Profile settings" description="Update the public profile details shown across the site." /><div className="mb-6 grid max-w-5xl gap-3 rounded-lg border bg-background/60 p-4 md:grid-cols-[1fr_auto_auto]"><div><h2 className="font-bold">Frontend content backup</h2><p className="mt-1 text-sm text-muted-foreground">Move local admin edits between localhost and the deployed Vercel site.</p></div><Button type="button" variant="outline" onClick={exportBackup}><Download className="h-4 w-4" /> Export</Button><label className="inline-flex"><input className="sr-only" type="file" accept="application/json" onChange={(event) => importBackup(event.target.files?.[0])} /><span className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-muted"><Upload className="h-4 w-4" /> Import</span></label></div><form onSubmit={form.handleSubmit(submit)}><Card><CardContent className="grid max-w-5xl gap-4 p-5"><Input placeholder="Full name" {...form.register("fullName")} /><Input placeholder="Portfolio title" {...form.register("portfolioTitle")} /><Input placeholder="Professional title" {...form.register("title")} /><Textarea placeholder="Short bio" {...form.register("shortBio")} /><Controller name="longBio" control={form.control} render={({ field }) => <RichTextEditor value={field.value || ""} onChange={field.onChange} />} /><div className="grid gap-4 md:grid-cols-2"><Controller name="profileImage" control={form.control} render={({ field }) => <ImageUploader label="Profile image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /><Controller name="coverImage" control={form.control} render={({ field }) => <ImageUploader label="Cover image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /></div><div className="grid gap-4 md:grid-cols-2"><Input placeholder="Email" {...form.register("email")} /><Input placeholder="Phone" {...form.register("phone")} /><Input placeholder="Location" {...form.register("location")} /><Input placeholder="GitHub URL" {...form.register("githubUrl")} /><Input placeholder="LinkedIn URL" {...form.register("linkedinUrl")} /><Input placeholder="Facebook URL" {...form.register("facebookUrl")} /><Input placeholder="Instagram URL" {...form.register("instagramUrl")} /></div><Button className="w-fit">Save settings</Button></CardContent></Card></form></div>;
}
