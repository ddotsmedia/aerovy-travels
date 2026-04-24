import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceCard } from "@/components/experience-card";
import { SortSelect } from "@/components/sort-select";
import { categories, experiences } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Browse 200+ vetted experiences across Abu Dhabi.",
};

type SearchParams = Promise<{
  category?: string;
  q?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
}>;

function sortExperiences(list: typeof experiences, mode: string | undefined) {
  const price = (e: (typeof experiences)[number]) =>
    Math.min(...e.variants.map((v) => v.basePriceAED));
  const sorted = [...list];
  switch (mode) {
    case "price-asc":
      return sorted.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return sorted.sort((a, b) => price(b) - price(a));
    case "rating":
      return sorted.sort((a, b) => b.titleEn.length - a.titleEn.length);
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export default async function ExperiencesPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, q, sort } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  let filtered = experiences;
  if (category) filtered = filtered.filter((e) => e.categorySlug === category);
  if (query)
    filtered = filtered.filter(
      (e) =>
        e.titleEn.toLowerCase().includes(query) ||
        e.summaryEn.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query),
    );
  filtered = sortExperiences(filtered, sort);

  const activeCategory = category ? categories.find((c) => c.slug === category) : null;

  return (
    <>
      {/* Hero */}
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Experiences</span>
            {activeCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-text">{activeCategory.nameEn}</span>
              </>
            )}
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {activeCategory ? activeCategory.nameEn : "All experiences"}
          </h1>
          <p className="text-muted mt-2 max-w-2xl">
            {filtered.length} curated experience{filtered.length === 1 ? "" : "s"} in Abu Dhabi.
            Vetted by our team, flexible cancellation, instant booking.
          </p>

          <form action="/experiences" method="get" className="mt-6 flex max-w-xl gap-2">
            {category && <input type="hidden" name="category" value={category} />}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search by name, district, or theme..."
              className="border-border bg-bg text-text placeholder:text-muted focus-visible:ring-ring h-11 flex-1 rounded-md border px-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
            />
            <button
              type="submit"
              className="bg-brand-primary text-brand-secondary hover:bg-brand-accent rounded-md px-5 text-sm font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category chips + sort */}
      <section className="border-border bg-bg/90 sticky top-16 z-20 border-b backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href={q ? `/experiences?q=${encodeURIComponent(q)}` : "/experiences"}
              className={chipClass(!category)}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={
                  q
                    ? `/experiences?category=${c.slug}&q=${encodeURIComponent(q)}`
                    : `/experiences?category=${c.slug}`
                }
                className={chipClass(category === c.slug)}
              >
                {c.nameEn}
              </Link>
            ))}
          </div>
          <SortSelect />
          {/* `sort` read from URL by the select + main page; both happen server-side. */}
          <span className="sr-only">{sort ?? ""}</span>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="border-border bg-surface rounded-xl border py-20 text-center">
            <h2 className="text-xl font-semibold">No experiences match your search.</h2>
            <p className="text-muted mt-2">Try a different category or clear the search term.</p>
            <Link href="/experiences" className="text-brand-primary mt-6 inline-block font-medium">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <ExperienceCard key={e.slug} experience={e} priority={i < 3} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function chipClass(active: boolean) {
  return [
    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
    active
      ? "border-brand-primary bg-brand-primary text-brand-secondary"
      : "border-border bg-bg text-text hover:border-brand-primary",
  ].join(" ");
}
