type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const styles: Record<BookingStatus, string> = {
    Confirmed: "bg-green-500/15 text-green-400",
    Pending: "bg-yellow-500/15 text-yellow-400",
    Cancelled: "bg-red-500/15 text-red-400",
  };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
