import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@aerovy/ui";
import { trpc } from "@/lib/trpc/server";

type Locale = "en" | "ar" | "hi" | "ru" | "zh";

function formatAED(n: number, locale: Locale) {
  const numberLocale = locale === "ar" ? "ar-AE" : locale === "hi" ? "hi-IN" : locale;
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
}

async function loadFeatured() {
  try {
    const { items } = await trpc.experience.list({ featured: true, take: 6 });
    return items;
  } catch (err) {
    // DB not connected yet (DATABASE_URL unset): fall back to placeholders.
    if (process.env.NODE_ENV === "development") {
      console.warn("experience.list failed — showing placeholders", err);
    }
    return null;
  }
}

export async function FeaturedExperiences({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const items = await loadFeatured();

  if (!items || items.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex min-h-52 items-center justify-center p-6 text-center">
              <div>
                <p className="text-brand-primary text-sm font-semibold">
                  {t("preview.placeholder")}
                </p>
                <p className="text-muted mt-1 text-sm">{t("preview.placeholderDescription")}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const isRtl = locale === "ar";

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e) => {
        const title = isRtl ? e.titleAr : e.titleEn;
        const summary = isRtl ? e.summaryAr : e.summaryEn;
        const categoryName = isRtl ? e.category.nameAr : e.category.nameEn;
        return (
          <Link
            key={e.id}
            href={`/experiences/${e.slug}`}
            className="focus-visible:ring-ring focus-visible:ring-offset-bg group block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
              <div className="bg-surface relative aspect-[4/3] overflow-hidden">
                {e.heroImage ? (
                  <Image
                    src={e.heroImage.url}
                    alt={isRtl ? e.heroImage.altAr : e.heroImage.altEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : null}
              </div>
              <CardContent className="p-5">
                <p className="text-brand-primary text-xs font-medium tracking-wide uppercase">
                  {categoryName}
                </p>
                <h3 className="mt-2 line-clamp-2 text-lg leading-tight font-semibold">{title}</h3>
                <p className="text-muted mt-2 line-clamp-2 text-sm">{summary}</p>
                {e.fromPriceAED !== null && (
                  <p className="mt-4 text-sm font-medium">
                    {t.rich("preview.fromPrice", {
                      price: formatAED(e.fromPriceAED, locale),
                      strong: (c) => <span className="text-text font-semibold">{c}</span>,
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
