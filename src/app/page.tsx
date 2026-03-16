import type { Metadata } from "next";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { getBlogPosts, getProjects, getSiteConfig, getUseCases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "CogniFox shares practical AI workflows, agent project examples, and use cases curated for operators and small teams.",
};

export default async function Home() {
  const [siteConfig, blogPosts, projects, useCases] = await Promise.all([
    getSiteConfig(),
    getBlogPosts(),
    getProjects(),
    getUseCases(),
  ]);

  const featuredBlogSlugs = siteConfig.home?.featuredBlogSlugs ?? [];
  const featuredProjectSlugs = siteConfig.home?.featuredProjectSlugs ?? [];
  const featuredUseCaseSlugs = siteConfig.home?.featuredUseCaseSlugs ?? [];

  const featuredBlogPosts =
    featuredBlogSlugs.length > 0
      ? blogPosts.filter((post) => featuredBlogSlugs.includes(post.slug))
      : blogPosts.slice(0, 3);

  const featuredProjects =
    featuredProjectSlugs.length > 0
      ? projects.filter((project) => featuredProjectSlugs.includes(project.slug))
      : projects.slice(0, 3);

  const featuredUseCases =
    featuredUseCaseSlugs.length > 0
      ? useCases.filter((useCase) => featuredUseCaseSlugs.includes(useCase.slug))
      : useCases.slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            OpenClaw-powered operator workflows
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 text-lg text-slate-600">{siteConfig.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href="/projects"
              className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
              eventPayload={{ placement: "home-hero", destination: "/projects" }}
            >
              Explore Projects
            </TrackedLink>
            <TrackedLink
              href="/chatbot"
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
              eventPayload={{ placement: "home-hero", destination: "/chatbot" }}
            >
              Ask CogniFox
            </TrackedLink>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Blog posts with substance</p>
            <p className="mt-1 text-sm text-slate-600">Concrete workflows, tradeoffs, and lessons from real operations.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Agent projects with boundaries</p>
            <p className="mt-1 text-sm text-slate-600">What OpenClaw runs, what humans review, and what outputs look like.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Use cases for operators</p>
            <p className="mt-1 text-sm text-slate-600">Practical patterns for solo operators, founders, and small teams.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Content-grounded chatbot</p>
            <p className="mt-1 text-sm text-slate-600">Ask questions about this site’s content without fake all-knowing claims.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 text-center text-sm font-medium text-slate-700 sm:grid-cols-3 sm:px-6 lg:px-8">
          {siteConfig.trustBar.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <Section
        title="Featured blog posts"
        subtitle="A tight set of practical articles on OpenClaw workflows, automation boundaries, and execution systems."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredBlogPosts.map((post) => (
            <article key={post.slug} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {post.category} · {post.readTime}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <TrackedLink
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-600"
                eventPayload={{ blogSlug: post.slug, placement: "home-blog" }}
              >
                Read post →
              </TrackedLink>
            </article>
          ))}
        </div>
        <TrackedLink
          href="/blog"
          className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          eventPayload={{ placement: "home-blog", destination: "/blog" }}
        >
          View all blog posts
        </TrackedLink>
      </Section>

      <Section
        title="Featured agent projects"
        subtitle="Project breakdowns showing problem, workflow, tooling, OpenClaw role, and required human review."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="card">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{project.summary}</p>
              <p className="mt-3 text-sm text-slate-700">{project.problem}</p>
              <TrackedLink
                href={`/projects/${project.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-600"
                eventPayload={{ projectSlug: project.slug, placement: "home-projects" }}
              >
                View project →
              </TrackedLink>
            </article>
          ))}
        </div>
        <TrackedLink
          href="/projects"
          className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          eventPayload={{ placement: "home-projects", destination: "/projects" }}
        >
          Explore all projects
        </TrackedLink>
      </Section>

      <Section
        title="Practical use cases"
        subtitle="Workflow patterns you can adapt quickly for content, research, reporting, support, and internal operations."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredUseCases.map((useCase) => (
            <article key={useCase.slug} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{useCase.audience}</p>
              <h3 className="mt-2 text-lg font-semibold">{useCase.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{useCase.summary}</p>
              <TrackedLink
                href={`/use-cases/${useCase.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-600"
                eventPayload={{ useCaseSlug: useCase.slug, placement: "home-use-cases" }}
              >
                Read use case →
              </TrackedLink>
            </article>
          ))}
        </div>
      </Section>

      <section className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-2xl bg-slate-900 p-8 text-white lg:grid-cols-[2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ask the CogniFox chatbot</h2>
            <p className="mt-3 max-w-2xl text-slate-200">
              Get quick answers grounded in this site’s blog posts, projects, and use cases.
            </p>
            <TrackedLink
              href="/chatbot"
              className="mt-5 inline-block rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400"
              eventPayload={{ placement: "home-chatbot" }}
            >
              Open chatbot
            </TrackedLink>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Stay updated</h3>
            <NewsletterForm
              className="mt-4 flex flex-col gap-3"
              inputClassName="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3"
              buttonClassName="rounded-lg bg-white px-5 py-3 font-semibold text-slate-900"
              placeholder={siteConfig.newsletter.placeholder}
              buttonLabel={siteConfig.newsletter.buttonLabel}
            />
          </div>
        </div>
      </section>
    </>
  );
}
