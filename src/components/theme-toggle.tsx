"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        "relative border-2 transition-all duration-200",
        isDark
          ? "border-blue/30 bg-blue/10 hover:bg-blue/20 hover:border-blue/50"
          : "border-blue/20 bg-blue/5 hover:bg-blue/10 hover:border-blue/40"
      )}
    >
      {isDark ? (
        <i className="lni lni-sun text-lg text-blue" aria-hidden />
      ) : (
        <i className="lni lni-night text-lg text-blue" aria-hidden />
      )}
    </Button>
  );
}
