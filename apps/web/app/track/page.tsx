import type { Metadata } from "next";
import Link from "next/link";
import { SearchCheck } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";

export const metadata: Metadata = { title: "Track booking" };

export default function TrackPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16 sm:px-6">
      <nav className="text-muted mb-4 text-sm">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Track booking</span>
      </nav>
      <Card>
        <CardContent className="p-8">
          <div className="bg-brand-primary/10 text-brand-primary flex size-12 items-center justify-center rounded-xl">
            <SearchCheck className="size-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Find my booking</h1>
          <p className="text-muted mt-1 text-sm">
            No account needed. Enter your booking reference and the email you used.
          </p>
          <form className="mt-6 space-y-3">
            <label className="block">
              <span className="text-sm font-medium">Booking reference</span>
              <Input placeholder="AER-XXXX" className="mt-1 font-mono" required />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <Input type="email" className="mt-1" required />
            </label>
            <Button size="lg" fullWidth type="submit">
              Find booking
            </Button>
          </form>
          <p className="text-muted mt-6 text-center text-xs">
            Lost both?{" "}
            <Link
              href="/contact?topic=lost-booking"
              className="text-brand-primary font-medium hover:underline"
            >
              Contact concierge
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
