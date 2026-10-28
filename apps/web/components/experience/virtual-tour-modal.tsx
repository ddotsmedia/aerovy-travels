"use client";

import { useEffect, useState } from "react";
import { PlayCircle, X } from "lucide-react";
import { Button } from "@aerovy/ui";

// Placeholder Abu Dhabi tourism video — swap for the real one.
const TOUR_EMBED = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export function VirtualTourModal({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <PlayCircle className="size-4" aria-hidden="true" />
        Virtual Preview
      </Button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Virtual preview: ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-bg relative w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-border flex items-center justify-between border-b px-4 py-3">
              <p className="line-clamp-1 text-sm font-semibold">{title}</p>
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setOpen(false)}
                className="hover:bg-surface rounded-md p-1"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={TOUR_EMBED}
                title={`Virtual preview: ${title}`}
                className="size-full"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
