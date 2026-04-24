import Link from "next/link";
import { Button } from "@aerovy/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">404</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="text-muted">
        The page you&rsquo;re looking for may have moved or the link may be broken.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/experiences">Browse experiences</Link>
        </Button>
      </div>
    </div>
  );
}
