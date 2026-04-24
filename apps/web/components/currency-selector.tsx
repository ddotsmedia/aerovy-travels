"use client";
import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

const currencies = [
  { code: "AED", label: "AED · UAE Dirham" },
  { code: "USD", label: "USD · US Dollar" },
  { code: "EUR", label: "EUR · Euro" },
  { code: "GBP", label: "GBP · British Pound" },
  { code: "INR", label: "INR · Indian Rupee" },
  { code: "CNY", label: "CNY · Chinese Yuan" },
  { code: "RUB", label: "RUB · Russian Ruble" },
];

const KEY = "aerovy:currency";

export function CurrencySelector() {
  const [code, setCode] = useState("AED");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored) setCode(stored);
  }, []);

  function pick(next: string) {
    setCode(next);
    window.localStorage.setItem(KEY, next);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="border-border bg-bg hover:border-brand-primary flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <DollarSign className="text-muted size-3.5" aria-hidden="true" />
        {code}
      </button>
      {open && (
        <ul
          role="listbox"
          className="border-border bg-bg absolute right-0 mt-2 w-52 rounded-lg border p-1 text-sm shadow-lg"
        >
          {currencies.map((c) => (
            <li key={c.code}>
              <button
                onClick={() => pick(c.code)}
                className={`hover:bg-surface flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${
                  c.code === code ? "bg-brand-primary/10 font-medium" : ""
                }`}
              >
                <span>{c.label}</span>
                {c.code === code && <span className="text-brand-primary">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
