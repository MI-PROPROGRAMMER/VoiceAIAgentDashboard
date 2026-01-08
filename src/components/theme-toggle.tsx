"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      {isDark ? (
        <i className="lni lni-sun text-lg" aria-hidden />
      ) : (
        <i className="lni lni-night text-lg" aria-hidden />
      )}
    </Button>
  );
}
