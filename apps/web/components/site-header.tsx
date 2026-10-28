import Link from "next/link";
import { Button } from "@aerovy/ui";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";
import { CurrencySelector } from "./currency-selector";
import { LangToggle } from "./lang-toggle";
import { SiteNav } from "./site-nav";
import { MobileNav } from "./mobile-nav";
import { CartIconButton } from "./cart-icon-button";
import { Search, User } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-border bg-bg/80 supports-[backdrop-filter]:bg-bg/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0">
            <BrandLogo priority />
          </Link>

          <SiteNav />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <CurrencySelector />
          </div>
          <LangToggle />
          <button
            className="text-text hover:bg-surface group hidden h-10 w-10 items-center justify-center rounded-md md:flex"
            aria-label="Command palette (Cmd+K)"
            title="Press Cmd+K or Ctrl+K to open"
          >
            <Search className="aria-hidden size-4 group-hover:opacity-50" />
          </button>
          <CartIconButton />
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
