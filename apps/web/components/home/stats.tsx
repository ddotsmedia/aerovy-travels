const stats = [
  { value: "20K+", label: "Happy travelers" },
  { value: "200+", label: "Curated experiences" },
  { value: "4.9", label: "Avg. rating (out of 5)" },
  { value: "24/7", label: "Concierge on WhatsApp" },
];

export function Stats() {
  return (
    <section className="border-border bg-surface border-y">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-brand-primary text-3xl font-bold sm:text-4xl">{s.value}</p>
            <p className="text-muted mt-1 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
