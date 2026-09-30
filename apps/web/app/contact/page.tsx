import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us · Aerovy Travels",
  description:
    "Get in touch with Aerovy Travels. 24/7 support via phone, email, WhatsApp, and live chat.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-16 text-center text-white md:py-20">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mx-auto max-w-2xl text-lg opacity-90">
          Our team is here to help 24/7. Reach out via phone, email, or WhatsApp.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Contact Info */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Contact Information</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">
                    Corniche Road, Al Markaziyah,
                    <br />
                    Abu Dhabi, UAE
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">
                    +971 2 555 0100
                    <br />
                    +971 50 123 4567 (WhatsApp)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">hello@aerovy.travel</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600">
                    Mon–Sun · 08:00–22:00 GST
                    <br />
                    24/7 Emergency Support
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 h-80 overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.9859434938846!2d54.3736!3d24.4865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae5b3cc0000001%3A0x0!2sCorniche%20Road!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Send us a Message</h2>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Name *</label>
                <input
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Email *</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Subject *</label>
                <input
                  placeholder="What is this about?"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Message</label>
                <textarea
                  placeholder="Tell us more..."
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                Send Message
              </button>

              <p className="text-center text-xs text-gray-500">
                We typically respond within 2 hours during business hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
