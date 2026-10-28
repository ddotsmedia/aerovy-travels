import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, subject, message, company, contactName, pax } = body;

    // Validate required fields
    if (!name || !email || !subject) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Here you would typically:
    // 1. Send email via Resend/Sendgrid
    // 2. Save to database
    // 3. Store in CRM like HubSpot

    // eslint-disable-next-line no-console -- placeholder until CRM/email is wired
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      company,
      contactName,
      pax,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "We received your message. We will get back to you soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
