import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us · Aerovy Travels",
  description:
    "Learn about Aerovy Travels, our mission, values, and the team behind Abu Dhabi premium travel experiences.",
};

export default function AboutPage() {
  const team = [
    { name: "Sarah Al-Mazrouei", role: "Founder & CEO", img: "👩‍💼" },
    { name: "Ahmed Khalifa", role: "Head of Operations", img: "👨‍💼" },
    { name: "Layla Al-Ketbi", role: "Chief Experience Officer", img: "👩‍💼" },
    { name: "Mohammed Al-Shamsi", role: "VP Technology", img: "👨‍💼" },
  ];

  const values = [
    { title: "Excellence", desc: "We deliver premium experiences that exceed expectations" },
    { title: "Integrity", desc: "Transparency and honesty in every customer interaction" },
    { title: "Innovation", desc: "Leveraging AI and tech to simplify travel planning" },
    { title: "Responsibility", desc: "Supporting local communities and sustainable tourism" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-16 text-center text-white md:py-24">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Aerovy</h1>
        <p className="mx-auto max-w-2xl text-lg opacity-90">
          Reimagining travel in Abu Dhabi through premium experiences, human touch, and cutting-edge
          technology.
        </p>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Founded in 2021, Aerovy Travels began with a simple vision: to transform how people
          experience Abu Dhabi. We noticed that while the city offers world-class attractions, the
          booking experience was fragmented and complex.
        </p>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Today, we serve over 50,000 travelers annually, offering everything from desert safaris to
          corporate travel solutions. Our team of 45 passionate travel experts works tirelessly to
          ensure every journey is unforgettable.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          By combining AI-powered recommendations with human expertise, we deliver personalized
          travel experiences that feel both seamless and deeply authentic.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Our Values</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-xl font-bold text-amber-600">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Meet the Team</h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <div className="mb-4 text-6xl">{member.img}</div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Visit Us</h2>

          <div className="h-96 overflow-hidden rounded-lg bg-gray-300">
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

          <div className="mt-8 text-center">
            <p className="mb-4 text-gray-600">Corniche Road, Al Markaziyah, Abu Dhabi, UAE</p>
            <p className="mb-6 text-gray-600">Mon–Sun · 08:00–22:00 GST</p>
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Recognition & Awards</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            "2024 Best Travel Platform UAE",
            "2024 Customer Service Excellence",
            "2023 Travel Tech Innovation Award",
          ].map((award, i) => (
            <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 p-6">
              <div className="mb-2 text-2xl">🏆</div>
              <p className="font-semibold text-gray-800">{award}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
