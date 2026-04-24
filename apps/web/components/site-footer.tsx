import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <div className="text-muted mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>
          © {year} {t("site.name")}. {t("footer.rights")}
        </p>
        <p>{t("footer.made")}</p>
      </div>
    </footer>
  );
}
