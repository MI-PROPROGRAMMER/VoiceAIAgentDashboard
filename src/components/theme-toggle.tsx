"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isDark ? "bg-primary" : "bg-muted"
      )}
      aria-label="Toggle color theme"
    >
      <span
        className={cn(
          "pointer-events-none inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-background shadow-sm ring-0 transition duration-200 ease-in-out",
          isDark ? "translate-x-5" : "translate-x-0"
        )}
      >
        {isDark ? (
          <i className="lni lni-night text-[10px] text-primary" aria-hidden />
        ) : (
          <i className="lni lni-sun text-[10px] text-amber-500" aria-hidden />
        )}
      </span>
    </button>
  );
}
