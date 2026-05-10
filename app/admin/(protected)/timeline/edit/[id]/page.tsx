"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { TimelineForm } from "@/components/admin/TimelineForm";
import { getTimelineEvents } from "@/lib/api";
import type { TimelineEvent } from "@/lib/types";

export default function EditTimelinePage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<TimelineEvent>();
  useEffect(() => { getTimelineEvents().then((items) => setItem(items.find((x) => x.id === Number(id)))); }, [id]);
  return <><AdminPageTitle title="Edit timeline event" />{item ? <TimelineForm item={item} /> : <p>Loading...</p>}</>;
}
