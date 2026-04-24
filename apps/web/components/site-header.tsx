import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./brand-logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@aerovy/ui";

export function SiteHeader() {
  const t = useTranslations("nav");

  const links = [
    { href: "/experiences", label: t("experiences") },
    { href: "/hotels", label: t("hotels") },
    { href: "/transfers", label: t("transfers") },
    { href: "/plan", label: t("aiPlanner") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <header className="border-border bg-bg/80 supports-[backdrop-filter]:bg-bg/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <BrandLogo priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-text hover:text-brand-primary text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/signin">{t("signIn")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
