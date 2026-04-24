import Link from "next/link";
import Image from "next/image";

const districts = [
  {
    name: "Saadiyat Island",
    tagline: "Louvre, Guggenheim, nesting turtles",
    image:
      "https://images.unsplash.com/photo-1583265266-66a988e63d0c?auto=format&fit=crop&w=900&q=80",
    href: "/experiences?q=saadiyat",
  },
  {
    name: "Yas Island",
    tagline: "Ferrari World, Waterworld, F1 circuit",
    image:
      "https://images.unsplash.com/photo-1503416997304-7f8bf166c121?auto=format&fit=crop&w=900&q=80",
    href: "/experiences?q=yas",
  },
  {
    name: "Corniche",
    tagline: "Sunset promenade, pearl-diving dhows",
    image:
      "https://images.unsplash.com/photo-1512453979-8ed44d2a3b07?auto=format&fit=crop&w=900&q=80",
    href: "/experiences?q=corniche",
  },
  {
    name: "Liwa Desert",
    tagline: "Moreeb Dune, Empty-Quarter safaris",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    href: "/experiences?q=liwa",
  },
  {
    name: "Al Ain",
    tagline: "UNESCO oasis, Jebel Hafeet peak",
    image:
      "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=900&q=80",
    href: "/experiences?q=al-ain",
  },
  {
    name: "City centre",
    tagline: "Grand Mosque, Qasr Al Watan",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
    href: "/experiences?q=grand-mosque",
  },
];

export function Districts() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            Districts
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Every neighborhood has its own story.
          </h2>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <Link
              key={d.name}
              href={d.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="from-brand-secondary/90 via-brand-secondary/30 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="text-bg absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-medium tracking-wide uppercase opacity-80">
                  {d.tagline}
                </p>
                <h3 className="mt-1 text-2xl font-bold">{d.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
