"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
};

export function Sidebar({ open, onClose, navItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <i className="lni lni-mic text-xl" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">Voice AI</p>
            <p className="text-xs text-muted-foreground truncate">Agent Dashboard</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                )}
              >
                <i className={cn("text-lg", item.icon)} aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-sidebar-border px-4 py-4">
          <div className="rounded-lg border border-sidebar-border bg-sidebar px-3 py-3">
            <p className="text-sm font-semibold">Need help?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Access docs or chat with support.
            </p>
            <Link
              href="#"
              className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
            >
              <i className="lni lni-life-ring text-sm" aria-hidden />
              Open support
            </Link>
          </div>
        </div>
      </div>

      {open ? (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      ) : null}
    </>
  );
}
