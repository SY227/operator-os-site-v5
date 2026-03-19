import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Start Here",
  description: "Choose the best path: ideas, tools/templates, or implementation help.",
};

export default function StartHerePage() {
  return (
    <>
      <PageHero
        title="Start Here"
        subtitle="Pick the path that matches your stage. Keep it practical, ship one system at a time."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <article id="ideas" className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Path 1</p>
            <h2 className="mt-2 text-xl font-semibold">I want ideas</h2>
            <p className="mt-2 text-sm text-slate-600">Learn what to automate first and where AI workflows actually save time.</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Read blog playbooks</li>
              <li>• Review practical use cases</li>
              <li>• Pick one weekly workflow to systemize</li>
            </ul>
            <TrackedLink href="/blog" className="mt-4 inline-block text-sm font-semibold text-emerald-600">Go to Blog →</TrackedLink>
          </article>

          <article id="tools" className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Path 2</p>
            <h2 className="mt-2 text-xl font-semibold">I want templates/tools</h2>
            <p className="mt-2 text-sm text-slate-600">Use proven templates, SOP packs, and prompt kits to move faster this week.</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Browse starter systems</li>
              <li>• Download workflow templates</li>
              <li>• Apply SOP + review checklists</li>
            </ul>
            <TrackedLink href="/tools" className="mt-4 inline-block text-sm font-semibold text-emerald-600">Open Tools →</TrackedLink>
          </article>

          <article id="implementation" className="card border-emerald-200 bg-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Path 3</p>
            <h2 className="mt-2 text-xl font-semibold">I want help implementing AI systems</h2>
            <p className="mt-2 text-sm text-slate-700">Get support to design, configure, and operationalize your first AI workflow stack.</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Workflow scoping and priorities</li>
              <li>• SOP/prompt implementation</li>
              <li>• Human-review and QA boundaries</li>
            </ul>
            <TrackedLink href="/work-with-us" className="mt-4 inline-block text-sm font-semibold text-emerald-700">See implementation help →</TrackedLink>
          </article>
        </div>
      </section>
    </>
  );
}
