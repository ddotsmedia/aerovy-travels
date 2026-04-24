// Central site config — names, nav, contact info.
export const site = {
  name: "Aerovy Travels",
  shortName: "Aerovy",
  tagline: "Abu Dhabi, handcrafted.",
  description:
    "Premium, AI-assisted travel platform for Abu Dhabi — tours, desert safaris, hotels, airport transfers, flights, visas and custom itineraries.",
  email: "hello@aerovy.travel",
  phone: "+971 2 555 0100",
  whatsapp: "+971 50 123 4567",
  address: "Corniche Road, Al Markaziyah, Abu Dhabi, UAE",
  hours: "Mon–Sun · 08:00–22:00 GST",
  socials: {
    instagram: "https://instagram.com/aerovy",
    facebook: "https://facebook.com/aerovy",
    x: "https://x.com/aerovy",
    tiktok: "https://tiktok.com/@aerovy",
  },
};

export const primaryNav = [
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/experiences", label: "Experiences" },
  { href: "/cruises", label: "Cruises" },
  { href: "/packages", label: "Packages" },
  { href: "/deals", label: "Deals" },
  { href: "/plan", label: "AI Planner" },
] as const;

export const footerNav = {
  book: [
    { href: "/flights", label: "Flights" },
    { href: "/hotels", label: "Hotels" },
    { href: "/experiences", label: "Experiences" },
    { href: "/transfers", label: "Transfers" },
    { href: "/cruises", label: "Cruises & yachts" },
    { href: "/packages", label: "Packages" },
    { href: "/events", label: "Events" },
  ],
  discover: [
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences?category=cultural", label: "Cultural & heritage" },
    { href: "/experiences?category=desert", label: "Desert & adventure" },
    { href: "/experiences?category=theme-parks", label: "Theme parks" },
    { href: "/experiences?category=nature", label: "Nature" },
    { href: "/blog", label: "Journal" },
    { href: "/deals", label: "Deals" },
  ],
  services: [
    { href: "/visa", label: "UAE visa" },
    { href: "/insurance", label: "Travel insurance" },
    { href: "/rewards", label: "Aerovy Rewards" },
    { href: "/gift-cards", label: "Gift cards" },
    { href: "/groups", label: "Group bookings" },
    { href: "/corporate", label: "Corporate travel" },
    { href: "/plan", label: "AI Trip Planner" },
  ],
  support: [
    { href: "/help", label: "Help centre" },
    { href: "/track", label: "Track a booking" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/reviews", label: "Reviews" },
    { href: "/cancellation", label: "Cancellation policy" },
  ],
  company: [
    { href: "/about", label: "About us" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/blog", label: "Journal" },
    { href: "/partners", label: "Become a supplier" },
  ],
  legal: [
    { href: "/terms", label: "Terms of service" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/cookies", label: "Cookie policy" },
    { href: "/cancellation", label: "Cancellation policy" },
  ],
};

export const fmtAED = (n: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits,
  }).format(n);

export const fmtDuration = (minutes: number) => {
  if (minutes >= 60 * 24) {
    const d = Math.round(minutes / (60 * 24));
    return `${d} day${d > 1 ? "s" : ""}`;
  }
  if (minutes >= 60) {
    const h = Math.round(minutes / 60);
    return `${h} hour${h > 1 ? "s" : ""}`;
  }
  return `${minutes} min`;
};
