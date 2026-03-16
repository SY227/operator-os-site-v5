import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getUseCases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Practical AI use cases for operators, consultants, founders, freelancers, and small teams.",
};

export default async function UseCasesPage() {
  const useCases = await getUseCases();

  return (
    <>
      <PageHero
        title="Use Cases"
        subtitle="Practical workflow use cases with clear outcomes and clear human review boundaries."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <article key={useCase.slug} className="card flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{useCase.audience}</p>
              <h2 className="mt-2 text-lg font-semibold">{useCase.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{useCase.summary}</p>
              <TrackedLink
                href={`/use-cases/${useCase.slug}`}
                className="mt-auto pt-4 text-sm font-semibold text-emerald-600"
                eventPayload={{ useCaseSlug: useCase.slug, placement: "use-cases-index" }}
              >
                Read use case →
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
