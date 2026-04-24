import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, Gift } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { getExperienceBySlug } from "@/lib/catalog";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  // Mock 2 items for the layout.
  const items = [
    getExperienceBySlug("liwa-desert-overnight-safari"),
    getExperienceBySlug("louvre-abu-dhabi-curators-tour"),
  ].filter(Boolean) as NonNullable<ReturnType<typeof getExperienceBySlug>>[];

  const rows = items.flatMap((e, i) => {
    const variant = e.variants[0];
    const image = e.images[0];
    if (!variant || !image) return [];
    return [
      {
        slug: e.slug,
        title: e.titleEn,
        variant: variant.nameEn,
        image: image.url,
        date: new Date(Date.now() + (i + 1) * 14 * 86400000).toLocaleDateString("en", {
          month: "short",
          day: "numeric",
        }),
        qty: i === 0 ? 2 : 3,
        price: variant.basePriceAED,
      },
    ];
  });

  const subtotal = rows.reduce((s, r) => s + r.qty * r.price, 0);
  const fees = Math.round(subtotal * 0.05);
  const total = subtotal + fees;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-muted text-sm">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Cart</span>
      </nav>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Your cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {rows.map((r) => (
            <Card key={r.slug}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-40">
                  <Image src={r.image} alt={r.title} fill sizes="160px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/experiences/${r.slug}`}
                    className="hover:text-brand-primary text-base font-semibold"
                  >
                    {r.title}
                  </Link>
                  <p className="text-muted mt-1 text-sm">{r.variant}</p>
                  <p className="text-muted mt-1 text-sm">Date: {r.date}</p>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="border-border inline-flex items-center rounded-md border">
                      <button
                        className="hover:bg-surface flex size-9 items-center justify-center"
                        aria-label="Decrease"
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm">{r.qty}</span>
                      <button
                        className="hover:bg-surface flex size-9 items-center justify-center"
                        aria-label="Increase"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{fmtAED(r.qty * r.price)}</span>
                      <button aria-label="Remove" className="text-muted hover:text-danger">
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <label className="flex flex-1 items-center gap-2">
                <Gift className="text-brand-primary size-4" aria-hidden="true" />
                <span className="text-sm font-medium">Promo code</span>
                <Input name="promo" placeholder="SUMMER25" className="ml-2 max-w-[200px]" />
              </label>
              <Button variant="outline">Apply</Button>
            </CardContent>
          </Card>
        </div>

        <aside className="relative lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd>{fmtAED(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Service fee (5%)</dt>
                  <dd>{fmtAED(fees)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">VAT</dt>
                  <dd>Included</dd>
                </div>
                <div className="border-border mt-3 flex justify-between border-t pt-3 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{fmtAED(total)}</dd>
                </div>
              </dl>
              <Button size="lg" fullWidth asChild className="mt-6">
                <Link href="/checkout">
                  Proceed to checkout
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <p className="text-muted mt-3 text-center text-xs">
                Free cancellation · instant confirmation
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}
