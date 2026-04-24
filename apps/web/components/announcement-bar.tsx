"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

const KEY = "aerovy:announcement-dismissed-v1";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisible(window.localStorage.getItem(KEY) !== "1");
  }, []);

  if (!visible) return null;

  function dismiss() {
    window.localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  return (
    <div className="bg-brand-secondary text-bg relative">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-xs sm:text-sm">
        <Sparkles className="text-brand-primary size-3.5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">F1 Abu Dhabi Grand Prix packages —</span>{" "}
          <Link href="/events" className="hover:text-brand-primary underline underline-offset-2">
            now live, save up to 22%
          </Link>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-bg/70 hover:bg-bg/10 hover:text-bg absolute right-3 rounded-md p-1"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
