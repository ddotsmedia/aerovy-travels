"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@aerovy/ui";

const order = ["light", "dark", "system"] as const;
type Mode = (typeof order)[number];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function next() {
    const current = (order.includes(theme as Mode) ? theme : "system") as Mode;
    const idx = order.indexOf(current);
    setTheme(order[(idx + 1) % order.length] as Mode);
  }

  const Icon = !mounted ? Sun : theme === "dark" ? Moon : theme === "system" ? Monitor : Sun;

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={next}>
      <Icon aria-hidden="true" />
    </Button>
  );
}
