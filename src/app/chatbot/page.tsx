import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ChatbotSandbox from "@/components/chatbot/ChatbotSandbox";
import { getChatbotFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Site Guide (Beta)",
  description:
    "Beta site guide for finding relevant CogniFox pages and content quickly.",
};

export default async function ChatbotPage() {
  const faqs = await getChatbotFaq();

  return (
    <>
      <PageHero
        title="Site Guide (Beta)"
        subtitle="A lightweight assistant for navigating this site’s content. Useful, but intentionally limited."
      />
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <article className="card">
              <h2 className="text-xl font-semibold text-slate-900">What this does now</h2>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Suggests relevant blog posts, tools, and project pages</li>
                <li>• Answers scoped questions about visible site content</li>
                <li>• Helps visitors navigate faster without overpromising capability</li>
              </ul>
            </article>

            <article className="card border-amber-200 bg-amber-50">
              <h2 className="text-xl font-semibold text-amber-900">Beta note</h2>
              <p className="mt-2 text-amber-900/90">
                This is still a beta surface. The backend route (<code>/api/chatbot</code>) remains intentionally limited while retrieval and moderation wiring are finalized.
              </p>
            </article>

            <ChatbotSandbox faqs={faqs} />
          </div>

          <aside className="card h-fit">
            <h3 className="text-lg font-semibold text-slate-900">Try asking</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {faqs.map((item) => (
                <li key={item.id}>• {item.question}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
