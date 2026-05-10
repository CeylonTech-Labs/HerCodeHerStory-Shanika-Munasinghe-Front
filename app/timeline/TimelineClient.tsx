"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Code2, GraduationCap, Plane, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import type { TimelineEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const iconFor = (category?: string | null) => {
  const lower = (category || "").toLowerCase();
  if (lower.includes("code") || lower.includes("project")) return Code2;
  if (lower.includes("university") || lower.includes("study")) return GraduationCap;
  if (lower.includes("travel")) return Plane;
  if (lower.includes("event")) return Sparkles;
  return CalendarHeart;
};

export function TimelineClient({ events }: { events: TimelineEvent[] }) {
  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Timeline" title="A vertical map of life chapters." description="Academic steps, projects, events, travels, lessons and meaningful moments." />
        {events.length ? (
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-5 top-0 h-full w-px bg-border md:left-1/2" />
            <div className="space-y-8">
              {events.map((event, index) => {
                const Icon = iconFor(event.category);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    className={`relative grid gap-5 md:grid-cols-2 ${index % 2 ? "md:text-left" : "md:text-right"}`}
                  >
                    <div className={index % 2 ? "md:col-start-2" : ""}>
                      <div className="glass-card ml-14 rounded-lg p-5 md:ml-0">
                        <p className="text-sm font-bold text-primary">{formatDate(event.eventDate)}</p>
                        <h3 className="mt-2 text-xl font-black">{event.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.description}</p>
                        {event.category ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{event.category}</p> : null}
                      </div>
                    </div>
                    <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary md:left-1/2 md:-translate-x-1/2">
                      <Icon className="h-5 w-5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState title="Timeline events will appear here" />
        )}
      </section>
    </PageShell>
  );
}
