import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cancellation policy" };

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation policy" lastUpdated="24 April 2026">
      <p>
        We want you to feel comfortable booking with us. This policy explains when and how you can
        cancel, and what refunds you&rsquo;re entitled to.
      </p>

      <h2>1. Experiences</h2>
      <ul>
        <li>
          <strong>More than 24 hours before start time:</strong> full refund, no questions.
        </li>
        <li>
          <strong>24 hours or less:</strong> non-refundable unless the experience is marked
          &ldquo;Flexible&rdquo; at checkout.
        </li>
        <li>
          Some premium or private experiences (e.g., private yacht, Liwa overnight) have 72-hour
          cancellation windows — this is shown clearly before you pay.
        </li>
      </ul>

      <h2>2. Hotels</h2>
      <p>
        Hotel cancellation windows vary by rate type. &ldquo;Flexible&rdquo; rates allow free
        cancellation up to 48 hours before check-in. &ldquo;Saver&rdquo; rates are non-refundable.
        The applicable rate is shown in the booking summary.
      </p>

      <h2>3. Flights</h2>
      <p>
        Flights are subject to the operating airline&rsquo;s fare rules. We show these at booking.
        Most &ldquo;Economy Lite&rdquo; fares are non-refundable but changeable; most
        &ldquo;Flex&rdquo; fares are fully refundable. Our service fee is refunded in full if we
        cancel the booking on your behalf within 24 hours.
      </p>

      <h2>4. Transfers</h2>
      <p>Free cancellation up to 12 hours before pickup.</p>

      <h2>5. Packages</h2>
      <p>
        Curated packages follow the strictest rule among their components. If a package includes a
        non-refundable hotel rate, that portion cannot be refunded, but experience and transfer
        components retain their own rules.
      </p>

      <h2>6. Force majeure</h2>
      <p>
        We honour full refunds when travel becomes impossible due to events outside reasonable
        control (government travel bans, severe weather, medical emergencies with documentation).
        Contact our concierge as soon as you&rsquo;re aware.
      </p>

      <h2>7. How to cancel</h2>
      <ul>
        <li>
          Via <a href="/account">your account</a> — one click on any upcoming booking.
        </li>
        <li>By WhatsApp — message us with your reference number.</li>
        <li>
          By email to <a href="mailto:hello@aerovy.travel">hello@aerovy.travel</a>.
        </li>
      </ul>

      <h2>8. How quickly you get your money back</h2>
      <p>
        Refunds are issued to the original payment method within 1 business day of approval. Card
        issuers typically show the refund within 5–10 business days.
      </p>
    </LegalPage>
  );
}
