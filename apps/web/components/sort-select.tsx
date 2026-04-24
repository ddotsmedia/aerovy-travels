"use client";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
] as const;

export function SortSelect({ base = "/experiences" }: { base?: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function onChange(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "featured") next.set("sort", value);
    else next.delete("sort");
    const qs = next.toString();
    router.replace(qs ? `${base}?${qs}` : base);
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="sort" className="text-muted">
        Sort:
      </label>
      <select
        id="sort"
        value={params.get("sort") ?? "featured"}
        onChange={(e) => onChange(e.target.value)}
        className="border-border bg-bg focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
