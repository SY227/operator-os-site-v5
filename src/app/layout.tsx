import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsPageView from "@/components/analytics/AnalyticsPageView";
import { getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.seo.defaultTitle,
      template: siteConfig.seo.titleTemplate,
    },
    description: siteConfig.seo.defaultDescription,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: siteConfig.baseUrl,
      siteName: siteConfig.name,
      title: siteConfig.seo.defaultTitle,
      description: siteConfig.seo.defaultDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.seo.defaultTitle,
      description: siteConfig.seo.defaultDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <AnalyticsPageView />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
