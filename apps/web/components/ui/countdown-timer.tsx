"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export function CountdownTimer({
  endDate,
  label = "Offer ends in:",
  className,
}: {
  endDate: string | Date;
  label?: string;
  className?: string;
}) {
  const end = new Date(endDate).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Placeholder until mounted so server and client markup match.
  if (now === null) return <span className={className}>{label} --</span>;

  const diff = Math.max(0, end - now);
  if (diff === 0) return <span className={className}>{label} ended</span>;

  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {label} {d}d {pad(h)}h {pad(m)}m {pad(s)}s
    </span>
  );
}
