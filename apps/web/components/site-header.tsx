import Link from "next/link";
import { Button } from "@aerovy/ui";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";
import { primaryNav } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { Search, ShoppingBag, User } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-border bg-bg/80 supports-[backdrop-filter]:bg-bg/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0">
            <BrandLogo priority />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {primaryNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text/80 hover:text-brand-primary text-sm font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/experiences"
            className="text-text hover:bg-surface hidden h-10 w-10 items-center justify-center rounded-md md:flex"
            aria-label="Search experiences"
          >
            <Search className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            className="text-text hover:bg-surface hidden h-10 w-10 items-center justify-center rounded-md md:flex"
            aria-label="Cart"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/signin">
              <User className="size-4" aria-hidden="true" />
              <span>Sign in</span>
            </Link>
          </Button>
          <Button size="sm" asChild className="hidden md:inline-flex">
            <Link href="/plan">Plan with AI</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
