"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@aerovy/ui";
import { getFeaturedExperiences } from "@/lib/catalog";
import { ExperienceCard } from "../experience-card";
import { DealCountdown } from "@/components/deals/deal-countdown";

export function FeaturedSection() {
  const items = getFeaturedExperiences(6);

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
              Featured this month
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Hand-picked by our Abu Dhabi team.
            </h2>
            <p className="text-muted mt-4">
              Each experience is visited, priced and graded by locals — no tourist-trap surprises.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/experiences">
              View all 20
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </header>

        <p className="border-brand-primary/40 bg-brand-primary/10 mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
          <span className="animate-pulse" aria-hidden="true">
            ●
          </span>
          <DealCountdown hours={24} label="Flash offers end in:" />
        </p>

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {items.map((e, i) => (
            <motion.div
              key={e.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ExperienceCard experience={e} priority={i < 3} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
