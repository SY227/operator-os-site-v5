import TrackedLink from "@/components/TrackedLink";
import { getSiteConfig } from "@/lib/content";

export default async function Header() {
  const siteConfig = await getSiteConfig();
  const cta = siteConfig.headerCta ?? { label: "Ask CogniFox", href: "/chatbot" };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <TrackedLink href="/" className="text-lg font-bold tracking-tight text-slate-900">
          {siteConfig.name}
        </TrackedLink>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <TrackedLink
          href={cta.href}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          eventPayload={{ placement: "header", destination: cta.href }}
        >
          {cta.label}
        </TrackedLink>
      </div>
    </header>
  );
}
