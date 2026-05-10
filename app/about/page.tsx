import type { Metadata } from "next";
import { Brain, Code2, GraduationCap, Heart, Sparkles, Target } from "lucide-react";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "About Shanika Munasinghe, her academic journey, software engineering path, AI learning and goals."
};

const sections = [
  {
    icon: GraduationCap,
    title: "My academic journey",
    text: "University life is where discipline, curiosity and collaboration keep shaping how I think. I use this space to preserve the lessons behind the grades, projects and late-night study seasons."
  },
  {
    icon: Code2,
    title: "My software engineering journey",
    text: "I love building useful systems, learning patterns, improving user experiences and turning ideas into working products with care."
  },
  {
    icon: Brain,
    title: "My AI learning journey",
    text: "AI feels like a doorway into a new kind of creativity. I am learning the foundations, experimenting with tools and documenting what I discover."
  },
  {
    icon: Heart,
    title: "My values",
    text: "Kindness, consistency, courage, humility, good communication and becoming a person who can be trusted with meaningful work."
  },
  {
    icon: Target,
    title: "My future goals",
    text: "Grow as a strong software engineer, contribute to research-minded technical work, keep learning AI and build things that help people."
  },
  {
    icon: Sparkles,
    title: "Personal interests",
    text: "Travel, journaling, photography, meaningful conversations, campus moments, creative experiments and celebrating small wins."
  }
];

const skills = ["React", "Next.js", "TypeScript", "Node.js", "Express", "Prisma", "MySQL", "AI Tools", "Research", "UI Design", "Problem Solving", "Communication"];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle
          eyebrow="About"
          title="A personal space for becoming."
          description="HerCodeHerStory is where Shanika’s technical growth and human story sit side by side."
        />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardContent className="p-7">
              <h3 className="text-2xl font-black">Who I am</h3>
              <p className="mt-4 leading-8 text-muted-foreground">
                I am Shanika Munasinghe, a computer science undergraduate and builder learning to connect code,
                creativity, AI, research and real life. This platform is my living archive: projects, certificates,
                achievements, events, travel stories, study reflections and growth lessons.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-5">
                  <item.icon className="mb-4 h-6 w-6 text-primary" />
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
