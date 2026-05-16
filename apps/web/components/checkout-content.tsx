"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Lock, ShoppingBag, CreditCard } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { useCartStore, lineSubtotal, cartTotals } from "@/lib/cart-store";
import { saveOrder, newOrderId } from "@/lib/order-store";
import { fmtAED } from "@/lib/site";

export function CheckoutContent() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.hydrated);
  const clear = useCartStore((s) => s.clear);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { subtotal, fees, total } = cartTotals(items);

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-border bg-surface/40 h-96 animate-pulse rounded-xl border" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-surface flex size-16 items-center justify-center rounded-full">
              <ShoppingBag className="text-muted size-7" aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Nothing to check out yet</h1>
            <p className="text-muted mt-2 text-sm">
              Add an experience to your cart, then come back here to complete your booking.
            </p>
            <Button asChild className="mt-6">
              <Link href="/experiences">Browse experiences</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const required = ["firstName", "lastName", "email", "phone", "country"] as const;
    for (const key of required) {
      const value = String(data.get(key) ?? "").trim();
      if (!value) {
        setError("Please complete every required field.");
        setSubmitting(false);
        return;
      }
    }

    const id = newOrderId();
    saveOrder({
      id,
      createdAtISO: new Date().toISOString(),
      items,
      subtotalAED: subtotal,
      feesAED: fees,
      totalAED: total,
      traveler: {
        firstName: String(data.get("firstName")).trim(),
        lastName: String(data.get("lastName")).trim(),
        email: String(data.get("email")).trim(),
        phone: String(data.get("phone")).trim(),
        country: String(data.get("country")).trim(),
        notes: String(data.get("notes") ?? "").trim() || undefined,
      },
    });
    clear();
    router.push(`/confirmation/${id}`);
  };

  const steps = [
    { n: 1, label: "Cart", done: true },
    { n: 2, label: "Details", active: true },
    { n: 3, label: "Payment" },
    { n: 4, label: "Confirmation" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-3 text-sm">
        {steps.map((s, i) => (
          <li key={s.n} className="flex items-center gap-3">
            <span
              className={[
                "flex size-7 items-center justify-center rounded-full text-xs font-bold",
                s.done && "bg-brand-primary text-brand-secondary",
                s.active && "border-brand-primary text-brand-primary border-2",
                !s.done && !s.active && "border-border text-muted border",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {s.done ? <Check className="size-4" aria-hidden="true" /> : s.n}
            </span>
            <span className={s.active ? "text-text font-semibold" : "text-muted"}>{s.label}</span>
            {i < steps.length - 1 && <span className="bg-border h-px w-8" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Who&rsquo;s travelling?</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="First name" name="firstName" required />
                <Field label="Last name" name="lastName" required />
                <Field label="Email (for voucher)" name="email" type="email" required />
                <Field label="Phone / WhatsApp" name="phone" type="tel" required />
                <Field label="Country of residence" name="country" required />
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-medium">Anything we should know? (optional)</span>
                <textarea
                  name="notes"
                  rows={3}
                  className="border-border bg-bg mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Hotel pickup, dietary needs, accessibility, …"
                />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Payment</h2>
                <span className="text-muted inline-flex items-center gap-1.5 text-xs">
                  <Lock className="size-3.5" aria-hidden="true" />
                  Test mode · no real charge
                </span>
              </div>
              <p className="text-muted mt-2 text-sm">
                Card capture happens on the next step. For this preview we&rsquo;ll create your
                booking immediately so you can see the confirmation flow end-to-end.
              </p>
              <div className="border-border bg-surface mt-5 flex items-center gap-3 rounded-md border p-4">
                <CreditCard className="text-muted size-5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-medium">Stripe Checkout — coming up</p>
                  <p className="text-muted text-xs">
                    Hook STRIPE_SECRET_KEY into <code>app/api/checkout</code> to switch this from
                    mock to real test mode.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <p
              role="alert"
              className="text-danger border-danger/30 bg-danger/5 rounded-md border px-4 py-3 text-sm"
            >
              {error}
            </p>
          )}
        </div>

        <aside className="relative lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Your booking</h2>
              <ul className="mt-4 space-y-4">
                {items.map((it) => {
                  const dateLabel = new Date(it.dateISO).toLocaleDateString("en", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <li key={it.id} className="flex gap-3">
                      {it.image && (
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={it.image}
                            alt={it.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 text-sm">
                        <p className="line-clamp-1 font-medium">{it.title}</p>
                        <p className="text-muted text-xs">
                          {it.variantName} · {dateLabel}
                        </p>
                        <p className="text-muted text-xs">
                          {it.adults} adult{it.adults === 1 ? "" : "s"}
                          {it.children > 0
                            ? ` · ${it.children} child${it.children === 1 ? "" : "ren"}`
                            : ""}
                        </p>
                      </div>
                      <p className="text-sm font-semibold whitespace-nowrap">
                        {fmtAED(lineSubtotal(it))}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <dl className="border-border mt-5 space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd>{fmtAED(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Service fee (5%)</dt>
                  <dd>{fmtAED(fees)}</dd>
                </div>
                <div className="border-border mt-2 flex justify-between border-t pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{fmtAED(total)}</dd>
                </div>
              </dl>
              <Button type="submit" size="lg" fullWidth disabled={submitting} className="mt-6">
                {submitting ? "Confirming…" : `Pay ${fmtAED(total)}`}
              </Button>
              <p className="text-muted mt-3 text-center text-xs">
                Free cancellation up to 24 h before · Secure checkout
              </p>
            </CardContent>
          </Card>
        </aside>
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <Input name={name} type={type} required={required} className="mt-1" />
    </label>
  );
}
