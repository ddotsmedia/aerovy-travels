import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners",
  description: "Become a partner with Aerovy Travels.",
};

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Partners</h1>
        <p className="text-muted-foreground text-lg">
          Coming soon. We&apos;re building a partnership program.
        </p>
        <Link
          href="/"
          className="bg-brand-primary text-brand-secondary inline-block rounded-lg px-6 py-3 font-semibold transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
