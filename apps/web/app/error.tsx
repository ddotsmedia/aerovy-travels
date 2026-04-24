"use client";
import { useEffect } from "react";
import { Button } from "@aerovy/ui";

export default function GlobalError({
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
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-danger text-sm font-medium tracking-wide uppercase">Error</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Something went wrong.</h1>
      <p className="text-muted">We&rsquo;re looking into it. Try again in a moment.</p>
      <Button onClick={() => reset()} className="mt-2">
        Try again
      </Button>
    </div>
  );
}
