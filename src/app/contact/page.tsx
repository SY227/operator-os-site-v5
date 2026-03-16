import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CogniFox for implementation questions, partnerships, and privacy/support requests.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;

  return (
    <>
      <PageHero title="Contact" subtitle="Questions, partnerships, implementation help, or privacy/support requests." />
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <ContactForm initialTopic={intent ?? ""} />
      </section>
    </>
  );
}
