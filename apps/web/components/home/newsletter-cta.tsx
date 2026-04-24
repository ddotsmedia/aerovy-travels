import { Button, Input } from "@aerovy/ui";

export function NewsletterCta() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Seasonal flash deals, once a month.
        </h2>
        <p className="text-muted mt-4">
          New desert-camp drops, hotel upgrade windows, and flash sales on Louvre and Ferrari World.
          No spam, unsubscribe with one click.
        </p>
        <form
          action="/api/newsletter"
          method="post"
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <Input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <Button size="lg" type="submit">
            Subscribe
          </Button>
        </form>
        <p className="text-muted mt-3 text-xs">
          By subscribing you agree to our privacy policy. Tracking-free newsletter.
        </p>
      </div>
    </section>
  );
}
