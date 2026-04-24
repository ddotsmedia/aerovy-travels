import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@aerovy/ui";
import { getFeaturedExperiences } from "@/lib/catalog";
import { ExperienceCard } from "../experience-card";

export function FeaturedSection() {
  const items = getFeaturedExperiences(6);

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
              Featured this month
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Hand-picked by our Abu Dhabi team.
            </h2>
            <p className="text-muted mt-4">
              Each experience is visited, priced and graded by locals — no tourist-trap surprises.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/experiences">
              View all 20
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e, i) => (
            <ExperienceCard key={e.slug} experience={e} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
