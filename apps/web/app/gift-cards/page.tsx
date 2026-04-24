import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Mail, Printer, CreditCard } from "lucide-react";
import { Button, Input } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift cards",
  description: "Give the gift of travel. Redeemable on flights, hotels, and experiences.",
};

const amounts = [250, 500, 1000, 2500, 5000, 10000];

export default function GiftCardsPage() {
  return (
    <>
      <section className="bg-bg relative overflow-hidden">
        <div className="bg-brand-accent/20 pointer-events-none absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Gift cards</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <div className="text-brand-primary flex items-center gap-2">
                <Gift className="size-4" aria-hidden="true" />
                <span className="text-xs font-medium tracking-wide uppercase">
                  Aerovy Gift Cards
                </span>
              </div>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                Give the gift of travel.
              </h1>
              <p className="text-muted mt-4 max-w-xl text-lg">
                Never expires, redeemable on everything in our catalog — flights, hotels,
                experiences, and transfers. Deliver by email, SMS, WhatsApp, or printed card.
              </p>

              <form className="border-border bg-surface mt-8 space-y-5 rounded-2xl border p-6">
                <div>
                  <p className="text-sm font-medium">Amount</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {amounts.map((v, i) => (
                      <label
                        key={v}
                        className="border-border bg-bg has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/10 cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-medium"
                      >
                        <input
                          type="radio"
                          name="amount"
                          value={v}
                          defaultChecked={i === 2}
                          className="sr-only"
                        />
                        {fmtAED(v)}
                      </label>
                    ))}
                  </div>
                  <Input placeholder="Or enter custom amount" className="mt-3" />
                </div>

                <div>
                  <p className="text-sm font-medium">Delivery</p>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-sm">
                    {[
                      { icon: Mail, label: "Email", checked: true },
                      { icon: Gift, label: "WhatsApp" },
                      { icon: Printer, label: "PDF" },
                      { icon: CreditCard, label: "Plastic card" },
                    ].map((o) => (
                      <label
                        key={o.label}
                        className="border-border bg-bg has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/10 flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-3 py-3"
                      >
                        <input
                          type="radio"
                          name="delivery"
                          defaultChecked={o.checked}
                          className="sr-only"
                        />
                        <o.icon className="size-4" aria-hidden="true" />
                        <span className="text-xs">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Input placeholder="Recipient name" required />
                <Input placeholder="Recipient email / WhatsApp" required />
                <label className="block">
                  <span className="text-sm font-medium">Personal message (optional)</span>
                  <textarea
                    rows={3}
                    className="border-border bg-bg mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Happy birthday, Noor — see you in Liwa!"
                  />
                </label>

                <Button size="lg" fullWidth type="submit">
                  Continue to payment
                </Button>
              </form>
            </div>

            <div className="relative">
              <div className="bg-brand-primary/20 absolute inset-0 rotate-2 rounded-3xl" />
              <div className="from-brand-secondary via-brand-secondary to-brand-primary/30 text-bg relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 shadow-xl">
                <p className="text-brand-primary text-xs font-medium tracking-widest uppercase">
                  Aerovy Travels Gift Card
                </p>
                <p className="mt-10 text-3xl font-bold">{fmtAED(1000)}</p>
                <p className="mt-1 font-mono text-xs opacity-70">AER-GIFT-XXXX-XXXX</p>
                <div className="mt-12 flex items-end justify-between">
                  <div>
                    <p className="text-xs opacity-70">To</p>
                    <p className="font-semibold">Someone wonderful</p>
                  </div>
                  <Gift className="text-brand-primary size-10" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Never expires", d: "Redeem any time, any year. No usage fees." },
            {
              t: "Works on everything",
              d: "Flights, hotels, experiences, transfers — anything in the catalog.",
            },
            { t: "Refundable if unused", d: "Within 90 days, full refund to original card." },
          ].map((p) => (
            <div key={p.t} className="border-border bg-surface rounded-xl border p-6">
              <h3 className="font-semibold">{p.t}</h3>
              <p className="text-muted mt-2 text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
