"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarCheck,
  Map,
  Package,
  Users,
  Star,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  FileText,
  Tag,
  UserCog,
} from "lucide-react";
import { Button } from "@aerovy/ui";
import { AdminToaster } from "@/components/admin/toaster";
import { useNotificationStore, unreadCount } from "@/lib/store/notifications";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/experiences", label: "Experiences", icon: Map },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/promotions", label: "Promotions", icon: Tag },
  { href: "/admin/staff", label: "Staff", icon: UserCog },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const adminStyles = `
  .admin-dark { background-color: #0A0C10; color: white; }
  .admin-sidebar { background-color: #0D1117; border-color: rgba(255,255,255,0.1); }
  .admin-card { background-color: #161B22; border-color: rgba(255,255,255,0.1); }
  .admin-input { background-color: #0D1117; border-color: rgba(255,255,255,0.1); color: white; }
  .admin-input:focus { border-color: #CDA020; }
  .admin-accent { color: #CDA020; }
  .admin-accent-bg { background-color: rgba(205, 160, 32, 0.15); }
  .admin-button { background-color: #CDA020; color: black; }
  .admin-button:hover { background-color: rgba(205, 160, 32, 0.9); }
  .admin-text-muted { color: rgba(255,255,255,0.6); }
  .admin-text-secondary { color: rgba(255,255,255,0.7); }
  .admin-border { border-color: rgba(255,255,255,0.1); }
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notifications = useNotificationStore((s) => s.items);
  const unread = unreadCount(notifications);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("aerovy_admin_token") : null;
    if (!token && !pathname.includes("/login")) {
      router.push("/admin/login");
      setIsAuthenticated(false);
    } else if (token || pathname.includes("/login")) {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname.includes("/login")) {
    return (
      <>
        <style>{adminStyles}</style>
        {children}
      </>
    );
  }

  if (isAuthenticated === null)
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-dark flex h-screen">
        {/* Sidebar */}
        <aside
          className={`admin-sidebar fixed top-0 left-0 z-40 h-screen w-64 transition-transform md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="admin-border flex h-full flex-col border-r">
            <div className="admin-border border-b px-6 py-4">
              <h1 className="admin-accent text-lg font-bold">Aerovy Admin</h1>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm no-underline transition-colors ${
                      isActive
                        ? "admin-accent-bg admin-accent"
                        : "admin-text-secondary hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="admin-sidebar admin-border border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </Button>
                <h2 className="text-lg font-semibold capitalize">
                  {pathname.split("/").pop() || "Dashboard"}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/notifications"
                  aria-label={`Notifications, ${unread} unread`}
                  className="relative inline-flex size-9 items-center justify-center rounded-md hover:bg-white/5"
                >
                  <Bell className="size-4" aria-hidden="true" />
                  {unread > 0 && (
                    <span className="admin-button absolute -top-1 -right-1 min-w-[18px] rounded-full px-1 text-center text-[10px] leading-[18px] font-bold">
                      {unread}
                    </span>
                  )}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem("aerovy_admin_token");
                    router.push("/admin/login");
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">{children}</div>
          </main>
          <AdminToaster />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
