import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getUseCaseBySlug, getUseCases } from "@/lib/content";

export async function generateStaticParams() {
  const useCases = await getUseCases();
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlug(slug);

  if (!useCase) {
    return { title: "Use Case" };
  }

  return {
    title: useCase.title,
    description: useCase.summary,
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = await getUseCaseBySlug(slug);

  if (!useCase) {
    notFound();
  }

  return (
    <>
      <PageHero title={useCase.title} subtitle={useCase.summary} />
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <article className="card">
            <h2 className="text-xl font-semibold">Audience</h2>
            <p className="mt-2 text-slate-700">{useCase.audience}</p>
          </article>

          <article className="card">
            <h2 className="text-xl font-semibold">Challenge</h2>
            <p className="mt-2 text-slate-700">{useCase.challenge}</p>
          </article>

          <article className="card">
            <h2 className="text-xl font-semibold">Workflow</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-slate-700">
              {useCase.workflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>

          <article className="card border-emerald-200 bg-emerald-50">
            <h2 className="text-xl font-semibold">Outcomes</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              {useCase.outcomes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2 className="text-xl font-semibold">What OpenClaw does</h2>
            <p className="mt-2 text-slate-700">{useCase.openclawRole}</p>
            <h3 className="mt-5 text-lg font-semibold">What still needs human review</h3>
            <p className="mt-2 text-slate-700">{useCase.humanReview}</p>
          </article>

          <TrackedLink
            href="/chatbot"
            className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            eventPayload={{ useCaseSlug: useCase.slug, placement: "use-case-detail" }}
          >
            Ask CogniFox about this workflow
          </TrackedLink>
        </div>
      </section>
    </>
  );
}
