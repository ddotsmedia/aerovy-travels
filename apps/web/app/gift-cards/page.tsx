import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Cards · Aerovy Travels",
  description:
    "Give the gift of travel. Aerovy gift cards for flights, hotels, experiences, and packages.",
};

export default function GiftCardsPage() {
  const denominations = [250, 500, 1000, 5000];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center md:py-24">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Gift Cards</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          The perfect gift for the traveler in your life. Use for flights, hotels, experiences, and
          more.
        </p>
      </section>

      {/* Selector & Preview */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Selector */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Choose Amount</h2>

            <div className="mb-8 space-y-3">
              {denominations.map((amount) => (
                <button
                  key={amount}
                  className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  AED {amount.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Custom Amount
              </label>
              <div className="flex gap-2">
                <span className="self-center text-lg font-semibold text-gray-900">AED</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  min="100"
                  max="10000"
                  className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Recipient Fields */}
            <div className="mb-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Recipient Name
                </label>
                <input
                  placeholder="Name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Recipient Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Personal Message
                </label>
                <textarea
                  placeholder="Add a personal note..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <button className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700">
              Add to Cart
            </button>
          </div>

          {/* Right: Preview */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm" style={{ perspective: 1000 }}>
              <div className="flex h-64 flex-col justify-between rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-8 text-white shadow-2xl">
                <div>
                  <div className="text-sm font-semibold opacity-75">AEROVY TRAVELS</div>
                  <div className="mt-2 text-3xl font-bold">Gift Card</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-1 text-xs opacity-75">CARD NUMBER</div>
                    <div className="font-mono text-lg tracking-wider">4242 4242 4242 4242</div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="mb-1 text-xs opacity-75">AMOUNT</div>
                      <div className="text-2xl font-bold">AED 1,000</div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1 text-xs opacity-75">VALID THRU</div>
                      <div className="text-sm">12/26</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Why Gift Cards?</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "No Expiry", desc: "Use anytime, no expiration date" },
              { title: "Flexible", desc: "Use on anything on our platform" },
              { title: "Instant", desc: "Deliver digital cards instantly" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mb-3 text-3xl font-bold text-purple-600">
                  {String.fromCharCode(97 + i)}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
