import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  Users,
  CalendarCheck,
  TrendingUp,
  Star,
  Package as PackageIcon,
  BarChart3,
  Shield,
  Warehouse,
  ArrowUpRight,
} from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { experiences } from "@/lib/catalog";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = { title: "Admin · Dashboard", robots: { index: false } };

export default function AdminDashboard() {
  const kpis = [
    { label: "Revenue · this month", value: fmtAED(284_350), delta: "+18.4%", icon: DollarSign },
    { label: "Bookings · this month", value: "412", delta: "+9.2%", icon: CalendarCheck },
    { label: "Avg. order value", value: fmtAED(690), delta: "+4.1%", icon: TrendingUp },
    { label: "Active customers", value: "3,186", delta: "+220 this wk", icon: Users },
  ];

  const adminNav = [
    { href: "/admin", label: "Overview", icon: BarChart3, active: true },
    { href: "/admin/experiences", label: "Experiences", icon: Warehouse },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
    { href: "/admin/promos", label: "Promos", icon: PackageIcon },
    { href: "/admin/audit", label: "Audit log", icon: Shield },
  ];

  const topExperiences = experiences.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">Internal · admin</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Button variant="outline" size="sm">
          Last 30 days
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="space-y-1">
            {adminNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  l.active ? "bg-brand-primary/10 text-brand-primary" : "text-text hover:bg-surface"
                }`}
              >
                <l.icon className="size-4" aria-hidden="true" />
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardContent className="p-5">
                  <div className="text-muted flex items-center justify-between text-xs">
                    <span>{k.label}</span>
                    <k.icon className="text-brand-primary size-4" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">{k.value}</p>
                  <p className="text-success mt-1 inline-flex items-center gap-1 text-xs font-medium">
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                    {k.delta}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Two-up panels */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">Revenue · last 7 days</h2>
                <p className="text-muted text-xs">Booking revenue (AED)</p>
                <div className="mt-6 flex h-40 items-end gap-2">
                  {[32, 48, 36, 72, 58, 81, 64].map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="from-brand-primary/50 to-brand-primary w-full rounded-sm bg-gradient-to-t"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-muted text-xs">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">Top experiences · 30 days</h2>
                <ol className="mt-4 space-y-3 text-sm">
                  {topExperiences.map((e, i) => (
                    <li
                      key={e.slug}
                      className="border-border flex items-center justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="flex items-center gap-3">
                        <span className="bg-brand-primary/10 text-brand-primary flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="line-clamp-1 font-medium">{e.titleEn}</span>
                      </span>
                      <span className="text-muted text-right whitespace-nowrap">
                        {40 + (e.titleEn.length % 50)} bookings
                      </span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Recent bookings */}
          <Card>
            <CardContent className="p-0">
              <div className="border-border flex items-center justify-between border-b px-6 py-4">
                <h2 className="font-semibold">Recent bookings</h2>
                <Link
                  href="/admin/bookings"
                  className="text-brand-primary text-xs font-medium hover:underline"
                >
                  View all →
                </Link>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted text-left text-xs tracking-wide uppercase">
                    <th className="px-6 py-3">Ref</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Experience</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {[
                    { ref: "AER-4821", name: "Priya M.", idx: 0, status: "Confirmed", total: 850 },
                    {
                      ref: "AER-4820",
                      name: "Sebastian K.",
                      idx: 5,
                      status: "Confirmed",
                      total: 2200,
                    },
                    { ref: "AER-4819", name: "Layla T.", idx: 1, status: "Pending", total: 240 },
                    { ref: "AER-4818", name: "Ahmed R.", idx: 10, status: "Confirmed", total: 345 },
                    {
                      ref: "AER-4817",
                      name: "Jessica H.",
                      idx: 15,
                      status: "Cancelled",
                      total: 210,
                    },
                  ].map((b) => {
                    const exp = experiences[b.idx]?.titleEn ?? "—";
                    return (
                      <tr key={b.ref}>
                        <td className="px-6 py-4 font-mono text-xs">{b.ref}</td>
                        <td className="px-6 py-4">{b.name}</td>
                        <td className="text-muted px-6 py-4">{exp}</td>
                        <td className="px-6 py-4">
                          <span
                            className={[
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              b.status === "Confirmed" && "bg-success/15 text-success",
                              b.status === "Pending" && "bg-warning/15 text-warning",
                              b.status === "Cancelled" && "bg-danger/15 text-danger",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold">{fmtAED(b.total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="text-muted mt-10 text-center text-xs">
        Mock dashboard — real data + RBAC land in P1-T13. All figures fabricated.
      </p>
    </div>
  );
}
