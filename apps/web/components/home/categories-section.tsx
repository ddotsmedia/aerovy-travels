import Link from "next/link";
import { categories, experiences } from "@/lib/catalog";
import {
  Landmark,
  Mountain,
  Rocket,
  Trees,
  UtensilsCrossed,
  Compass,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, typeof Landmark> = {
  cultural: Landmark,
  desert: Mountain,
  "theme-parks": Rocket,
  nature: Trees,
  dining: UtensilsCrossed,
  tours: Compass,
};

export function CategoriesSection() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            Explore by category
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pick the mood, we&rsquo;ll do the rest.
          </h2>
          <p className="text-muted mt-4">
            From Bedouin overnight camps to Louvre curator tours — six curated journeys across the
            emirate.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const Icon = iconMap[c.slug] ?? Compass;
            const count = experiences.filter((e) => e.categorySlug === c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/experiences?category=${c.slug}`}
                className="group border-border bg-surface hover:border-brand-primary relative overflow-hidden rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="bg-brand-primary/10 text-brand-primary flex size-12 items-center justify-center rounded-lg">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{c.nameEn}</h3>
                <p className="text-muted mt-1 text-sm">
                  {count} experience{count === 1 ? "" : "s"}
                </p>
                <span className="text-brand-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  Browse
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
