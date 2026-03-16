import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for CogniFox (cognifox.io).",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Terms of Use</h1>
      <p className="mt-4 text-slate-600">
        Effective date: March 2026. These terms govern use of the CogniFox website and resources.
      </p>

      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold">1. Educational + operational resources</h2>
          <p className="mt-2">
            Materials on this site are provided for implementation guidance. You are responsible for
            how you apply workflows and tools within your own business.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. No guaranteed outcomes</h2>
          <p className="mt-2">
            Results vary based on execution context. CogniFox does not guarantee specific revenue,
            productivity, or business outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Intellectual property</h2>
          <p className="mt-2">
            Unless otherwise noted, site content and templates are owned by CogniFox and may not be
            redistributed commercially without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Changes to terms</h2>
          <p className="mt-2">
            Terms may be updated periodically. Continued use of the site after updates constitutes
            acceptance of revised terms.
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
