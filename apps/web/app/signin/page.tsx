import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button, Input } from "@aerovy/ui";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="border-border bg-surface rounded-2xl border p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted mt-1 text-sm">Sign in to manage your bookings and itineraries.</p>

        <form className="mt-6 space-y-4" action="/api/auth/signin" method="post">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1"
              required
            />
          </label>
          <Button type="submit" size="lg" fullWidth>
            <Mail className="size-4" aria-hidden="true" />
            Send me a magic link
          </Button>
        </form>

        <div className="text-muted my-6 flex items-center gap-4 text-xs uppercase">
          <span className="bg-border h-px flex-1" />
          or
          <span className="bg-border h-px flex-1" />
        </div>

        <div className="space-y-3">
          <Button variant="outline" size="lg" fullWidth>
            Continue with Google
          </Button>
          <Button variant="outline" size="lg" fullWidth>
            Continue with Apple
          </Button>
        </div>

        <p className="text-muted mt-6 text-center text-sm">
          New to Aerovy?{" "}
          <Link href="/signup" className="text-brand-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <p className="text-muted mt-6 text-center text-xs">
        Auth ships in Phase 1 Ticket 7. This form is a visual mock.
      </p>
    </section>
  );
}
