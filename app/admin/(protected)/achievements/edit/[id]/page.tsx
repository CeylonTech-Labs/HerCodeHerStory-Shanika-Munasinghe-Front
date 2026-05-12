"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AchievementForm } from "@/components/admin/AchievementForm";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { getAchievements } from "@/lib/api";
import type { Achievement } from "@/lib/types";

export default function EditAchievementPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Achievement>();
  useEffect(() => { getAchievements().then((items) => setItem(items.find((x) => x.id === Number(id)))); }, [id]);
  return <><AdminPageTitle title="Edit achievement" />{item ? <AchievementForm item={item} /> : <p>Loading...</p>}</>;
}
