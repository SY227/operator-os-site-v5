"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { trackClientEvent } from "@/lib/analytics/client";

type NewsletterFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonLabel?: string;
};

export default function NewsletterForm({
  className,
  inputClassName,
  buttonClassName,
  placeholder = "you@business.com",
  buttonLabel = "Join",
}: NewsletterFormProps) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          sourcePath: pathname,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data?.error?.message ?? "Signup failed. Please try again.");
        return;
      }

      trackClientEvent({
        name: "newsletter_submit",
        path: pathname,
      });

      setStatus("success");
      setMessage(data.warning ? `${data.message} (${data.warning})` : data.message ?? "Thanks for joining.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={className ?? "mt-5 flex max-w-xl flex-col gap-3 sm:flex-row"}
      >
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          className={
            inputClassName ??
            "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3"
          }
          aria-label="Email address"
        />
        <button
          disabled={status === "loading"}
          className={
            buttonClassName ??
            "rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400"
          }
        >
          {status === "loading" ? "Joining..." : buttonLabel}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-sm ${status === "success" ? "text-emerald-300" : "text-rose-300"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
