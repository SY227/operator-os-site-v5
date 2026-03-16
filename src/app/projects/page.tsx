import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real-world agent project examples showing workflow design, OpenClaw responsibilities, and human review boundaries.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        title="Agent Projects"
        subtitle="Concrete project examples with workflow details, stack choices, and honest limitations."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.slug} className="card flex flex-col">
              <h2 className="text-xl font-semibold text-slate-900">{project.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{project.summary}</p>
              <p className="mt-3 text-sm text-slate-700">Problem: {project.problem}</p>
              <TrackedLink
                href={`/projects/${project.slug}`}
                className="mt-auto pt-4 text-sm font-semibold text-emerald-600"
                eventPayload={{ projectSlug: project.slug, placement: "projects-index" }}
              >
                View project breakdown →
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
