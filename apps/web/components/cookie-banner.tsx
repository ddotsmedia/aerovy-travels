"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@aerovy/ui";

const KEY = "aerovy:cookie-consent-v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  function save(choice: "all" | "necessary") {
    window.localStorage.setItem(KEY, choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="border-border bg-bg/95 fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border p-5 shadow-xl backdrop-blur-lg sm:inset-x-auto sm:right-auto sm:left-5">
      <h2 className="text-sm font-semibold">Cookies help us improve your trip.</h2>
      <p className="text-muted mt-1 text-xs">
        We use strictly-necessary cookies to run the site. With your consent we also use analytics
        and marketing cookies. Read our{" "}
        <Link href="/cookies" className="underline">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => save("all")}>
          Accept all
        </Button>
        <Button size="sm" variant="outline" onClick={() => save("necessary")}>
          Only necessary
        </Button>
        <Link
          href="/cookies"
          className="text-muted hover:text-brand-primary inline-flex items-center px-3 py-1.5 text-xs"
        >
          Customise →
        </Link>
      </div>
    </div>
  );
}
