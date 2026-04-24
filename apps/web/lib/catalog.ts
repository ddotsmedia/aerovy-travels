// Re-exports the seed catalog as a static import so the web app can render
// real experience content without a live DB. Once P1-T07+ auth and a DB are
// wired, swap these consumers over to tRPC queries.
import { experiences, categories, type SeedExperience } from "@aerovy/db/prisma/seed-data";

export type Experience = SeedExperience;
export { categories, experiences };

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getExperiencesByCategory(categorySlug?: string): Experience[] {
  if (!categorySlug) return experiences;
  return experiences.filter((e) => e.categorySlug === categorySlug);
}

export function getFeaturedExperiences(limit = 6): Experience[] {
  return experiences.filter((e) => e.featured).slice(0, limit);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function fromPrice(e: Experience): number {
  return Math.min(...e.variants.map((v) => v.basePriceAED));
}

export function relatedExperiences(e: Experience, limit = 4): Experience[] {
  return experiences
    .filter((x) => x.slug !== e.slug && x.categorySlug === e.categorySlug)
    .slice(0, limit);
}
