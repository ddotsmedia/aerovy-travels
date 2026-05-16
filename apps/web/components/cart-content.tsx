"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, Gift, ShoppingBag } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { useCartStore, lineSubtotal, cartTotals } from "@/lib/cart-store";
import { fmtAED } from "@/lib/site";

export function CartContent() {
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.hydrated);
  const update = useCartStore((s) => s.update);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const { subtotal, fees, total } = cartTotals(items);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-muted text-sm">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Cart</span>
      </nav>
      <div className="mt-2 flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>
        {hydrated && items.length > 0 && (
          <button onClick={clear} className="text-muted hover:text-danger text-sm">
            Clear cart
          </button>
        )}
      </div>

      {!hydrated ? (
        <CartSkeleton />
      ) : items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((it) => {
              const dateLabel = new Date(it.dateISO).toLocaleDateString("en", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return (
                <Card key={it.id}>
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
                    {it.image && (
                      <Link
                        href={`/experiences/${it.slug}`}
                        className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-40"
                      >
                        <Image
                          src={it.image}
                          alt={it.title}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/experiences/${it.slug}`}
                        className="hover:text-brand-primary text-base font-semibold"
                      >
                        {it.title}
                      </Link>
                      <p className="text-muted mt-1 text-sm">{it.variantName}</p>
                      <p className="text-muted mt-1 text-sm">Date: {dateLabel} · 9:00 am</p>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <PaxStepper
                          label="Adults"
                          value={it.adults}
                          min={1}
                          onChange={(n) => update(it.id, { adults: n })}
                        />
                        <PaxStepper
                          label="Children"
                          value={it.children}
                          min={0}
                          onChange={(n) => update(it.id, { children: n })}
                        />
                      </div>

                      <div className="mt-4 flex items-end justify-between pt-2">
                        <p className="text-muted text-sm">
                          {fmtAED(it.pricePerAdultAED)} × {it.adults}
                          {it.children > 0
                            ? ` · ${fmtAED(it.pricePerChildAED)} × ${it.children}`
                            : ""}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">{fmtAED(lineSubtotal(it))}</span>
                          <button
                            onClick={() => remove(it.id)}
                            aria-label={`Remove ${it.title}`}
                            className="text-muted hover:text-danger"
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

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
      )}
    </section>
  );
}

function PaxStepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted text-sm">{label}</span>
      <div className="border-border inline-flex items-center rounded-md border">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="hover:bg-surface flex size-9 items-center justify-center disabled:opacity-40"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <span className="w-8 text-center text-sm font-medium">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          className="hover:bg-surface flex size-9 items-center justify-center"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <Card className="mt-8">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="bg-surface flex size-16 items-center justify-center rounded-full">
          <ShoppingBag className="text-muted size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-lg font-semibold">Your cart is empty</h2>
        <p className="text-muted mt-1 max-w-sm text-sm">
          Add an experience or a curated package to start planning your Abu Dhabi trip.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/experiences">Browse experiences</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/packages">View packages</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CartSkeleton() {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="border-border bg-surface/40 h-40 animate-pulse rounded-xl border"
          />
        ))}
      </div>
      <div className="border-border bg-surface/40 h-72 animate-pulse rounded-xl border" />
    </div>
  );
}
