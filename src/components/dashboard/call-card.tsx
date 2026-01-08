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
      <CardContent className="p-6 flex flex-col">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-base font-semibold text-foreground">
                {call.customerName}
              </p>
              <Badge variant="neutral">{call.agentName}</Badge>
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
            {href ? (
              <div className="flex justify-start mt-8 pt-0">
                <span className="text-sm font-medium text-primary group-hover:underline">
                  View →
                </span>
              </div>
            ) : null}
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
