"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  createAchievement,
  createCertificate,
  createCategory,
  createProject,
  createTimelineEvent,
  getApiErrorMessage,
  updateAchievement,
  updateCertificate,
  updateCategory,
  updateProject,
  updateTimelineEvent
} from "@/lib/api";
import type { Achievement, Category, Certificate, Project, TimelineEvent } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageUploader } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";

const text = z.string().optional().nullable();

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: text,
  longDescription: text,
  techStack: text,
  githubUrl: text,
  liveUrl: text,
  coverImage: text,
  status: text,
  isFeatured: z.boolean().default(false)
});

export function ProjectForm({ item }: { item?: Project }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof projectSchema>>({ resolver: zodResolver(projectSchema), defaultValues: { title: item?.title || "", slug: item?.slug || "", description: item?.description || "", longDescription: item?.longDescription || "", techStack: item?.techStack || "", githubUrl: item?.githubUrl || "", liveUrl: item?.liveUrl || "", coverImage: item?.coverImage || "", status: item?.status || "", isFeatured: item?.isFeatured || false } });
  const submit = async (values: z.infer<typeof projectSchema>) => { try { item ? await updateProject(item.id, values) : await createProject(values); toast.success("Project saved."); router.push("/admin/projects"); } catch (error) { toast.error(getApiErrorMessage(error, "Could not save project.")); } };
  return <FormShell onSubmit={form.handleSubmit(submit)}><Input placeholder="Title" {...form.register("title")} onChange={(e) => { form.setValue("title", e.target.value); if (!item) form.setValue("slug", slugify(e.target.value)); }} /><Input placeholder="Slug" {...form.register("slug")} /><Textarea placeholder="Description" {...form.register("description")} /><Controller name="longDescription" control={form.control} render={({ field }) => <RichTextEditor value={field.value || ""} onChange={field.onChange} />} /><Input placeholder="Tech stack, comma separated" {...form.register("techStack")} /><Input placeholder="GitHub URL" {...form.register("githubUrl")} /><Input placeholder="Live URL" {...form.register("liveUrl")} /><Input placeholder="Status" {...form.register("status")} /><Controller name="coverImage" control={form.control} render={({ field }) => <ImageUploader label="Cover image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /><Check label="Featured project" register={form.register("isFeatured")} /><Button>Save project</Button></FormShell>;
}

const certificateSchema = z.object({ title: z.string().min(1), issuer: z.string().min(1), issuedDate: text, credentialUrl: text, certificateImage: text, description: text });
export function CertificateForm({ item }: { item?: Certificate }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof certificateSchema>>({ resolver: zodResolver(certificateSchema), defaultValues: { title: item?.title || "", issuer: item?.issuer || "", issuedDate: item?.issuedDate?.slice(0, 10) || "", credentialUrl: item?.credentialUrl || "", certificateImage: item?.certificateImage || "", description: item?.description || "" } });
  const submit = async (values: z.infer<typeof certificateSchema>) => { try { item ? await updateCertificate(item.id, values) : await createCertificate(values); toast.success("Certificate saved."); router.push("/admin/certificates"); } catch (error) { toast.error(getApiErrorMessage(error, "Could not save certificate.")); } };
  return <FormShell onSubmit={form.handleSubmit(submit)}><Input placeholder="Title" {...form.register("title")} /><Input placeholder="Issuer" {...form.register("issuer")} /><Input type="date" {...form.register("issuedDate")} /><Input placeholder="Credential URL" {...form.register("credentialUrl")} /><Controller name="certificateImage" control={form.control} render={({ field }) => <ImageUploader label="Certificate image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /><Textarea placeholder="Description" {...form.register("description")} /><Button>Save certificate</Button></FormShell>;
}

const achievementSchema = z.object({ title: z.string().min(1), description: text, date: text, category: text, imageUrl: text });
export function AchievementForm({ item }: { item?: Achievement }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof achievementSchema>>({ resolver: zodResolver(achievementSchema), defaultValues: { title: item?.title || "", description: item?.description || "", date: item?.date?.slice(0, 10) || "", category: item?.category || "", imageUrl: item?.imageUrl || "" } });
  const submit = async (values: z.infer<typeof achievementSchema>) => { try { item ? await updateAchievement(item.id, values) : await createAchievement(values); toast.success("Achievement saved."); router.push("/admin/achievements"); } catch (error) { toast.error(getApiErrorMessage(error, "Could not save achievement.")); } };
  return <FormShell onSubmit={form.handleSubmit(submit)}><Input placeholder="Title" {...form.register("title")} /><Textarea placeholder="Description" {...form.register("description")} /><Input type="date" {...form.register("date")} /><Input placeholder="Category" {...form.register("category")} /><Controller name="imageUrl" control={form.control} render={({ field }) => <ImageUploader label="Image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /><Button>Save achievement</Button></FormShell>;
}

const timelineSchema = z.object({ title: z.string().min(1), description: text, eventDate: text, category: text, imageUrl: text, icon: text });
export function TimelineForm({ item }: { item?: TimelineEvent }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof timelineSchema>>({ resolver: zodResolver(timelineSchema), defaultValues: { title: item?.title || "", description: item?.description || "", eventDate: item?.eventDate?.slice(0, 10) || "", category: item?.category || "", imageUrl: item?.imageUrl || "", icon: item?.icon || "" } });
  const submit = async (values: z.infer<typeof timelineSchema>) => { try { item ? await updateTimelineEvent(item.id, values) : await createTimelineEvent(values); toast.success("Timeline event saved."); router.push("/admin/timeline"); } catch (error) { toast.error(getApiErrorMessage(error, "Could not save timeline event.")); } };
  return <FormShell onSubmit={form.handleSubmit(submit)}><Input placeholder="Title" {...form.register("title")} /><Textarea placeholder="Description" {...form.register("description")} /><Input type="date" {...form.register("eventDate")} /><Input placeholder="Category" {...form.register("category")} /><Input placeholder="Icon name" {...form.register("icon")} /><Controller name="imageUrl" control={form.control} render={({ field }) => <ImageUploader label="Image" value={field.value} onChange={(url) => field.onChange(url as string)} />} /><Button>Save timeline event</Button></FormShell>;
}

const categorySchema = z.object({ name: z.string().min(1), slug: z.string().min(1), description: text, icon: text, color: text });
export function CategoryForm({ item, onDone }: { item?: Category; onDone?: () => void }) {
  const form = useForm<z.infer<typeof categorySchema>>({ resolver: zodResolver(categorySchema), defaultValues: { name: item?.name || "", slug: item?.slug || "", description: item?.description || "", icon: item?.icon || "", color: item?.color || "" } });
  const submit = async (values: z.infer<typeof categorySchema>) => { try { item ? await updateCategory(item.id, values) : await createCategory(values); toast.success("Category saved."); form.reset(); onDone?.(); } catch (error) { toast.error(getApiErrorMessage(error, "Could not save category.")); } };
  return <FormShell onSubmit={form.handleSubmit(submit)} compact><Input placeholder="Name" {...form.register("name")} onChange={(e) => { form.setValue("name", e.target.value); if (!item) form.setValue("slug", slugify(e.target.value)); }} /><Input placeholder="Slug" {...form.register("slug")} /><Textarea placeholder="Description" {...form.register("description")} /><Input placeholder="Icon" {...form.register("icon")} /><Input placeholder="Color" {...form.register("color")} /><Button>Save category</Button></FormShell>;
}

function FormShell({ children, onSubmit, compact = false }: { children: React.ReactNode; onSubmit: React.FormEventHandler<HTMLFormElement>; compact?: boolean }) {
  return <form onSubmit={onSubmit}><Card><CardContent className={`grid gap-4 p-5 ${compact ? "" : "max-w-4xl"}`}>{children}</CardContent></Card></form>;
}

function Check({ label, register }: { label: string; register: Record<string, unknown> }) {
  return <label className="flex items-center gap-2 rounded-lg border p-3 text-sm font-semibold"><input type="checkbox" {...register} />{label}</label>;
}
