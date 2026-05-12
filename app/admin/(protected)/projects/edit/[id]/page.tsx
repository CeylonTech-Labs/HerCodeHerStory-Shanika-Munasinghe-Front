"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Project>();
  useEffect(() => { getProjects().then((items) => setItem(items.find((x) => x.id === Number(id)))); }, [id]);
  return <><AdminPageTitle title="Edit project" />{item ? <ProjectForm item={item} /> : <p>Loading...</p>}</>;
}
