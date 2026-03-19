import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Work With Us",
  description: "Implementation help for AI workflow setup, content systems, SOPs, and operator stack design.",
};

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        title="Work With Us"
        subtitle="Lightweight implementation help for teams turning AI workflows into reliable operations."
      />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="card">
            <h2 className="text-xl font-semibold">AI workflow setup</h2>
            <p className="mt-2 text-sm text-slate-600">Design and launch one or two high-leverage recurring workflows first.</p>
          </article>
          <article className="card">
            <h2 className="text-xl font-semibold">Content systems</h2>
            <p className="mt-2 text-sm text-slate-600">Build a repeatable planning, drafting, review, and publishing cadence.</p>
          </article>
          <article className="card">
            <h2 className="text-xl font-semibold">SOP + prompt implementation</h2>
            <p className="mt-2 text-sm text-slate-600">Turn informal habits into documented workflows with clear review checkpoints.</p>
          </article>
          <article className="card">
            <h2 className="text-xl font-semibold">Agent/business setup support</h2>
            <p className="mt-2 text-sm text-slate-600">Assistance for practical agent operations, intake flow, and escalation policies.</p>
          </article>
        </div>

        <div className="mt-6 card border-emerald-200 bg-emerald-50">
          <h3 className="text-lg font-semibold">How engagements usually start</h3>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-700">
            <li>Short discovery on current workflow and bottlenecks.</li>
            <li>Define one high-impact system and implementation scope.</li>
            <li>Launch with review gates and a concrete handoff checklist.</li>
          </ol>
          <TrackedLink href="/contact?intent=Implementation%20help" className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500">
            Request implementation help
          </TrackedLink>
        </div>

        <p className="mt-4 text-sm text-slate-500">Community/forum features may come later after demand and usage patterns are clear.</p>
      </section>
    </>
  );
}
