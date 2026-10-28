"use client";

import { useState } from "react";
import { CountdownTimer } from "@/components/ui/countdown-timer";

// Deals refresh daily: each offer ends at the next UTC midnight, plus any extra days.
export function dealEndDate(hours: number) {
  const end = new Date();
  end.setUTCHours(24, 0, 0, 0);
  return new Date(end.getTime() + Math.max(0, hours - 24) * 3_600_000);
}

export function DealCountdown({
  hours,
  label,
  className,
}: {
  hours: number;
  label?: string;
  className?: string;
}) {
  const [endDate] = useState(() => dealEndDate(hours));
  return <CountdownTimer endDate={endDate} label={label} className={className} />;
}
