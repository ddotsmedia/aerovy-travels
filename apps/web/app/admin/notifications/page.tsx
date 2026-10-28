"use client";

import { CalendarCheck, CreditCard, Star, XCircle, type LucideIcon } from "lucide-react";
import { Card, CardContent, Button } from "@aerovy/ui";
import {
  useNotificationStore,
  unreadCount,
  type AdminNotification,
  type NotificationKind,
} from "@/lib/store/notifications";

const ICONS: Record<NotificationKind, LucideIcon> = {
  booking: CalendarCheck,
  cancellation: XCircle,
  payment: CreditCard,
  review: Star,
};

const timeAgo = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  return hours < 24 ? `${hours} h ago` : `${Math.round(hours / 24)} d ago`;
};

export default function NotificationsPage() {
  const items = useNotificationStore((s) => s.items);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const unread = unreadCount(items);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="mt-1 text-sm text-white/60">{unread} unread</p>
        </div>
        <Button className="admin-button" onClick={markAllRead} disabled={unread === 0}>
          Mark all as read
        </Button>
      </div>

      <Card className="admin-card admin-border border">
        <CardContent className="p-0">
          <ul className="divide-y divide-white/10">
            {items.map((n: AdminNotification) => {
              const Icon = ICONS[n.kind];
              return (
                <li
                  key={n.id}
                  className={`flex items-start gap-4 p-5 ${n.read ? "opacity-60" : ""}`}
                >
                  <span className="admin-accent-bg admin-accent flex size-9 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {n.title}
                      {!n.read && (
                        <span className="admin-accent ml-2 text-xs font-semibold">NEW</span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{n.message}</p>
                    <p className="mt-1 text-xs text-white/40">{timeAgo(n.createdAtISO)}</p>
                  </div>
                  {!n.read && (
                    <button
                      type="button"
                      onClick={() => markRead(n.id)}
                      className="text-xs text-white/60 hover:text-[#CDA020]"
                    >
                      Mark read
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
