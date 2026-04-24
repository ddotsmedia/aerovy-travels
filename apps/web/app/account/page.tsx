import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Heart, MapPin, Receipt, Settings, User, PlusCircle, Clock } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-muted text-sm">Welcome back</p>
          <h1 className="text-3xl font-bold tracking-tight">Hi, Sarah 👋</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/account/settings">
            <Settings className="size-4" aria-hidden="true" />
            Settings
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="space-y-1">
            {[
              { href: "/account", label: "Overview", icon: User, active: true },
              { href: "/account/bookings", label: "My bookings", icon: Calendar },
              { href: "/account/wishlist", label: "Wishlist", icon: Heart },
              { href: "/account/invoices", label: "Invoices", icon: Receipt },
              { href: "/account/settings", label: "Settings", icon: Settings },
            ].map((l) => (
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
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Upcoming trips" value="0" icon={Calendar} />
            <Stat label="Experiences booked" value="0" icon={MapPin} />
            <Stat label="Wishlist items" value="3" icon={Heart} />
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="text-muted mx-auto size-10" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold">No upcoming trips yet</h2>
              <p className="text-muted mt-1 text-sm">
                Your first booking will show up here. Start exploring the catalog or ask our AI to
                draft something.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button asChild>
                  <Link href="/experiences">
                    <PlusCircle className="size-4" aria-hidden="true" />
                    Browse experiences
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/plan">Plan with AI</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Recent activity</h2>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  { time: "2h ago", text: "Added Louvre Abu Dhabi to wishlist" },
                  { time: "1d ago", text: "Viewed Liwa desert overnight safari" },
                  { time: "3d ago", text: "Signed up with magic link" },
                ].map((a) => (
                  <li key={a.text} className="flex items-start gap-3">
                    <Clock className="text-muted mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-text">{a.text}</p>
                      <p className="text-muted text-xs">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="text-muted mt-10 text-center text-xs">
        Mock data. Real account data lands in P1-T07 once auth is wired.
      </p>
    </section>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Calendar;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-5">
        <div className="bg-brand-primary/10 text-brand-primary flex size-10 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-muted text-xs">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
