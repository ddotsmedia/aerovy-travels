import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Apple, Check, Lock } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
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

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Who&rsquo;s travelling?</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">First name</span>
                  <Input className="mt-1" required />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Last name</span>
                  <Input className="mt-1" required />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Email (for voucher)</span>
                  <Input type="email" className="mt-1" required />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Phone / WhatsApp</span>
                  <Input type="tel" className="mt-1" required />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-medium">Notes to the supplier (optional)</span>
                <textarea
                  rows={3}
                  className="border-border bg-bg mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Dietary needs, accessibility, special occasions..."
                />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Payment</h2>
              <p className="text-muted mt-1 text-sm">
                All charges in AED. Secured by Stripe — we never see your card number.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <button className="border-brand-primary bg-brand-primary/5 flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium">
                  <CreditCard className="size-4" aria-hidden="true" />
                  Card
                </button>
                <button className="border-border text-muted hover:border-brand-primary hover:text-text flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm">
                  <Apple className="size-4" aria-hidden="true" />
                  Apple Pay
                </button>
                <button className="border-border text-muted hover:border-brand-primary hover:text-text flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm">
                  Google Pay
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <Input placeholder="Card number" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM / YY" />
                  <Input placeholder="CVC" />
                </div>
                <Input placeholder="Cardholder name" />
              </div>
            </CardContent>
          </Card>

          <div className="text-muted flex items-start gap-2 text-sm">
            <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>
              By completing this booking you agree to the supplier&rsquo;s terms and our
              cancellation policy. Your card is pre-authorized and only charged on supplier
              confirmation.
            </p>
          </div>
        </div>

        <aside className="relative lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>Liwa Desert Overnight · 2 guests</span>
                  <span className="font-medium">{fmtAED(1700)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Louvre Curator · 3 guests</span>
                  <span className="font-medium">{fmtAED(720)}</span>
                </li>
              </ul>
              <dl className="border-border mt-6 space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd>{fmtAED(2420)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Service fee</dt>
                  <dd>{fmtAED(121)}</dd>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{fmtAED(2541)}</dd>
                </div>
              </dl>
              <Button size="lg" fullWidth className="mt-6">
                Pay {fmtAED(2541)}
              </Button>
              <p className="text-muted mt-3 flex items-center justify-center gap-1 text-xs">
                <Lock className="size-3" aria-hidden="true" />
                256-bit encryption · PCI-DSS compliant
              </p>
              <Link
                href="/cart"
                className="text-muted hover:text-brand-primary mt-2 block text-center text-xs"
              >
                ← Back to cart
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}
