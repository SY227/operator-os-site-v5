import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { getSiteConfig } from "@/lib/content";

export default async function Footer() {
  const siteConfig = await getSiteConfig();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{siteConfig.name}</h3>
          <p className="mt-2 text-sm text-slate-600">Practical AI workflows for operators.</p>
          <p className="text-sm text-slate-600">OpenClaw-powered examples, not placeholder fluff.</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Navigate</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-600 hover:text-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-slate-600 hover:text-slate-900">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900">
                Support & Privacy Requests
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Newsletter</h4>
          <p className="mt-3 text-sm text-slate-600">{siteConfig.newsletter.description}</p>
          <NewsletterForm
            className="mt-3 flex gap-2"
            inputClassName="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            buttonClassName="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            placeholder={siteConfig.newsletter.placeholder}
            buttonLabel={siteConfig.newsletter.buttonLabel}
          />
        </div>
      </div>
    </footer>
  );
}
