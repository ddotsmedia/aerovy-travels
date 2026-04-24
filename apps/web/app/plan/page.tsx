import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Wand2, CalendarDays, Users, DollarSign, Heart } from "lucide-react";
import { Button, Input } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description: "Answer 4 questions, get a day-by-day Abu Dhabi itinerary drafted by Claude.",
};

export default function PlanPage() {
  return (
    <>
      <section className="bg-brand-secondary text-bg relative overflow-hidden">
        <div className="bg-brand-primary/20 pointer-events-none absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="bg-brand-primary/20 text-brand-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            AI Trip Planner · preview
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Tell us about your trip. We&rsquo;ll build the itinerary.
          </h1>
          <p className="text-bg/80 mt-4 max-w-2xl">
            Powered by Claude and grounded in our vetted catalog — every attraction, hotel, and
            transfer the AI suggests is actually bookable on Aerovy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <form
          action="/plan/draft"
          method="get"
          className="border-border bg-surface space-y-8 rounded-2xl border p-8"
        >
          <Field
            icon={CalendarDays}
            label="When are you visiting?"
            hint="Pick approximate dates — the AI can shift by a day or two to hit the best slots."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Input type="date" name="from" required />
              <Input type="date" name="to" required />
            </div>
          </Field>

          <Field
            icon={Users}
            label="Who&rsquo;s coming?"
            hint="Ages and party type help us match pacing and recommend kid-friendly options."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                type="number"
                name="adults"
                min={1}
                max={12}
                defaultValue={2}
                placeholder="Adults"
              />
              <Input
                type="number"
                name="kids"
                min={0}
                max={8}
                defaultValue={0}
                placeholder="Children"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Solo", "Couple", "Family", "Friends", "Business"].map((t) => (
                <label
                  key={t}
                  className="border-border has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/10 cursor-pointer rounded-full border px-3 py-1 text-sm"
                >
                  <input type="radio" name="tripType" value={t.toLowerCase()} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </Field>

          <Field
            icon={DollarSign}
            label="What&rsquo;s your daily budget per person?"
            hint="We&rsquo;ll tier hotels and experiences to match."
          >
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Comfort", range: "under AED 800" },
                { label: "Premium", range: "AED 800 – 2,000" },
                { label: "Luxury", range: "AED 2,000 – 5,000" },
                { label: "Ultra", range: "AED 5,000+" },
              ].map((b) => (
                <label
                  key={b.label}
                  className="border-border has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/10 flex cursor-pointer flex-col gap-1 rounded-lg border px-4 py-3 text-sm"
                >
                  <input
                    type="radio"
                    name="budget"
                    value={b.label.toLowerCase()}
                    className="sr-only"
                  />
                  <span className="font-medium">{b.label}</span>
                  <span className="text-muted text-xs">{b.range}</span>
                </label>
              ))}
            </div>
          </Field>

          <Field
            icon={Heart}
            label="What&rsquo;s your vibe?"
            hint="Pick all that apply. The AI weights the itinerary accordingly."
          >
            <div className="flex flex-wrap gap-2">
              {[
                "Culture & history",
                "Adventure",
                "Desert & nature",
                "Theme parks",
                "Fine dining",
                "Beach & wellness",
                "Nightlife",
                "Shopping",
                "Family-friendly",
              ].map((tag) => (
                <label
                  key={tag}
                  className="border-border has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/10 cursor-pointer rounded-full border px-3 py-1 text-sm"
                >
                  <input type="checkbox" name="interests" value={tag} className="sr-only" />
                  {tag}
                </label>
              ))}
            </div>
          </Field>

          <div className="border-border border-t pt-6">
            <Button size="lg" type="submit" fullWidth>
              <Wand2 className="size-4" aria-hidden="true" />
              Draft my itinerary
            </Button>
            <p className="text-muted mt-3 text-center text-xs">
              Takes ~20 seconds. No account required for the preview.
            </p>
          </div>
        </form>

        <div className="border-border mt-10 rounded-2xl border border-dashed p-8 text-center">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            Coming in Phase 2
          </p>
          <p className="text-muted mt-2">
            The planner ships live in P2-T02 with real Claude generation, schedule linking, and
            shareable itinerary pages. This form mocks the input surface today.
          </p>
          <Link
            href="/experiences"
            className="text-brand-primary mt-4 inline-block text-sm font-medium hover:underline"
          >
            Browse experiences instead →
          </Link>
        </div>
      </section>
    </>
  );
}

function Field({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: typeof Users;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="bg-brand-primary/10 text-brand-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base font-semibold">{label}</h2>
          {hint && <p className="text-muted text-sm">{hint}</p>}
        </div>
      </div>
      <div className="mt-4 pl-13 sm:pl-[52px]">{children}</div>
    </div>
  );
}
