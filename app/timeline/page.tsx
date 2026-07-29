"use client";

import { useEffect, useState } from "react";
import { getTimelineEvents } from "@/lib/api";
import type { TimelineEvent } from "@/lib/types";
import { TimelineClient } from "./TimelineClient";

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const next = await getTimelineEvents();
        if (active) setEvents(next);
      } catch {
        if (active) setEvents([]);
      }
    };

    load();
    const onContentUpdated = () => {
      load();
    };

    window.addEventListener("hercodeherstory-content-updated", onContentUpdated);
    return () => {
      active = false;
      window.removeEventListener("hercodeherstory-content-updated", onContentUpdated);
    };
  }, []);

  return <TimelineClient events={events} />;
}
