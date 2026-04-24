import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" lastUpdated="24 April 2026">
      <p>
        Aerovy Travels FZ-LLC (&ldquo;we&rdquo;) is committed to protecting your personal data. This
        policy explains what we collect, why, how we use it, and your rights under the UAE Personal
        Data Protection Law (Federal Decree-Law No. 45 of 2021), GDPR, and similar regimes.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>
          <strong>Identifiers:</strong> name, email, phone, nationality, passport details (for visa
          services only).
        </li>
        <li>
          <strong>Booking data:</strong> reservation history, preferences, dietary and accessibility
          needs.
        </li>
        <li>
          <strong>Payment data:</strong> processed by Stripe. We receive only the last four digits
          and card brand.
        </li>
        <li>
          <strong>Usage data:</strong> IP address, device, browser, pages viewed (anonymised after
          90 days).
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>Fulfilling your bookings and keeping you informed.</li>
        <li>Processing payments, refunds, and visa applications.</li>
        <li>Providing concierge support (WhatsApp, phone, email).</li>
        <li>Improving our service through anonymised analytics.</li>
        <li>Marketing — only with your opt-in consent, unsubscribe any time.</li>
      </ul>

      <h2>3. Who we share data with</h2>
      <p>We share the minimum necessary data with:</p>
      <ul>
        <li>
          <strong>Suppliers</strong> you book with (e.g., a hotel needs your name).
        </li>
        <li>
          <strong>Payment processors</strong> (Stripe) for authorisation.
        </li>
        <li>
          <strong>Government bodies</strong> when processing visa applications (UAE ICP).
        </li>
        <li>
          <strong>Infrastructure providers</strong> (Vercel, Neon, Upstash) under strict DPAs.
        </li>
      </ul>
      <p>We do not sell your personal data. Ever.</p>

      <h2>4. International transfers</h2>
      <p>
        Some of our infrastructure providers are based outside the UAE. All transfers are protected
        by standard contractual clauses or equivalent safeguards.
      </p>

      <h2>5. Your rights</h2>
      <ul>
        <li>Access — request a copy of your data.</li>
        <li>Rectification — correct inaccurate data.</li>
        <li>Erasure — request deletion (subject to legal retention requirements).</li>
        <li>Portability — receive your data in a machine-readable format.</li>
        <li>Object — opt out of marketing at any time.</li>
      </ul>
      <p>
        Contact <a href="mailto:privacy@aerovy.travel">privacy@aerovy.travel</a> to exercise any
        right.
      </p>

      <h2>6. Retention</h2>
      <p>
        Booking data is retained for 7 years (UAE tax/commercial law). Marketing consent is retained
        until withdrawn. Anonymised analytics are retained indefinitely.
      </p>

      <h2>7. Security</h2>
      <p>
        TLS 1.3 in transit, AES-256 at rest. Two-factor authentication on all staff accounts.
        Regular third-party penetration testing.
      </p>

      <h2>8. Children</h2>
      <p>
        We do not knowingly collect data from children under 16. Bookings that include minors are
        made by a responsible adult; minor details (name, DOB) are stored only to fulfil the
        booking.
      </p>

      <h2>9. Cookies</h2>
      <p>
        See our <a href="/cookies">Cookie Policy</a> for details on the cookies and similar
        technologies we use.
      </p>

      <h2>10. Contact our DPO</h2>
      <p>
        Data Protection Officer: Ravi Menon ·{" "}
        <a href="mailto:dpo@aerovy.travel">dpo@aerovy.travel</a> · +971 2 555 0101
      </p>
    </LegalPage>
  );
}
