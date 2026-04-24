export type Hotel = {
  slug: string;
  name: string;
  district: string;
  stars: number;
  priceFrom: number;
  image: string;
  highlights: string[];
  description: string;
};

export const hotels: Hotel[] = [
  {
    slug: "emirates-palace-mandarin-oriental",
    name: "Emirates Palace Mandarin Oriental",
    district: "West Corniche",
    stars: 5,
    priceFrom: 2400,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
    highlights: ["1.3km private beach", "Gold-leaf coffee", "Anantara Spa"],
    description:
      "The palace of palaces — a 302-room icon with marble halls, a kilometre of white-sand beach, and the most photographed cappuccino in the UAE.",
  },
  {
    slug: "park-hyatt-saadiyat",
    name: "Park Hyatt Abu Dhabi · Saadiyat",
    district: "Saadiyat Island",
    stars: 5,
    priceFrom: 1450,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Turtle nesting beach", "Atarmia Spa", "Steps from Louvre"],
    description:
      "Saadiyat's quietest resort — low-rise villas set among dunes where hawksbill turtles nest in April.",
  },
  {
    slug: "rosewood-abu-dhabi",
    name: "Rosewood Abu Dhabi",
    district: "Al Maryah Island",
    stars: 5,
    priceFrom: 1180,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Sunset infinity pool", "Dai Pai Dong", "Gondola-to-Galleria"],
    description:
      "Al Maryah's modernist jewel — 189 rooms, a 30m sunset pool, and direct access to The Galleria's luxury shopping.",
  },
  {
    slug: "yas-hotel-by-w",
    name: "W Abu Dhabi · Yas Island",
    district: "Yas Island",
    stars: 5,
    priceFrom: 890,
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Over the F1 circuit", "LED-skin facade", "Yas Marina views"],
    description:
      "The only hotel straddling a Formula 1 racetrack. Watch qualifying from your suite.",
  },
  {
    slug: "st-regis-saadiyat",
    name: "The St. Regis Saadiyat Island",
    district: "Saadiyat Island",
    stars: 5,
    priceFrom: 1320,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Butler service", "Private beach", "Iridium Spa"],
    description:
      "The grand dame of Saadiyat — a 377-room retreat with a private beach club and a Gary Player golf course.",
  },
  {
    slug: "conrad-etihad-towers",
    name: "Conrad Abu Dhabi · Etihad Towers",
    district: "West Corniche",
    stars: 5,
    priceFrom: 920,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Observation deck at 300m", "Corniche-front", "12 restaurants"],
    description:
      "Live above the clouds in one of the five Etihad Towers. Glass-floored observation deck and a sky bar on the 74th.",
  },
  {
    slug: "anantara-sir-bani-yas",
    name: "Anantara Sir Bani Yas Al Yamm",
    district: "Sir Bani Yas Island",
    stars: 5,
    priceFrom: 1680,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Wildlife reserve", "Private beach villas", "Arabian oryx drives"],
    description:
      "Two hours from the city — beachfront villas on a wildlife reserve with free-roaming oryx, giraffes, and cheetahs.",
  },
  {
    slug: "ritz-carlton-grand-canal",
    name: "The Ritz-Carlton Abu Dhabi · Grand Canal",
    district: "Grand Canal",
    stars: 5,
    priceFrom: 1090,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Opposite Grand Mosque", "Venetian-style canal", "11 dining venues"],
    description: "A Venetian-inspired resort with the Grand Mosque framed from every pool lounger.",
  },
];

export function getHotelBySlug(slug: string) {
  return hotels.find((h) => h.slug === slug);
}
