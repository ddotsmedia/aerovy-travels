import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Search, ArrowRight, Users } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flights",
  description: "Search flights to Abu Dhabi, Dubai, and beyond — best-rate guaranteed.",
};

const deals = [
  { from: "LHR", to: "AUH", airline: "Etihad", price: 2190, date: "Dep Mar 14", stops: "Non-stop" },
  { from: "BOM", to: "AUH", airline: "Etihad", price: 1280, date: "Dep Mar 12", stops: "Non-stop" },
  { from: "JFK", to: "AUH", airline: "Etihad", price: 4190, date: "Dep Apr 02", stops: "Non-stop" },
  { from: "SIN", to: "AUH", airline: "Etihad", price: 2440, date: "Dep Mar 20", stops: "Non-stop" },
  { from: "MOW", to: "AUH", airline: "Flydubai", price: 1620, date: "Dep Mar 18", stops: "1 stop" },
  { from: "PEK", to: "AUH", airline: "Etihad", price: 3210, date: "Dep Apr 08", stops: "Non-stop" },
];

export default function FlightsPage() {
  return (
    <>
      <section className="bg-brand-secondary text-bg relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-bg/70 mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Flights</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Plane className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">
              Flights · best-rate guaranteed
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Search flights to the UAE.
          </h1>
          <p className="text-bg/80 mt-2 max-w-2xl">
            300+ airlines, direct bookings, instant e-tickets. Meet-and-greet at AUH and DXB on
            every fare tier.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {["Return", "One-way", "Multi-city"].map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      i === 0
                        ? "bg-brand-primary text-brand-secondary"
                        : "border-border bg-bg text-text hover:border-brand-primary border"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <form
                action="/flights/results"
                className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
              >
                <label className="block">
                  <span className="text-muted text-xs font-medium">From</span>
                  <Input name="from" defaultValue="London (LHR)" className="mt-1" />
                </label>
                <label className="block">
                  <span className="text-muted text-xs font-medium">To</span>
                  <Input name="to" defaultValue="Abu Dhabi (AUH)" className="mt-1" />
                </label>
                <label className="block">
                  <span className="text-muted text-xs font-medium">Depart</span>
                  <Input type="date" name="depart" className="mt-1" />
                </label>
                <label className="block">
                  <span className="text-muted text-xs font-medium">Return</span>
                  <Input type="date" name="return" className="mt-1" />
                </label>
                <Button size="lg" type="submit" className="mt-5 lg:mt-6">
                  <Search className="size-4" aria-hidden="true" />
                  Search
                </Button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <Users className="text-muted size-4" aria-hidden="true" />
                  <select
                    name="pax"
                    className="border-border bg-bg rounded-md border px-2 py-1 text-sm"
                  >
                    <option>1 adult</option>
                    <option>2 adults</option>
                    <option>2 adults, 1 child</option>
                    <option>2 adults, 2 children</option>
                  </select>
                </label>
                <label className="flex items-center gap-2">
                  <select
                    name="class"
                    className="border-border bg-bg rounded-md border px-2 py-1 text-sm"
                  >
                    <option>Economy</option>
                    <option>Premium</option>
                    <option>Business</option>
                    <option>First</option>
                  </select>
                </label>
                <label className="text-muted ml-auto flex items-center gap-2">
                  <input type="checkbox" />
                  Flexible dates (±3 days)
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Today&rsquo;s lowest fares to Abu Dhabi
            </h2>
            <p className="text-muted mt-1 text-sm">
              Refreshed hourly from Etihad, Emirates, Flydubai, Air Arabia. Prices include taxes.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/flights/results">
              All routes
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </header>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => (
            <Card key={d.from} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="bg-brand-primary/10 text-brand-primary rounded-md px-2 py-1 font-mono text-xs">
                    {d.from}
                  </span>
                  <Plane className="text-muted size-4" aria-hidden="true" />
                  <span className="bg-brand-primary/10 text-brand-primary rounded-md px-2 py-1 font-mono text-xs">
                    {d.to}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium">
                  {d.airline} · {d.stops}
                </p>
                <p className="text-muted text-xs">{d.date} · return</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-muted text-xs">From</p>
                    <p className="text-xl font-bold">{fmtAED(d.price)}</p>
                  </div>
                  <Button size="sm">Select</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Why book flights with Aerovy</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Best-rate guarantee",
                d: "Find it cheaper within 24h, we match and credit the difference.",
              },
              {
                t: "Hold seats free for 24h",
                d: "On select fares — lock a price while you coordinate the rest of the trip.",
              },
              {
                t: "Bundle + save up to 18%",
                d: "Add a hotel or experience at checkout to unlock package pricing.",
              },
              {
                t: "Cancel for any reason",
                d: "Optional add-on · 72h free cancellation window on all fares.",
              },
            ].map((p) => (
              <div key={p.t} className="border-border bg-bg rounded-xl border p-5">
                <h3 className="font-semibold">{p.t}</h3>
                <p className="text-muted mt-2 text-sm">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
