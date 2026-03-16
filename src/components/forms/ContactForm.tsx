"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

type ContactFormProps = {
  initialTopic?: string;
};

export default function ContactForm({ initialTopic = "" }: ContactFormProps) {
  const pathname = usePathname();

  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    topic: initialTopic,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, sourcePath: pathname }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data?.error?.message ?? "Could not send message.");
        return;
      }

      setStatus("success");
      setMessage(data.warning ? `${data.message} (${data.warning})` : data.message ?? "Message sent.");
      setState((previous) => ({
        name: "",
        email: "",
        topic: previous.topic,
        message: "",
      }));
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form className="card space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          required
          value={state.name}
          onChange={(event) => setState((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          required
          type="email"
          value={state.email}
          onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Topic (optional)</label>
        <input
          value={state.topic}
          onChange={(event) => setState((prev) => ({ ...prev, topic: event.target.value }))}
          placeholder="Implementation support, product question, etc."
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea
          required
          rows={6}
          value={state.message}
          onChange={(event) =>
            setState((prev) => ({ ...prev, message: event.target.value }))
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Tell us about your workflow challenge and current setup."
        />
      </div>
      <button
        disabled={status === "loading"}
        className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white"
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {message && (
        <p className={`text-sm ${status === "success" ? "text-emerald-700" : "text-rose-700"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
