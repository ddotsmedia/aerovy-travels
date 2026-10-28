"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import { MapPin, Heart, HelpCircle, Settings } from "lucide-react";
import { primaryNav } from "@/lib/site";

const QUICK_ACTIONS = [
  { label: "My Wishlist", href: "/wishlist", icon: Heart },
  { label: "Help", href: "/help", icon: HelpCircle },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

const EXPERIENCES = [
  { label: "Desert Safari", value: "desert-safari" },
  { label: "Ferrari Experience", value: "ferrari-experience" },
  { label: "Yacht Cruise", value: "yacht-cruise" },
  { label: "Cultural Tour", value: "cultural-tour" },
  { label: "Theme Parks", value: "theme-parks" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search experiences, pages, or actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Navigation */}
          <CommandGroup heading="Navigation">
            {primaryNav.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  runCommand(() => router.push(item.href));
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Experiences */}
          <CommandGroup heading="Experiences">
            {EXPERIENCES.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => {
                  runCommand(() => router.push(`/experiences/${item.value}`));
                }}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions">
            {QUICK_ACTIONS.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  runCommand(() => router.push(item.href));
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
