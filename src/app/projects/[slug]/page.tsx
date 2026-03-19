import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getProjectBySlug, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHero title={project.name} subtitle={project.summary} />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
        <article className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold">Who this is for</h2>
            <p className="mt-2 text-slate-700">{project.whoFor ?? "Operators running recurring, process-heavy work."}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold">Problem solved</h2>
            <p className="mt-2 text-slate-700">{project.problem}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold">Inputs required</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              {(project.inputsRequired ?? ["Source materials", "Workflow owner", "Review checklist"]).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold">Workflow</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-slate-700">
              {project.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="card border-emerald-200 bg-emerald-50">
            <h2 className="text-xl font-semibold">Outputs / business value</h2>
            <p className="mt-2 text-slate-700">{project.output}</p>
            <p className="mt-3 text-sm text-slate-700">Estimated time saved: {project.estimatedTimeSaved ?? "Varies by workflow maturity"}</p>
            <p className="mt-1 text-sm text-slate-700">Business value: {project.businessValue ?? "Faster execution and fewer dropped handoffs"}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold">What still requires human review</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              {project.humanReview.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold">Lessons and limitations</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              {project.lessons.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="card border-emerald-200 bg-emerald-50">
            <h3 className="text-lg font-semibold text-slate-900">Stack / Tools</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {project.stack.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-slate-900">What OpenClaw does</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {project.openclawRole.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-slate-900">Need this implemented?</h3>
            <p className="mt-2 text-sm text-slate-700">Get a scoped setup plan for your workflow, inputs, and review gates.</p>
            <TrackedLink
              href={`/contact?intent=Implementation%20help%20for%20${encodeURIComponent(project.name)}`}
              className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              eventPayload={{ projectSlug: project.slug, placement: "project-detail-implementation" }}
            >
              Request implementation help
            </TrackedLink>
          </div>
        </aside>
      </section>
    </>
  );
}
