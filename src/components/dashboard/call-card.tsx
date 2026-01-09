"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Call } from "@/lib/mock-data";
import { cn, formatDateTime } from "@/lib/utils";

type CallCardProps = {
  call: Call;
  href?: string;
  compact?: boolean;
};

const tagVariantMap: Record<string, "default" | "neutral" | "warning" | "destructive" | "success"> =
  {
    appointment: "success",
    "call completed": "neutral",
    general: "neutral",
    handoff: "warning",
    "call incomplete": "destructive",
    confirmed: "success",
    pending: "warning",
    rescheduled: "neutral",
  };

export function CallCard({ call, href, compact }: CallCardProps) {
  // Determine visual styling based on call data
  const hasHandoff = call.requiresHandoff;
  const hasAppointment = call.tags.includes("appointment");
  const isCallIncomplete = call.tags.includes("call incomplete");
  const sentimentColor = call.sentiment === "Positive" 
    ? "border-l-emerald-500" 
    : call.sentiment === "Negative" 
    ? "border-l-destructive" 
    : "border-l-blue";
  
  const borderAccent = hasHandoff 
    ? "border-l-amber-500" 
    : hasAppointment 
    ? "border-l-emerald-500" 
    : isCallIncomplete 
    ? "border-l-destructive" 
    : sentimentColor;

  const content = (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg border-l-4",
        compact ? "border-dashed" : "border",
        borderAccent
      )}
    >
      <CardContent className="p-6 flex flex-col">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-base font-semibold text-foreground">
                {call.customerName
                  ? `${call.phone} (${call.customerName})`
                  : call.phone}
              </p>
              {call.tags.map((tag) => (
                <Badge key={tag} variant={tagVariantMap[tag] ?? "default"}>
                  {tag}
                </Badge>
              ))}
              {call.requiresHandoff ? (
                <Badge variant="warning">Needs callback</Badge>
              ) : null}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {call.summary}
            </p>
            {call.sentiment ? (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <i className="lni lni-smile text-sm" aria-hidden />
                {call.sentiment}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2 text-right shrink-0">
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDateTime(call.datetime)}
            </p>
            <p className="text-sm font-medium text-foreground">
              {call.durationMinutes}m
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
