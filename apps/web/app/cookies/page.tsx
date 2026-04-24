import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookie policy" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" lastUpdated="24 April 2026">
      <p>
        This policy explains what cookies and similar technologies we use, why, and how you can
        control them.
      </p>

      <h2>1. Strictly necessary (always on)</h2>
      <ul>
        <li>
          <code>aerovy_session</code> — keeps you signed in (session-only).
        </li>
        <li>
          <code>aerovy_cart</code> — remembers items in your cart (30 days).
        </li>
        <li>
          <code>aerovy_csrf</code> — protects against cross-site request forgery.
        </li>
      </ul>

      <h2>2. Analytics (optional)</h2>
      <p>
        If you accept analytics cookies we use PostHog and Vercel Web Analytics to understand which
        pages are popular and where users get stuck. Data is anonymised within 90 days.
      </p>

      <h2>3. Marketing (optional)</h2>
      <p>
        If you accept marketing cookies we may use Google Ads and Meta Pixel to show you relevant
        ads on other sites. You can opt out at any time.
      </p>

      <h2>4. How to control cookies</h2>
      <p>
        Use the cookie banner on your first visit or the &ldquo;Cookie settings&rdquo; link in the
        footer to change your preferences. You can also clear cookies via your browser settings.
      </p>

      <h2>5. Do Not Track</h2>
      <p>
        We honour Do Not Track (DNT) browser signals where reasonably practical — treating DNT as a
        rejection of analytics and marketing cookies.
      </p>
    </LegalPage>
  );
}
