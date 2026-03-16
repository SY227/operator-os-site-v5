import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "CogniFox builds practical intelligence systems for operators, consultants, founders, and small teams.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About CogniFox"
        subtitle="We build practical execution infrastructure for operators who are done with scattered workflows."
      />
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6 text-slate-700">
          <p>
            CogniFox helps solo operators, consultants, freelancers, founders, and lean teams run a
            consistent operating rhythm.
          </p>
          <p>
            Our approach blends structured publishing workflows, concrete project documentation,
            and AI-assisted execution patterns so you spend less time organizing work and more time
            shipping useful outcomes.
          </p>
          <p>
            Everything here is intentionally practical: clear tools, clear paths, and clear next
            actions.
          </p>
        </div>
      </section>
    </>
  );
}
