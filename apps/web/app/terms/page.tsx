import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" lastUpdated="24 April 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Aerovy
        Travels platform, operated by Aerovy Travels FZ-LLC, a company registered in Abu Dhabi,
        United Arab Emirates (&ldquo;Aerovy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By booking
        a service or creating an account, you agree to these Terms.
      </p>

      <h2>1. Our role</h2>
      <p>
        Aerovy is a marketplace and concierge operator. For flights, hotels, and most experiences,
        we act as an agent for the third-party supplier (the &ldquo;Supplier&rdquo;). For services
        marketed as &ldquo;Aerovy Fleet&rdquo; (e.g., yacht charters, chauffeur service), we act as
        principal. The applicable model is clearly indicated at the point of booking.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be 18 or older to make a booking. Bookings for minors must be made and guaranteed
        by a responsible adult.
      </p>

      <h2>3. Pricing and payment</h2>
      <ul>
        <li>All prices are quoted in AED unless otherwise stated.</li>
        <li>
          5% UAE VAT and the Abu Dhabi Tourism Dirham Fee, where applicable, are shown inclusive.
        </li>
        <li>
          We accept Visa, Mastercard, Amex, Apple Pay, Google Pay, and bank transfer for amounts
          above AED 5,000.
        </li>
        <li>Card details are processed by Stripe; Aerovy does not store card numbers.</li>
      </ul>

      <h2>4. Cancellations and refunds</h2>
      <p>
        Cancellation terms vary by Supplier and are shown before checkout. Most experiences offer
        free cancellation up to 24 hours before the start time. See our{" "}
        <a href="/cancellation">Cancellation Policy</a> for details.
      </p>

      <h2>5. Supplier terms</h2>
      <p>
        When you book a Supplier service through Aerovy, the Supplier&rsquo;s terms apply in
        addition to ours. Aerovy is not responsible for the conduct of Suppliers, but we take
        Supplier misconduct seriously — report any issue to our concierge and we will mediate.
      </p>

      <h2>6. Visa services</h2>
      <p>
        We submit visa applications to the UAE Federal Authority for Identity, Citizenship, Customs
        & Port Security (ICP). We cannot guarantee approval. If your application is rejected, we
        refund our service fee but not the ICP government fee.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by UAE law, Aerovy&rsquo;s total liability for any claim
        arising out of a booking is limited to the amount paid for that booking. We are not liable
        for indirect or consequential losses.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Abu Dhabi Global Market (ADGM). Disputes are
        subject to the exclusive jurisdiction of the ADGM courts, save that consumers may also rely
        on mandatory protections available in their country of residence.
      </p>

      <h2>9. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be notified by email and
        on this page at least 30 days before taking effect.
      </p>

      <h2>10. Contact</h2>
      <p>
        Legal contact: <a href="mailto:legal@aerovy.travel">legal@aerovy.travel</a>. Postal address:
        Corniche Road, Al Markaziyah, Abu Dhabi, UAE.
      </p>
    </LegalPage>
  );
}
