import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for CogniFox (cognifox.io).",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-slate-600">
        Effective date: March 2026. This policy explains what CogniFox collects, why it is
        collected, and how it is handled.
      </p>

      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold">1. Information we collect</h2>
          <p className="mt-2">
            We may collect contact information (such as name and email), message content submitted
            through forms, and lightweight analytics events related to site usage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. How information is used</h2>
          <p className="mt-2">
            Information is used to respond to inquiries, deliver requested resources, improve
            products/tools, and understand which site actions are most useful.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Data routing and storage</h2>
          <p className="mt-2">
            Form submissions may be routed to configured lead destinations (for example a webhook or
            CRM integration). If no persistent backend is configured, submissions may be logged in
            server logs only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Your choices</h2>
          <p className="mt-2">
            You can request removal of your contact information using the contact form on the
            <a href="/contact" className="ml-1 font-semibold text-emerald-700">Contact page</a>.
          </p>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <p className="text-sm font-semibold">Legal review required</p>
          <p className="mt-1 text-sm">
            This is interim production-safe starter copy and should be reviewed by legal counsel
            before final launch.
          </p>
        </section>
      </div>
    </section>
  );
}
