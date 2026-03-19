import type { Metadata } from "next";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { getBlogPosts, getProjects, getSiteConfig, getTools, getUseCases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Plug-and-play AI operating systems for solo operators and lean teams: practical workflows, tools, proof assets, and implementation support.",
};

export default async function Home() {
  const [siteConfig, blogPosts, projects, useCases, tools] = await Promise.all([
    getSiteConfig(),
    getBlogPosts(),
    getProjects(),
    getUseCases(),
    getTools(),
  ]);

  const featuredBlogPosts = blogPosts.filter((post) =>
    (siteConfig.home?.featuredBlogSlugs ?? []).includes(post.slug),
  );
  const featuredProjects = projects.filter((project) =>
    (siteConfig.home?.featuredProjectSlugs ?? []).includes(project.slug),
  );
  const featuredUseCases = useCases.filter((useCase) =>
    (siteConfig.home?.featuredUseCaseSlugs ?? []).includes(useCase.slug),
  );
  const featuredTools = tools.filter((tool) =>
    (siteConfig.home?.featuredToolSlugs ?? []).includes(tool.slug),
  );

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Practical AI operator systems
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Plug-and-play AI workflows that turn messy work into repeatable systems.
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            CogniFox helps solo operators and lean teams ship consistent outputs using practical
            workflows, templates, and implementation support — with clear human review boundaries.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href="/start-here"
              className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
              eventPayload={{ placement: "home-hero", destination: "/start-here" }}
            >
              Start Here
            </TrackedLink>
            <TrackedLink
              href="/tools"
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
              eventPayload={{ placement: "home-hero", destination: "/tools" }}
            >
              Browse Tools
            </TrackedLink>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Systemized workflows</p>
            <p className="mt-1 text-sm text-slate-600">Recurring operator tasks with defined inputs, outputs, and owners.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Tooling you can use now</p>
            <p className="mt-1 text-sm text-slate-600">Templates, SOPs, and prompt kits built for real operating loops.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Proof over promises</p>
            <p className="mt-1 text-sm text-slate-600">Project pages show what was automated, what stayed human, and why.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-slate-900">Implementation path</p>
            <p className="mt-1 text-sm text-slate-600">From self-serve playbooks to done-with-you AI workflow setup.</p>
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

      <Section title="Start Here" subtitle="Choose your path based on what you need right now.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "I want ideas",
              body: "Read practical blog posts and use cases to identify what to automate first.",
              href: "/start-here#ideas",
            },
            {
              title: "I want templates/tools",
              body: "Get SOP packs, templates, and prompt kits you can apply this week.",
              href: "/start-here#tools",
            },
            {
              title: "I want help implementing",
              body: "Use Work With Us to scope and launch your first AI operator system.",
              href: "/start-here#implementation",
            },
          ].map((path) => (
            <article key={path.title} className="card">
              <h3 className="text-lg font-semibold text-slate-900">{path.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{path.body}</p>
              <TrackedLink href={path.href} className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                Follow this path →
              </TrackedLink>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Featured blog / playbooks" subtitle="Concrete writing you can apply directly.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredBlogPosts.map((post) => (
            <article key={post.slug} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {post.category} · {post.readTime}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <TrackedLink href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                Read playbook →
              </TrackedLink>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Featured tools / templates" subtitle="The beginning of a practical product ladder.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <article key={tool.slug} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{tool.category}</p>
              <h3 className="mt-2 text-lg font-semibold">{tool.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{tool.summary}</p>
              <p className="mt-3 text-xs text-slate-500">{tool.format}</p>
              <TrackedLink href={tool.ctaHref} className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                {tool.ctaLabel} →
              </TrackedLink>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Featured projects / use cases" subtitle="Proof assets showing workflow and business value.">
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.slice(0, 2).map((project) => (
            <article key={project.slug} className="card">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{project.summary}</p>
              <p className="mt-2 text-sm text-slate-700">Estimated time saved: {project.estimatedTimeSaved ?? "Varies by workflow"}</p>
              <TrackedLink href={`/projects/${project.slug}`} className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                View proof asset →
              </TrackedLink>
            </article>
          ))}
          {featuredUseCases.slice(0, 2).map((useCase) => (
            <article key={useCase.slug} className="card">
              <h3 className="text-lg font-semibold">{useCase.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{useCase.summary}</p>
              <p className="mt-2 text-sm text-slate-700">For: {useCase.audience}</p>
              <TrackedLink href={`/use-cases/${useCase.slug}`} className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                Read use case →
              </TrackedLink>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Why CogniFox / how it works" subtitle="A practical operating model.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Define one recurring workflow with clear inputs and outputs.",
            "Use OpenClaw to run repetitive execution steps and generate drafts.",
            "Keep explicit human review where judgment, risk, or strategy is involved.",
          ].map((line) => (
            <article key={line} className="card text-sm text-slate-700">{line}</article>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="card border-emerald-200 bg-emerald-50">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Need implementation help?</h2>
          <p className="mt-2 max-w-3xl text-slate-700">
            We can help set up your first workflow system, define SOPs, and launch a repeatable cadence.
          </p>
          <TrackedLink href="/work-with-us" className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500">
            See implementation options
          </TrackedLink>
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-2xl bg-slate-900 p-8 text-white lg:grid-cols-[2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Operator AI Stack Starter Kit</h2>
            <p className="mt-3 max-w-2xl text-slate-200">
              Get “7 AI workflows every solo operator should systemize” plus starter templates and SOP checklists.
            </p>
            <p className="mt-3 text-sm text-slate-300">Bonus: the Site Guide (Beta) is available if you want quick content navigation.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Get the kit</h3>
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
