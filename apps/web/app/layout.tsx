import "./globals.css";
import type { ReactNode } from "react";

// The real <html> tag is rendered in `app/[locale]/layout.tsx` so we can
// set lang + dir based on the resolved locale. This root layout is a
// pass-through required by Next's App Router.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
