"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useNotificationStore } from "@/lib/store/notifications";

// Shows the newest unread notifications as dismissible toasts on every admin page.
// Dismissing a toast marks that notification as read.
export function AdminToaster() {
  const items = useNotificationStore((s) => s.items);
  const markRead = useNotificationStore((s) => s.markRead);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visible = items.filter((n) => !n.read && !dismissed.includes(n.id)).slice(0, 3);

  if (visible.length === 0) return null;

  const dismiss = (id: string) => {
    setDismissed((d) => [...d, id]);
    markRead(id);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex w-80 flex-col gap-3" aria-live="polite">
      {visible.map((n) => (
        <div
          key={n.id}
          role="status"
          className="admin-card admin-border flex items-start gap-3 rounded-lg border p-4 shadow-xl"
        >
          <div className="flex-1">
            <p className="admin-accent text-sm font-semibold">{n.title}</p>
            <p className="admin-text-secondary mt-1 text-xs">{n.message}</p>
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dismiss(n.id)}
            className="admin-text-muted hover:text-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
