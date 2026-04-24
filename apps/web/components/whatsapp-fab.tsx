"use client";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const waHref = `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi Aerovy, I'd like to ask about...",
  )}`;

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {open && (
        <div className="border-border bg-bg w-72 overflow-hidden rounded-2xl border shadow-xl">
          <div className="bg-brand-secondary text-bg p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Aerovy concierge</p>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-bg/70 hover:bg-bg/10 rounded-md p-1"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-bg/70 mt-1 text-xs">Avg reply · 4 min</p>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <p className="text-muted">Hi 👋 — how can we help?</p>
            <p className="bg-surface rounded-lg p-3">
              Booking a trip, pre-travel questions, supplier partnerships… we&rsquo;re on.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 font-medium text-white hover:opacity-90"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Open WhatsApp chat
            </a>
          </div>
        </div>
      )}

      {!open && showTooltip && (
        <div className="animate-in fade-in border-border bg-bg text-text rounded-full border px-3 py-1.5 text-xs shadow-md">
          Need help? Chat on WhatsApp
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open WhatsApp chat"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#25D366]/20 transition-transform hover:scale-105"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </button>
    </div>
  );
}
