import { cn } from "@/lib/utils";

type TrendChartProps = {
  data: number[];
  color?: "primary" | "amber" | "emerald";
};

export function TrendChart({ data, color = "primary" }: TrendChartProps) {
  const max = Math.max(...data, 1);
  const palette: Record<typeof color, string> = {
    primary: "from-primary/40 via-primary/20 to-primary/5",
    amber: "from-amber-500/50 via-amber-400/25 to-amber-100/10",
    emerald: "from-emerald-500/50 via-emerald-400/25 to-emerald-100/10",
  };

  return (
    <div className="relative h-24 w-full overflow-hidden rounded-lg bg-muted/50">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          palette[color] ?? palette.primary,
        )}
      />
      <div className="absolute inset-0 flex items-end gap-2 px-3 pb-2">
        {data.map((value, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t-md bg-primary/70"
            style={{
              height: `${Math.max(8, Math.round((value / max) * 100))}%`,
              opacity: 0.85 - idx * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
}
