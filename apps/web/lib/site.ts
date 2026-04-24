// Central site config — names, nav, contact info.
export const site = {
  name: "Aerovy Travels",
  shortName: "Aerovy",
  tagline: "Abu Dhabi, handcrafted.",
  description:
    "Premium, AI-assisted travel platform for Abu Dhabi — tours, desert safaris, hotels, airport transfers, and custom itineraries.",
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
  { href: "/experiences", label: "Experiences" },
  { href: "/hotels", label: "Hotels" },
  { href: "/packages", label: "Packages" },
  { href: "/transfers", label: "Transfers" },
  { href: "/plan", label: "AI Planner" },
  { href: "/blog", label: "Journal" },
] as const;

export const footerNav = {
  discover: [
    { href: "/experiences", label: "All experiences" },
    { href: "/experiences?category=cultural", label: "Cultural & heritage" },
    { href: "/experiences?category=desert", label: "Desert & adventure" },
    { href: "/experiences?category=theme-parks", label: "Theme parks" },
    { href: "/experiences?category=nature", label: "Nature" },
    { href: "/experiences?category=dining", label: "Dining & nightlife" },
  ],
  plan: [
    { href: "/plan", label: "AI Trip Planner" },
    { href: "/packages", label: "Curated packages" },
    { href: "/hotels", label: "Hotels" },
    { href: "/transfers", label: "Airport transfers" },
    { href: "/concierge", label: "Concierge desk" },
  ],
  company: [
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/blog", label: "Journal" },
  ],
  legal: [
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms of service" },
    { href: "/privacy", label: "Privacy policy" },
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
