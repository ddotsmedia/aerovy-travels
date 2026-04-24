/**
 * Seed runner — idempotent, safe to re-run.
 *
 *   pnpm db:seed
 *
 * Strategy: upsert categories first, then upsert experiences with nested
 * deletes+recreates of images/variants/schedules so repeated runs produce
 * a clean, deterministic state. Any curation change in `seed-data.ts`
 * lands at the next run.
 */
import { PrismaClient } from "../generated/client/index.js";
import { categories, experiences } from "./seed-data.js";

const prisma = new PrismaClient();

// Generate 4 upcoming schedules per variant (7, 14, 21, 28 days out, 09:00 UTC).
function futureSchedules(variantId: string, basePrice: number) {
  const now = new Date();
  const base = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 9));
  return [7, 14, 21, 28].map((offset) => ({
    variantId,
    startAt: new Date(base.getTime() + offset * 24 * 60 * 60 * 1000),
    capacity: 20,
    booked: 0,
    priceOverrideAED: offset === 7 ? basePrice * 0.9 : null, // early-bird discount on nearest slot
  }));
}

async function seedCategories() {
  for (const c of categories) {
    await prisma.experienceCategory.upsert({
      where: { slug: c.slug },
      update: { nameEn: c.nameEn, nameAr: c.nameAr },
      create: c,
    });
  }
  console.warn(`✓ ${categories.length} categories upserted`);
}

async function seedExperiences() {
  for (const e of experiences) {
    const category = await prisma.experienceCategory.findUniqueOrThrow({
      where: { slug: e.categorySlug },
    });

    const experience = await prisma.experience.upsert({
      where: { slug: e.slug },
      update: {
        categoryId: category.id,
        titleEn: e.titleEn,
        titleAr: e.titleAr,
        summaryEn: e.summaryEn,
        summaryAr: e.summaryAr,
        descriptionEn: e.descriptionEn,
        descriptionAr: e.descriptionAr,
        durationMinutes: e.durationMinutes,
        location: e.location,
        featured: e.featured,
        status: "PUBLISHED",
      },
      create: {
        slug: e.slug,
        categoryId: category.id,
        titleEn: e.titleEn,
        titleAr: e.titleAr,
        summaryEn: e.summaryEn,
        summaryAr: e.summaryAr,
        descriptionEn: e.descriptionEn,
        descriptionAr: e.descriptionAr,
        durationMinutes: e.durationMinutes,
        location: e.location,
        featured: e.featured,
        status: "PUBLISHED",
      },
    });

    // Replace images/variants/schedules wholesale for idempotency.
    await prisma.experienceImage.deleteMany({ where: { experienceId: experience.id } });
    await prisma.schedule.deleteMany({
      where: { variant: { experienceId: experience.id } },
    });
    await prisma.experienceVariant.deleteMany({ where: { experienceId: experience.id } });

    await prisma.experienceImage.createMany({
      data: e.images.map((img, order) => ({
        experienceId: experience.id,
        url: img.url,
        altEn: img.altEn,
        altAr: img.altAr,
        order,
      })),
    });

    for (const v of e.variants) {
      const variant = await prisma.experienceVariant.create({
        data: {
          experienceId: experience.id,
          nameEn: v.nameEn,
          nameAr: v.nameAr,
          basePriceAED: v.basePriceAED,
          maxPax: v.maxPax,
          includes: v.includes,
        },
      });
      await prisma.schedule.createMany({
        data: futureSchedules(variant.id, v.basePriceAED),
      });
    }
  }
  console.warn(`✓ ${experiences.length} experiences upserted (with images, variants, schedules)`);
}

async function main() {
  await seedCategories();
  await seedExperiences();
  console.warn("\nDone.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
