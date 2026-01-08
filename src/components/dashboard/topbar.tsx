"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Button } from "../ui/button";

type NavItem = {
  label: string;
  href: string;
};

type TopbarProps = {
  onToggleSidebar: () => void;
  navItems: NavItem[];
  userEmail?: string;
};

export function Topbar({ onToggleSidebar, navItems, userEmail }: TopbarProps) {
  const pathname = usePathname();

  const active = useMemo(
    () =>
      navItems.find(
        (item) => pathname === item.href || pathname?.startsWith(item.href)
      ),
    [navItems, pathname]
  );

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <i className="lni lni-menu text-lg" aria-hidden />
        </Button>

        <div className="flex flex-1 items-center gap-3">
          <div className="hidden flex-col sm:flex">
            <p className="text-xs text-muted-foreground">Overview</p>
            <p className="text-sm font-semibold">
              {active?.label ?? "Dashboard"}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <i className="lni lni-alarm text-base" aria-hidden />
            </Button>
            <div className="hidden items-center gap-2 rounded-full border border-border bg-muted/50 px-2.5 py-1 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <i className="lni lni-user text-sm" aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground leading-tight">Signed in</span>
                <span className="text-xs font-medium leading-tight">
                  {userEmail || "user@company.com"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
