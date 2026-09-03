import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAchievements } from "@/lib/api";
import type { Achievement } from "@/lib/types";
import { formatDate, imageFallback } from "@/lib/utils";
import { EmptyState } from "@/components/common/EmptyState";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Awards, achievements, activities and meaningful wins."
};

export default async function AchievementsPage() {
  let achievements: Achievement[] = [];
  try {
    achievements = await getAchievements();
  } catch {}

  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Achievements" title="Wins, awards and brave little milestones." />
        {achievements.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={achievement.imageUrl || imageFallback(achievement.title)} alt={achievement.title} fill className="object-cover" sizes="33vw" />
                </div>
                <CardContent className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {achievement.category ? <Badge>{achievement.category}</Badge> : null}
                    <Badge variant="outline">{formatDate(achievement.date)}</Badge>
                  </div>
                  <h3 className="text-xl font-black">{achievement.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState title="Achievements will appear here" />
        )}
      </section>
    </PageShell>
  );
}
