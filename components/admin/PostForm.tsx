"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { Category, Post } from "@/lib/types";
import { createPost, getApiErrorMessage, updatePost } from "@/lib/api";
import { slugify } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageUploader } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  categoryId: z.preprocess((value) => value === "" ? undefined : value, z.coerce.number().optional()),
  tagNames: z.string().optional(),
  mood: z.string().optional(),
  location: z.string().optional(),
  coverImage: z.string().optional(),
  videoUrl: z.string().optional(),
  content: z.string().min(1),
  isFeatured: z.boolean().default(false),
  allowComments: z.boolean().default(true),
  allowReactions: z.boolean().default(true),
  status: z.enum(["DRAFT", "PUBLISHED"])
});

type Values = z.infer<typeof schema>;

export function PostForm({ post, categories }: { post?: Post; categories: Category[] }) {
  const router = useRouter();
  const draftKey = post ? `post_draft_${post.id}` : "post_draft_create";
  const [galleryImages, setGalleryImages] = useState<string[]>(post?.media?.filter((item) => item.fileType === "IMAGE").map((item) => item.fileUrl) || []);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      categoryId: post?.categoryId || undefined,
      tagNames: post?.tags?.map((item) => item.tag.name).join(", ") || "",
      mood: post?.mood || "",
      location: post?.location || "",
      coverImage: post?.coverImage || "",
      videoUrl: post?.videoUrl || "",
      content: post?.content || "",
      isFeatured: post?.isFeatured || false,
      allowComments: post?.allowComments ?? true,
      allowReactions: post?.allowReactions ?? true,
      status: post?.status || "DRAFT"
    }
  });

  const values = form.watch();

  useEffect(() => {
    setGalleryImages(post?.media?.filter((item) => item.fileType === "IMAGE").map((item) => item.fileUrl) || []);
  }, [post]);

  useEffect(() => {
    const saved = window.localStorage.getItem(draftKey);
    if (!post && saved) form.reset(JSON.parse(saved));
  }, [draftKey, form, post]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.localStorage.setItem(draftKey, JSON.stringify(values));
    }, 900);
    return () => clearTimeout(timer);
  }, [draftKey, values]);

  const submit = async (values: Values) => {
    try {
      const payload = {
        ...values,
        categoryId: values.categoryId ? Number(values.categoryId) : null,
        tagNames: values.tagNames?.split(",").map((item) => item.trim()).filter(Boolean) || []
      };
      const savedPost = post ? await updatePost(post.id, payload) : await createPost(payload);
      window.localStorage.removeItem(draftKey);
      toast.success(post ? "Post updated." : "Post created.");
      if (savedPost) {
        router.push(post ? "/admin/posts" : `/admin/posts/edit/${savedPost.id}`);
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not save post."));
    }
  };

  const onInvalid = () => {
    const firstError = Object.values(form.formState.errors)[0]?.message;
    toast.error(firstError ? String(firstError) : "Please complete the required post fields.");
  };

  const registeredTitle = form.register("title");
  const resetDraft = () => {
    window.localStorage.removeItem(draftKey);
    form.reset({
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      categoryId: post?.categoryId || undefined,
      tagNames: post?.tags?.map((item) => item.tag.name).join(", ") || "",
      mood: post?.mood || "",
      location: post?.location || "",
      coverImage: post?.coverImage || "",
      videoUrl: post?.videoUrl || "",
      content: post?.content || "",
      isFeatured: post?.isFeatured || false,
      allowComments: post?.allowComments ?? true,
      allowReactions: post?.allowReactions ?? true,
      status: post?.status || "DRAFT"
    });
    toast.success("Saved draft cleared.");
  };

  return (
    <form onSubmit={form.handleSubmit(submit, onInvalid)} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Card><CardContent className="space-y-4 p-5">
          <Input placeholder="Title" {...registeredTitle} onChange={(event) => {
            registeredTitle.onChange(event);
            if (!post) form.setValue("slug", slugify(event.target.value), { shouldValidate: true, shouldDirty: true });
          }} />
          {form.formState.errors.title ? <p className="text-xs font-semibold text-destructive">{form.formState.errors.title.message}</p> : null}
          <Input placeholder="Slug" {...form.register("slug")} />
          {form.formState.errors.slug ? <p className="text-xs font-semibold text-destructive">{form.formState.errors.slug.message}</p> : null}
          <Textarea placeholder="Excerpt" {...form.register("excerpt")} />
          <Controller name="content" control={form.control} render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />} />
          {form.formState.errors.content ? <p className="text-xs font-semibold text-destructive">{form.formState.errors.content.message}</p> : null}
        </CardContent></Card>
      </div>
      <div className="space-y-6">
        <Card><CardContent className="space-y-4 p-5">
          <select className="h-11 w-full rounded-lg border bg-background px-3 text-sm" {...form.register("status")}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
          <select className="h-11 w-full rounded-lg border bg-background px-3 text-sm" {...form.register("categoryId")}>
            <option value="">No category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          <Input placeholder="Tags separated by commas" {...form.register("tagNames")} />
          <Input placeholder="Mood" {...form.register("mood")} />
          <Input placeholder="Location" {...form.register("location")} />
          <Input placeholder="Video URL" {...form.register("videoUrl")} />
          <Controller name="coverImage" control={form.control} render={({ field }) => <ImageUploader label="Cover image" value={field.value} onChange={(url) => field.onChange(url as string)} />} />
          {post ? (
            <ImageUploader
              label="Gallery images"
              multiple
              postId={post.id}
              value={galleryImages}
              onChange={(urls) => {
                setGalleryImages(Array.isArray(urls) ? urls : [urls]);
                toast.success("Gallery image uploaded and attached to this post.");
              }}
            />
          ) : (
            <p className="rounded-lg border p-3 text-xs text-muted-foreground">After saving, this page will open edit mode where you can attach gallery images to the story.</p>
          )}
          {(["isFeatured", "allowComments", "allowReactions"] as const).map((name) => (
            <label key={name} className="flex items-center gap-2 rounded-lg border p-3 text-sm font-semibold">
              <input type="checkbox" {...form.register(name)} />
              {name === "isFeatured" ? "Featured post" : name === "allowComments" ? "Allow comments" : "Allow reactions"}
            </label>
          ))}
          <div className="flex flex-wrap gap-2">
            <Button disabled={form.formState.isSubmitting}><Save className="h-4 w-4" /> Save</Button>
            <Button type="button" variant="outline" onClick={resetDraft}>Clear saved draft</Button>
            <Dialog>
              <DialogTrigger asChild><Button type="button" variant="outline"><Eye className="h-4 w-4" /> Preview</Button></DialogTrigger>
              <DialogContent className="max-w-4xl p-6">
                <DialogHeader><DialogTitle>{values.title || "Untitled preview"}</DialogTitle></DialogHeader>
                <div className="content-rich max-h-[70vh] overflow-auto" dangerouslySetInnerHTML={{ __html: values.content }} />
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-xs text-muted-foreground">Draft auto-saves locally while you edit.</p>
        </CardContent></Card>
      </div>
    </form>
  );
}
