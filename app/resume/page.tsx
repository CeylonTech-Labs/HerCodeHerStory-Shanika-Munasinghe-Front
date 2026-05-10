import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional summary, skills, education, experience and projects for Shanika Munasinghe."
};

const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Prisma", "MySQL", "REST APIs", "Cloudinary", "AI Learning", "Research"];

export default function ResumePage() {
  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Resume" title="Shanika Munasinghe" description="Software engineering student, AI learner and builder focused on practical full-stack products." />
          <Button asChild>
            <Link href="/Shanika-Munasinghe-CV.pdf">
              <Download className="h-4 w-4" />
              Download CV
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-black">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => <Badge key={skill} variant="outline">{skill}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-black">Education</h2>
                <p className="mt-3 font-semibold">Computer Science Undergraduate</p>
                <p className="text-sm text-muted-foreground">University journey focused on software engineering, AI learning, research and problem solving.</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-black">Professional summary</h2>
                <p className="mt-3 leading-8 text-muted-foreground">
                  Full-stack focused learner building modern web applications with clean interfaces, typed APIs and practical database design.
                  Interested in AI-assisted development, research-minded learning and user-centered digital products.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-black">Experience</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="font-semibold">Full-stack project work</p>
                    <p className="text-sm leading-6 text-muted-foreground">Designed and built personal, learning and portfolio systems using Next.js, Express, Prisma and MySQL.</p>
                  </div>
                  <div>
                    <p className="font-semibold">AI learning and experimentation</p>
                    <p className="text-sm leading-6 text-muted-foreground">Exploring AI tools, workflows and practical applications for learning, development and research.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-black">Selected projects</h2>
                <div className="mt-4 grid gap-3">
                  {["HerCodeHerStory", "AI learning experiments", "University project portfolio"].map((project) => (
                    <Link key={project} href="/projects" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted">
                      <span className="font-semibold">{project}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
