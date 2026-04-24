"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@aerovy/ui";
import { primaryNav } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {open && (
        <div
          className="bg-bg/95 fixed inset-0 top-16 z-30 backdrop-blur lg:hidden"
          onClick={() => setOpen(false)}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 p-6" aria-label="Mobile">
            {primaryNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-text hover:bg-surface rounded-md px-3 py-3 text-base font-medium"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-border mt-3 flex flex-col gap-2 border-t pt-4">
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="text-text hover:bg-surface rounded-md px-3 py-3 text-base"
              >
                Sign in
              </Link>
              <Link
                href="/plan"
                onClick={() => setOpen(false)}
                className="bg-brand-primary text-brand-secondary hover:bg-brand-accent rounded-md px-3 py-3 text-center text-base font-medium"
              >
                Plan with AI
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
