import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getTools } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tools",
  description: "Templates, SOPs, prompt kits, workflow packs, and starter systems for operators.",
};

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <>
      <PageHero
        title="Tools"
        subtitle="A practical library of templates, SOPs, prompt kits, workflow packs, and starter systems."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.slug} className="card flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{tool.category}</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{tool.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{tool.summary}</p>
              <p className="mt-2 text-xs text-slate-500">For: {tool.whoFor}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {tool.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-3 text-xs text-slate-500">Format: {tool.format}</div>
              <div className="mt-1 text-xs font-medium text-slate-700">Status: {tool.status}</div>
              <TrackedLink href={tool.ctaHref} className="mt-auto pt-4 text-sm font-semibold text-emerald-600">
                {tool.ctaLabel} →
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
