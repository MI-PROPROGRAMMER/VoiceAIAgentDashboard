"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    completed: "neutral",
    general: "neutral",
    handoff: "warning",
    incomplete: "destructive",
  };

export function CallCard({ call, href, compact }: CallCardProps) {
  const content = (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        compact ? "border-dashed" : "border"
      )}
    >
      <CardContent className="space-y-3 p-5">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {call.customerName}
              </p>
              <Badge variant="neutral">{call.agentName}</Badge>
              {call.tags.map((tag) => (
                <Badge key={tag} variant={tagVariantMap[tag] ?? "default"}>
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(call.datetime)} · {call.durationMinutes}m
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {call.summary}
            </p>
          </div>
          {call.requiresHandoff ? (
            <Badge variant="warning">Needs callback</Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {call.sentiment ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
              <i className="lni lni-smile text-[15px]" aria-hidden />
              {call.sentiment}
            </span>
          ) : null}
          {call.callCost ? <span>Cost: ${call.callCost.toFixed(2)}</span> : null}
        </div>

        {href ? (
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium text-primary group-hover:underline">
              View details
            </span>
          </div>
        ) : null}
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
