import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ · Aerovy Travels",
  description: "Frequently asked questions about booking, experiences, cancellations, and more.",
};

const faqCategories = [
  {
    category: "Booking",
    faqs: [
      {
        q: "How do I search for flights and hotels?",
        a: "Use our search bars on the homepage. Enter your destination, travel dates, and number of passengers. Filter by price, rating, and amenities.",
      },
      {
        q: "Can I modify my booking after purchase?",
        a: 'Yes, most bookings can be modified 48 hours before travel. Go to "My Bookings" and select the booking you want to change.',
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept credit/debit cards (Visa, Mastercard), Apple Pay, Google Pay, and bank transfers. All payments are securely processed.",
      },
      {
        q: "Is my payment secure?",
        a: "Absolutely. We use 256-bit SSL encryption and PCI DSS Level 1 compliance. Your data is never stored on our servers.",
      },
    ],
  },
  {
    category: "Experiences",
    faqs: [
      {
        q: "What is included in experience packages?",
        a: "Each experience package details what is included. Most include transportation, meals, activities, and professional guides.",
      },
      {
        q: "Can I customize an experience?",
        a: "Yes! Our AI Planner can create custom itineraries. Contact our team for bespoke corporate or group tours.",
      },
      {
        q: "Are experiences family-friendly?",
        a: "Most of our experiences are family-friendly. Check age requirements and difficulty levels before booking.",
      },
      {
        q: "What if weather cancels an experience?",
        a: "We offer rebooking or full refund if weather makes an activity unsafe. Check our full cancellation policy.",
      },
    ],
  },
  {
    category: "Cancellation & Refunds",
    faqs: [
      {
        q: "What is your cancellation policy?",
        a: "Most bookings can be cancelled free of charge up to 48 hours before travel. Some deals have stricter terms. Check your booking details.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 5–10 business days after cancellation, depending on your bank.",
      },
      {
        q: "Can I transfer my booking to someone else?",
        a: "Yes, you can transfer bookings to another person at no additional cost. Some airlines have transfer restrictions.",
      },
      {
        q: "What if I need to cancel due to emergency?",
        a: "Emergency cancellations are handled case-by-case. Contact our support team immediately. Travel insurance may cover emergency situations.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-16 text-center text-white md:py-24">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Frequently Asked Questions</h1>
        <p className="mx-auto max-w-2xl text-lg opacity-90">
          Find answers to common questions about bookings, experiences, and policies.
        </p>
      </section>

      {/* FAQ Sections */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        {faqCategories.map((section, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{section.category}</h2>

            <div className="space-y-4">
              {section.faqs.map((faq, faqIdx) => (
                <details key={faqIdx} className="rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer text-lg font-semibold text-gray-900 hover:text-indigo-600">
                    {faq.q}
                  </summary>
                  <div className="mt-3 text-gray-700">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Contact CTA */}
      <section className="bg-indigo-50 px-4 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Still have questions?</h2>
          <p className="mb-8 text-lg text-gray-600">
            Our support team is available 24/7 to help you with any concerns.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
}
