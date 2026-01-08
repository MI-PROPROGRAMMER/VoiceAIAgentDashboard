"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState, useEffect } from "react";

import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () =>
      navItems.find(
        (item) => pathname === item.href || pathname?.startsWith(item.href)
      ),
    [navItems, pathname]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl shrink-0">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <i className="lni lni-menu text-lg" aria-hidden />
        </Button>

        <div className="flex flex-1 items-center gap-3 min-w-0">
          <div className="hidden flex-col sm:flex min-w-0">
            <p className="text-xs text-muted-foreground truncate">Overview</p>
            <p className="text-sm font-semibold truncate">
              {active?.label ?? "Dashboard"}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications" className="shrink-0">
              <i className="lni lni-alarm text-lg" aria-hidden />
            </Button>
            <div className="relative hidden sm:block shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 hover:bg-muted transition-colors"
                aria-label="User menu"
                aria-expanded={isOpen}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue/10 text-blue shrink-0">
                  <i className="lni lni-user text-sm" aria-hidden />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-muted-foreground leading-tight truncate">Signed in</span>
                  <span className="text-xs font-medium leading-tight truncate">
                    {userEmail || "user@company.com"}
                  </span>
                </div>
                <i
                  className={cn(
                    "lni text-xs transition-transform",
                    isOpen ? "lni-chevron-up" : "lni-chevron-down"
                  )}
                  aria-hidden
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg py-1 z-50">
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <i className="lni lni-cog text-base" aria-hidden />
                    <span>Settings</span>
                  </Link>
                  <form action="/logout" method="post" className="w-full">
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <i className="lni lni-exit text-base" aria-hidden />
                      <span>Logout</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
