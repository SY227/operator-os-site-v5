export default function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">{subtitle}</p>
    </section>
  );
}
