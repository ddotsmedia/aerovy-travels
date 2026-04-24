import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { Prisma } from "@aerovy/db";
import { router, publicProcedure } from "../trpc";

/**
 * Shape returned from list/bySlug. Decimals are pre-converted to numbers
 * at the server boundary so the client type is simple and JSON-friendly.
 */
type DecimalLike = { toNumber: () => number };
const toNumber = (d: DecimalLike | number | null | undefined): number =>
  d == null ? 0 : typeof d === "number" ? d : d.toNumber();

const listInput = z
  .object({
    categorySlug: z.string().min(1).max(64).optional(),
    featured: z.boolean().optional(),
    take: z.number().int().min(1).max(60).default(12),
    skip: z.number().int().min(0).default(0),
    search: z.string().min(1).max(120).optional(),
  })
  .default({});

export const experienceRouter = router({
  categories: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.experienceCategory.findMany({
      orderBy: { nameEn: "asc" },
    });
  }),

  list: publicProcedure.input(listInput).query(async ({ ctx, input }) => {
    const where: Prisma.ExperienceWhereInput = {
      status: "PUBLISHED",
      ...(input.featured !== undefined ? { featured: input.featured } : {}),
      ...(input.categorySlug ? { category: { slug: input.categorySlug } } : {}),
      ...(input.search
        ? {
            OR: [
              { titleEn: { contains: input.search, mode: "insensitive" } },
              { titleAr: { contains: input.search } },
              { summaryEn: { contains: input.search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      ctx.prisma.experience.findMany({
        where,
        take: input.take,
        skip: input.skip,
        orderBy: [{ featured: "desc" }, { ratingAvg: "desc" }, { createdAt: "desc" }],
        include: {
          category: true,
          images: { orderBy: { order: "asc" }, take: 1 },
          variants: {
            orderBy: { basePriceAED: "asc" },
            take: 1,
            select: { id: true, basePriceAED: true },
          },
        },
      }),
      ctx.prisma.experience.count({ where }),
    ]);

    return {
      total,
      items: items.map((e) => ({
        id: e.id,
        slug: e.slug,
        titleEn: e.titleEn,
        titleAr: e.titleAr,
        summaryEn: e.summaryEn,
        summaryAr: e.summaryAr,
        durationMinutes: e.durationMinutes,
        location: e.location,
        featured: e.featured,
        ratingAvg: toNumber(e.ratingAvg),
        ratingCount: e.ratingCount,
        fromPriceAED: e.variants[0] ? toNumber(e.variants[0].basePriceAED) : null,
        category: { slug: e.category.slug, nameEn: e.category.nameEn, nameAr: e.category.nameAr },
        heroImage: e.images[0] ?? null,
      })),
    };
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(140) }))
    .query(async ({ ctx, input }) => {
      const exp = await ctx.prisma.experience.findFirst({
        where: { slug: input.slug, status: "PUBLISHED" },
        include: {
          category: true,
          images: { orderBy: { order: "asc" } },
          variants: {
            orderBy: { basePriceAED: "asc" },
            include: {
              schedules: {
                where: { startAt: { gte: new Date() } },
                orderBy: { startAt: "asc" },
                take: 20,
              },
            },
          },
        },
      });
      if (!exp) throw new TRPCError({ code: "NOT_FOUND" });

      return {
        ...exp,
        ratingAvg: toNumber(exp.ratingAvg),
        variants: exp.variants.map((v) => ({
          ...v,
          basePriceAED: toNumber(v.basePriceAED),
          schedules: v.schedules.map((s) => ({
            ...s,
            priceOverrideAED: s.priceOverrideAED ? toNumber(s.priceOverrideAED) : null,
          })),
        })),
      };
    }),
});
