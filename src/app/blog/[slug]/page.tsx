import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero title={post.title} subtitle={`${post.category} · ${post.readTime} · ${post.publishedAt}`} />
      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="card space-y-5">
          <p className="text-sm text-slate-600">{post.excerpt}</p>
          {post.body.map((paragraph) => (
            <p key={paragraph} className="text-slate-700">
              {paragraph}
            </p>
          ))}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-base font-semibold text-slate-900">Key takeaways</h2>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {post.keyTakeaways.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <TrackedLink
            href="/projects"
            className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            eventPayload={{ blogSlug: post.slug, placement: "blog-detail" }}
          >
            Explore related agent projects
          </TrackedLink>
        </div>
      </article>
    </>
  );
}
