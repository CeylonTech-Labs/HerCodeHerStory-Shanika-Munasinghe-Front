import type { Metadata } from "next";
import { getTimelineEvents } from "@/lib/api";
import type { TimelineEvent } from "@/lib/types";
import { TimelineClient } from "./TimelineClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Life timeline with academic, project, travel and personal growth events."
};

export default async function TimelinePage() {
  let events: TimelineEvent[] = [];
  try {
    events = await getTimelineEvents();
  } catch {}
  return <TimelineClient events={events} />;
}
