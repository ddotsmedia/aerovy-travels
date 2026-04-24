import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions." };

const faqs = [
  {
    category: "Booking",
    items: [
      {
        q: "Are my bookings confirmed instantly?",
        a: "Yes. Every experience and hotel on Aerovy is bookable in real-time with instant confirmation. You&rsquo;ll receive a digital voucher within seconds.",
      },
      {
        q: "Can I book for a group?",
        a: "Absolutely. Groups of 10+ get a dedicated concierge and custom rates — just use the group request form on the Contact page.",
      },
      {
        q: "Do you accept multiple currencies?",
        a: "We charge in AED today. We display prices in USD, EUR, GBP, INR, CNY, and RUB based on live mid-market FX. Multi-currency checkout is coming in Phase 3.",
      },
    ],
  },
  {
    category: "Cancellation & refunds",
    items: [
      {
        q: "What&rsquo;s your cancellation policy?",
        a: "Most experiences offer free cancellation up to 24 hours before start time. Hotels vary by room type — full terms are shown before checkout.",
      },
      {
        q: "How long do refunds take?",
        a: "Card refunds are issued within 1 business day; your bank typically reflects them in 5–10 business days.",
      },
      {
        q: "What happens if an experience is cancelled by the supplier?",
        a: "Full automatic refund + a 10% credit for a re-booking. Our concierge reaches out within the hour to offer alternatives.",
      },
    ],
  },
  {
    category: "During your trip",
    items: [
      {
        q: "Do I need to print vouchers?",
        a: "No. Your digital voucher (in-app or email) is accepted at every supplier. We also send a WhatsApp reminder the day before.",
      },
      {
        q: "What if I&rsquo;m running late?",
        a: "Most suppliers allow a 15 min grace window; WhatsApp the concierge and we&rsquo;ll coordinate. For flight-tracked transfers, your driver waits 30 min free.",
      },
      {
        q: "Is English spoken everywhere?",
        a: "Yes, across all our suppliers. Arabic, Hindi, Russian, and Chinese are also common on tours and transfers.",
      },
    ],
  },
  {
    category: "Payments & privacy",
    items: [
      {
        q: "Which cards do you accept?",
        a: "Visa, Mastercard, Amex, Apple Pay, and Google Pay. Local UAE wallets (Telr, Network International) coming in Phase 3.",
      },
      {
        q: "Is my card data safe?",
        a: "We never store card numbers. All payments are processed by Stripe, which is PCI-DSS Level 1 certified.",
      },
      {
        q: "Do you sell my data?",
        a: "Never. We don&rsquo;t sell, rent, or share your personal data with third parties. Full details in our privacy policy.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">FAQ</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="text-muted mt-2 max-w-2xl">
            Can&rsquo;t find what you&rsquo;re looking for?{" "}
            <Link href="/contact" className="text-brand-primary font-medium hover:underline">
              Contact our concierge
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold tracking-tight">{section.category}</h2>
              <div className="divide-border border-border bg-surface mt-4 divide-y rounded-2xl border">
                {section.items.map((item) => (
                  <details key={item.q} className="group px-6 py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <span className="font-medium">{item.q}</span>
                      <span className="text-brand-primary mt-1 shrink-0 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p
                      className="text-muted mt-3 text-sm"
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
