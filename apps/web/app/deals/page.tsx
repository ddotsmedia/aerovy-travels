import type { Metadata } from "next";
import { DealCountdown } from "@/components/deals/deal-countdown";

export const metadata: Metadata = {
  title: "Flash Deals & Offers · Aerovy Travels",
  description:
    "Limited-time travel deals and flash sales. Up to 30% off flights, hotels, experiences, and packages.",
};

export default function DealsPage() {
  const deals = [
    { id: 1, title: "Dubai City Tour", original: 450, discount: 20, expiry: "72h" },
    { id: 2, title: "Desert Safari & BBQ", original: 350, discount: 25, expiry: "48h" },
    { id: 3, title: "Abu Dhabi Hotel Package", original: 890, discount: 15, expiry: "96h" },
    { id: 4, title: "Yacht Cruise", original: 600, discount: 30, expiry: "24h" },
    { id: 5, title: "Theme Parks Pass", original: 280, discount: 20, expiry: "72h" },
    { id: 6, title: "Helicopter Tour", original: 1200, discount: 15, expiry: "48h" },
  ];

  const getDiscountedPrice = (original: number, discount: number) => {
    return Math.round(original * (1 - discount / 100));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center md:py-24">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Flash Deals</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Limited-time offers up to 30% off. Deals refresh every 24 hours.
        </p>

        {/* Countdown Timer */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">
          <span className="animate-pulse">●</span>
          <DealCountdown hours={24} label="Deals refresh in:" />
        </div>

        {/* Newsletter Signup */}
        <div className="mx-auto mb-8 max-w-md">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Get deals via email"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <button className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => {
            const discounted = getDiscountedPrice(deal.original, deal.discount);
            return (
              <div
                key={deal.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                {/* Discount Badge */}
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-amber-200 to-orange-200">
                  <div className="absolute top-4 right-4 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                    -{deal.discount}%
                  </div>
                  <span className="text-4xl font-bold text-gray-700 opacity-50">{deal.id}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{deal.title}</h3>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">AED {discounted}</span>
                      <span className="text-sm text-gray-500 line-through">
                        AED {deal.original}
                      </span>
                    </div>
                  </div>

                  {/* Expiry */}
                  <div className="mb-4 text-sm font-semibold text-orange-600">
                    <DealCountdown hours={parseInt(deal.expiry)} />
                  </div>

                  <button className="w-full rounded bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700">
                    Claim Deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
