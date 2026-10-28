import type { AdminBooking } from "./mock";

// SheetJS is loaded on demand so it only ships with the admin screens that export.
export async function exportBookingsXlsx(rows: AdminBooking[], filename = "aerovy-bookings.xlsx") {
  const XLSX = await import("xlsx");
  const data = rows.map((b) => ({
    "Booking ID": b.id,
    Customer: b.customer,
    Experience: b.experience,
    Date: b.dateISO.slice(0, 10),
    "Amount (AED)": b.amount,
    Status: b.status,
  }));
  const sheet = XLSX.utils.json_to_sheet(data);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Bookings");
  XLSX.writeFile(book, filename);
}
