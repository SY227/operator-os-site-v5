import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ChatbotSandbox from "@/components/chatbot/ChatbotSandbox";
import { getChatbotFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chatbot Beta",
  description:
    "Beta preview of the content-grounded CogniFox assistant for blog, projects, and use-case navigation.",
};

export default async function ChatbotPage() {
  const faqs = await getChatbotFaq();

  return (
    <>
      <PageHero
        title="CogniFox Chatbot (Beta Preview)"
        subtitle="A scoped assistant for this site’s content — intentionally limited and not a universal AI assistant."
      />
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <article className="card">
              <h2 className="text-xl font-semibold text-slate-900">What this chatbot does right now</h2>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Answers questions about CogniFox blog posts, projects, and use cases</li>
                <li>• Helps visitors find relevant pages quickly</li>
                <li>• Uses seeded, content-grounded responses for this site only</li>
              </ul>
            </article>

            <article className="card border-amber-200 bg-amber-50">
              <h2 className="text-xl font-semibold text-amber-900">Beta status</h2>
              <p className="mt-2 text-amber-900/90">
                The live backend route (<code>/api/chatbot</code>) currently returns a 501 status by
                design while retrieval and moderation wiring are finalized. This page is an honest
                preview shell, not a fake full assistant.
              </p>
            </article>

            <ChatbotSandbox faqs={faqs} />
          </div>

          <aside className="card h-fit">
            <h3 className="text-lg font-semibold text-slate-900">Suggested questions</h3>
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
