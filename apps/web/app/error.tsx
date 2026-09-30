"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6">
        <h1 className="text-brand-primary text-6xl font-bold">Error</h1>
        <h2 className="text-3xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground text-lg">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="bg-brand-primary text-brand-secondary inline-block rounded-lg px-6 py-3 font-semibold transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary/10 inline-block rounded-lg border-2 px-6 py-3 font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
