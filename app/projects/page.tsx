import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software engineering projects, tech stack, GitHub links and live demos."
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch {}
  return <ProjectsClient projects={projects} />;
}
