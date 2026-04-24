import { Tajawal, Inter } from "next/font/google";

// Tajawal — primary (Arabic + Latin). Variable font isn't offered; pick a
// set of weights we actually use.
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-tajawal",
});

// Inter — Latin fallback + for UI where Tajawal's latin feels too warm.
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});
