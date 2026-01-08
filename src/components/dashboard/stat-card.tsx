import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  helper?: string;
  icon?: string;
  accent?: "primary" | "muted" | "warning";
};

export function StatCard({
  title,
  value,
  helper,
  icon = "lni lni-bar-chart",
  accent = "primary",
}: StatCardProps) {
  const accentClass =
    accent === "warning"
      ? "text-amber-700 bg-amber-500/15"
      : accent === "muted"
        ? "text-muted-foreground bg-muted"
        : "text-primary bg-primary/10";

  return (
    <Card className="h-full border-border/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", accentClass)}>
          <i className={cn(icon, "text-base")} aria-hidden />
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
        {helper ? (
          <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
