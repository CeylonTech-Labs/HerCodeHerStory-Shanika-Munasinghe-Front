"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { getProfile, updateProfile } from "@/lib/api";

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
  useEffect(() => {
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
  }, [form]);
  const submit = async (values: Values) => { try { await updateProfile(values); toast.success("Profile updated."); } catch { toast.error("Could not update profile."); } };
  return <div><AdminPageTitle title="Profile settings" description="Update the public profile details shown across the site." /><form onSubmit={form.handleSubmit(submit)}><Card><CardContent className="grid max-w-5xl gap-4 p-5"><Input placeholder="Full name" {...form.register("fullName")} /><Input placeholder="Portfolio title" {...form.register("portfolioTitle")} /><Input placeholder="Professional title" {...form.register("title")} /><Textarea placeholder="Short bio" {...form.register("shortBio")} /><Controller name="longBio" control={form.control} render={({ field }) => <RichTextEditor value={field.value || ""} onChange={field.onChange} />} /><div className="grid gap-4 md:grid-cols-2"><Controller name="profileImage" control={form.control} render={({ field }) => <ImageUploader label="Profile image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /><Controller name="coverImage" control={form.control} render={({ field }) => <ImageUploader label="Cover image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /></div><div className="grid gap-4 md:grid-cols-2"><Input placeholder="Email" {...form.register("email")} /><Input placeholder="Phone" {...form.register("phone")} /><Input placeholder="Location" {...form.register("location")} /><Input placeholder="GitHub URL" {...form.register("githubUrl")} /><Input placeholder="LinkedIn URL" {...form.register("linkedinUrl")} /><Input placeholder="Facebook URL" {...form.register("facebookUrl")} /><Input placeholder="Instagram URL" {...form.register("instagramUrl")} /></div><Button className="w-fit">Save settings</Button></CardContent></Card></form></div>;
}
