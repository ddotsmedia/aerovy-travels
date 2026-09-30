import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Aerovy Rewards · Loyalty Program",
  description:
    "Join Aerovy Rewards and earn points on every booking. Get exclusive benefits, tier upgrades, and VIP perks.",
};

export default function RewardsPage() {
  const tiers = [
    {
      name: "Silver",
      pointsNeeded: 0,
      benefits: ["1 point per AED spent", "Birthday bonus", "Email support"],
      color: "from-gray-400 to-gray-500",
    },
    {
      name: "Gold",
      pointsNeeded: 5000,
      benefits: [
        "1.5 points per AED spent",
        "20% point bonus",
        "Priority support",
        "Exclusive deals",
      ],
      color: "from-yellow-400 to-yellow-500",
    },
    {
      name: "Platinum",
      pointsNeeded: 15000,
      benefits: [
        "2 points per AED spent",
        "50% point bonus",
        "24/7 VIP concierge",
        "Upgrade perks",
        "Free cancellation",
      ],
      color: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-16 text-center text-white md:py-24">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Aerovy Rewards</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
          Earn points on every booking. Unlock exclusive benefits, upgrades, and VIP experiences.
        </p>
        <button className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700">
          Join Now
        </button>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Membership Tiers</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className="overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${tier.color} p-6 text-white`}>
                <h3 className="mb-2 text-2xl font-bold">{tier.name}</h3>
                {tier.pointsNeeded > 0 && (
                  <p className="text-sm opacity-90">
                    {tier.pointsNeeded.toLocaleString()} points to unlock
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="bg-white p-6">
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-bold text-amber-600">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">How Rewards Work</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "Earn", desc: "Get 1 point for every AED spent on bookings" },
              { step: "Save", desc: "Redeem points for discounts, free upgrades & perks" },
              { step: "Enjoy", desc: "Unlock VIP benefits as you climb tiers" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-600 text-xl font-bold text-white">
                  {item.step[0]}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.step}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Example */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Your Progress</h2>

        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Silver → Gold</span>
              <span className="text-sm font-semibold text-amber-600">2,450 / 5,000 points</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            You need 2,550 more points to reach Gold tier. One more trip should do it!
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-16 text-center text-white md:py-20">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Start Earning Today</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
          Join 50,000+ travelers who are already saving with Aerovy Rewards.
        </p>
        <button className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700">
          <Link href="/auth/register">Sign Up Now</Link>
        </button>
      </section>
    </main>
  );
}
