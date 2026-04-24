import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@aerovy/ui";
import { DesignSystemPreview } from "@/components/design-system-preview";
import { FeaturedExperiences } from "@/components/featured-experiences";
import type { Locale } from "@/lib/locales";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <section className="bg-bg relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-text mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg">{t("hero.subtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/experiences">{t("hero.ctaBrowse")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/plan">{t("hero.ctaPlan")}</Link>
            </Button>
          </div>
        </div>

        <div className="from-brand-accent/20 pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b to-transparent" />
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <header className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">{t("preview.sectionTitle")}</h2>
            <p className="text-muted mt-2">{t("preview.sectionSubtitle")}</p>
          </header>
          <FeaturedExperiences locale={locale as Locale} />
        </div>
      </section>

      <DesignSystemPreview />
    </>
  );
}
