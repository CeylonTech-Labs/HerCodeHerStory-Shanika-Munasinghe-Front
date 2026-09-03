import { Github, Rocket } from "lucide-react";
import Link from "next/link";
import { AnimatedCard } from "@/components/common/AnimatedCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/lib/types";

export function ProjectHighlights({ projects }: { projects: Project[] }) {
  return (
    <section className="container py-14">
      <SectionTitle eyebrow="Builds" title="Project highlights" description="Software ideas, experiments and polished builds from Shanika's developer journey." />
      {projects.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <AnimatedCard key={project.id} delay={index * 0.05}>
              <Card className="h-full">
                <CardContent className="p-5">
                  {project.isFeatured ? <Badge className="mb-4">Featured</Badge> : null}
                  <h3 className="text-xl font-black">{project.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(project.techStack || "").split(",").filter(Boolean).slice(0, 5).map((tech) => (
                      <Badge key={tech.trim()} variant="outline">{tech.trim()}</Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    {project.githubUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.githubUrl}><Github className="h-4 w-4" /> GitHub</Link>
                      </Button>
                    ) : null}
                    {project.liveUrl ? (
                      <Button size="sm" asChild>
                        <Link href={project.liveUrl}><Rocket className="h-4 w-4" /> Live</Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      ) : (
        <EmptyState title="Projects will shine here" />
      )}
    </section>
  );
}
