"use client";

import { useMemo, useState } from "react";

type ChatbotFaq = {
  id: string;
  question: string;
  answer: string;
  sourceHref: string;
};

type ChatbotSandboxProps = {
  faqs: ChatbotFaq[];
};

export default function ChatbotSandbox({ faqs }: ChatbotSandboxProps) {
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    const matched = faqs.find((item) =>
      item.question.toLowerCase().includes(normalized) ||
      item.answer.toLowerCase().includes(normalized),
    );

    return matched ?? {
      id: "no-match",
      question: "No direct match found",
      answer:
        "I do not have enough context from the seeded site content for that question yet. Try asking about blog posts, projects, or use cases, or use the Contact page for deeper help.",
      sourceHref: "/contact",
    };
  }, [query, faqs]);

  return (
    <div className="card">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Beta preview · FAQ-grounded</p>
      <p className="mt-2 text-sm text-slate-600">
        This preview searches seeded site answers only. For unresolved questions, use the Contact page.
      </p>
      <div className="mt-3">
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="chatbot-query">
          Ask about this site’s content
        </label>
        <input
          id="chatbot-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Example: What does OpenClaw do in project workflows?"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      {result && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">{result.question}</p>
          <p className="mt-2 text-sm text-slate-700">{result.answer}</p>
          <a href={result.sourceHref} className="mt-3 inline-block text-sm font-semibold text-emerald-700">
            View source page →
          </a>
        </div>
      )}
    </div>
  );
}
