"use client";

import { useMemo, useState } from "react";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail?: string;
};

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "lni lni-grid-alt" },
  { label: "Conversations", href: "/conversations", icon: "lni lni-phone" },
  { label: "Need Attention", href: "/need-attention", icon: "lni lni-flag" },
  { label: "Appointments", href: "/appointments", icon: "lni lni-calendar" },
  { label: "Link in Bio", href: "/link-in-bio", icon: "lni lni-link" },
  { label: "Pricing", href: "/pricing", icon: "lni lni-offer" },
  { label: "Settings", href: "/settings", icon: "lni lni-cog" },
];

export function DashboardShell({ children, userEmail }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = useMemo(() => NAV_ITEMS, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/50 text-foreground">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
      />

      <div className="flex min-h-screen flex-col lg:pl-72">
        <Topbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          navItems={navItems}
          userEmail={userEmail}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
