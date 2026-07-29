"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";
import { ProjectsClient } from "./ProjectsClient";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const next = await getProjects();
        if (active) setProjects(next);
      } catch {
        if (active) setProjects([]);
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

  return <ProjectsClient projects={projects} />;
}
