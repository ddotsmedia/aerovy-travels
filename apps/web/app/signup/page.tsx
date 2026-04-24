import type { Metadata } from "next";
import Link from "next/link";
import { Button, Input } from "@aerovy/ui";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="border-border bg-surface rounded-2xl border p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="text-muted mt-1 text-sm">It takes 30 seconds. Passwordless by default.</p>

        <form className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">First name</span>
              <Input name="firstName" className="mt-1" required />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Last name</span>
              <Input name="lastName" className="mt-1" required />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <Input type="email" name="email" className="mt-1" required />
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            <span className="text-muted">
              I agree to the{" "}
              <Link href="/terms" className="text-brand-primary hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-brand-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <Button size="lg" fullWidth type="submit">
            Create account
          </Button>
        </form>

        <p className="text-muted mt-6 text-center text-sm">
          Have an account?{" "}
          <Link href="/signin" className="text-brand-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
