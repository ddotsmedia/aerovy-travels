import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@aerovy/ui";

export default function LocalizedNotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">404</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="text-muted">{t("description")}</p>
      <Button asChild className="mt-2">
        <Link href="/">{t("cta")}</Link>
      </Button>
    </div>
  );
}
