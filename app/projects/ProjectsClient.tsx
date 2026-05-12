"use client";

import { Github, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Project } from "@/lib/types";
import { imageFallback } from "@/lib/utils";

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));

  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Projects" title="Builds, experiments and portfolio work." description="Featured projects appear first, with stack details and links." />
        {sorted.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <button className="group overflow-hidden rounded-lg border bg-background/70 text-left shadow-sm transition hover:-translate-y-1">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={project.coverImage || imageFallback(project.title)} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="33vw" />
                    </div>
                    <div className="p-5">
                      {project.isFeatured ? <Badge className="mb-3">Featured</Badge> : null}
                      <h3 className="text-xl font-black">{project.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(project.techStack || "").split(",").filter(Boolean).slice(0, 5).map((tech) => <Badge key={tech} variant="outline">{tech.trim()}</Badge>)}
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={project.coverImage || imageFallback(project.title)} alt={project.title} fill className="object-cover" sizes="80vw" />
                  </div>
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.longDescription || project.description}</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-wrap gap-2 px-6 pb-6">
                    {project.githubUrl ? <Button variant="outline" asChild><Link href={project.githubUrl}><Github className="h-4 w-4" /> GitHub</Link></Button> : null}
                    {project.liveUrl ? <Button asChild><Link href={project.liveUrl}><Rocket className="h-4 w-4" /> Live demo</Link></Button> : null}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <EmptyState title="Projects are coming soon" />
        )}
      </section>
    </PageShell>
  );
}
