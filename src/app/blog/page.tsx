import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Concrete articles on OpenClaw workflows, agent operations, and practical AI execution for operators.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const sorted = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Practical writing on AI workflows, operator systems, and what actually works in day-to-day execution."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <article key={post.slug} className="card flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {post.category} · {post.readTime}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <p className="mt-3 text-xs text-slate-500">Published {post.publishedAt}</p>
              <TrackedLink
                href={`/blog/${post.slug}`}
                className="mt-auto pt-4 text-sm font-semibold text-emerald-600"
                eventPayload={{ blogSlug: post.slug, placement: "blog-index" }}
              >
                Read post →
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
