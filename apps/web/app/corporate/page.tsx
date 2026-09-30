import type { Metadata } from "next";

import { useForm } from "react-hook-form";

export const metadata: Metadata = {
  title: "Corporate Travel Solutions · Aerovy Travels",
  description:
    "Streamlined corporate travel management, group bookings, and business travel solutions for companies.",
};

export default function CorporatePage() {
  const benefits = [
    {
      title: "Dedicated Account Manager",
      desc: "Personal support for all your corporate travel needs 24/7",
    },
    {
      title: "Bulk Discounts",
      desc: "Up to 25% savings on flights, hotels, and packages for groups",
    },
    {
      title: "Centralized Billing",
      desc: "Single invoice, multiple travelers, seamless expense tracking",
    },
    {
      title: "Flexible Policies",
      desc: "Custom cancellation & modification terms tailored to your company",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-16 text-center text-white md:py-24">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Corporate Travel Solutions</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
          Streamlined group bookings, account management, and exclusive corporate rates for your
          team.
        </p>
        <button className="rounded-lg border border-blue-600 bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-50">
          Schedule a Demo
        </button>
      </section>

      {/* Benefits Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Why Choose Aerovy Corporate?
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                {idx + 1}
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-900">
            Trusted by Leading Companies
          </h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {["Company A", "Company B", "Company C", "Company D"].map((company, i) => (
              <div
                key={i}
                className="flex h-24 items-center justify-center rounded-lg border border-gray-200 bg-white p-8"
              >
                <span className="font-semibold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Get a Custom Quote</h2>

        <form className="rounded-lg border border-gray-200 bg-white p-8">
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <input
              placeholder="Company Name *"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              placeholder="Contact Name *"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <input
              type="email"
              placeholder="Email Address *"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <input
              type="number"
              placeholder="Approx. travelers per month *"
              min="1"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Tell us about your travel needs..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            Send Enquiry
          </button>
        </form>
      </section>
    </main>
  );
}
