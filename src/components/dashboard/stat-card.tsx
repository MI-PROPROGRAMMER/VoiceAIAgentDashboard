"use client";

import Link from "next/link";
import { Calendar, TrendingUp, Phone, Flag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  helper?: string;
  icon?: "calendar" | "pulse" | "headphone" | "flag";
  accent?: "primary" | "muted" | "warning";
  href?: string;
};

const iconMap = {
  calendar: Calendar,
  pulse: TrendingUp,
  headphone: Phone,
  flag: Flag,
};

export function StatCard({
  title,
  value,
  helper,
  icon = "pulse",
  accent = "primary",
  href,
}: StatCardProps) {
  const accentClass =
    accent === "warning"
      ? "text-amber-700 bg-amber-500/15"
      : accent === "muted"
        ? "text-muted-foreground bg-muted"
        : "text-blue bg-blue/10";

  const IconComponent = iconMap[icon] || TrendingUp;

  const cardContent = (
    <Card
      className={cn(
        "h-full border-border/80 transition-all duration-200",
        href && "cursor-pointer hover:shadow-md hover:border-border hover:-translate-y-0.5"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accentClass)}>
          <IconComponent className="h-5 w-5" />
        </span>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="text-3xl font-semibold">{value}</div>
        {helper ? (
          <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
        ) : null}
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
