import type { Metadata } from "next";
import { ConfirmationContent } from "@/components/confirmation-content";

export const metadata: Metadata = { title: "Booking confirmed" };

export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ConfirmationContent id={id} />;
}
