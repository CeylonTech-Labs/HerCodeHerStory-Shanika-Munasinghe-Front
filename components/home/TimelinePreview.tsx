import { CalendarHeart } from "lucide-react";
import Link from "next/link";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import type { TimelineEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function TimelinePreview({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="container py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow="Timeline" title="Life in chapters" description="A quick look at meaningful events, memories, academic steps and growth moments." />
        <Button variant="outline" asChild><Link href="/timeline">View timeline</Link></Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="glass-card rounded-lg p-5">
            <CalendarHeart className="mb-4 h-6 w-6 text-primary" />
            <p className="text-sm font-bold text-primary">{formatDate(event.eventDate)}</p>
            <h3 className="mt-2 text-lg font-black">{event.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
