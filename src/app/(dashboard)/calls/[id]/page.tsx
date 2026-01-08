"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calls } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

const tagVariantMap: Record<string, "default" | "neutral" | "warning" | "destructive" | "success"> =
  {
    appointment: "success",
    completed: "neutral",
    general: "neutral",
    handoff: "warning",
    incomplete: "destructive",
  };

export default async function CallDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const call = calls.find((item) => item.id === id);

  if (!call) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/conversations" className="text-xs text-primary hover:underline">
            ← Back to calls
          </Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">{call.customerName}</h1>
          <p className="text-sm text-muted-foreground">
            {formatDateTime(call.datetime)} · {call.durationMinutes}m · {call.agentName}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {call.tags.map((tag) => (
              <Badge key={tag} variant={tagVariantMap[tag] ?? "default"}>
                {tag}
              </Badge>
            ))}
            {call.requiresHandoff ? (
              <Badge variant="warning">Needs callback</Badge>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <i className="lni lni-headphone-alt" aria-hidden />
            Play recording
          </Button>
          <Button size="sm" className="gap-2">
            <i className="lni lni-share" aria-hidden />
            Share
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{call.summary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Transcript</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {call.transcript.map((line, idx) => (
              <div
                key={`${line.speaker}-${idx}`}
                className="rounded-lg border border-border/70 bg-muted/40 px-3 py-3"
              >
                <p className="text-xs font-semibold text-muted-foreground">{line.speaker}</p>
                <p className="text-sm text-foreground">{line.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Call Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Call ID</span>
              <span className="font-semibold text-foreground">{call.id}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Duration</span>
              <span className="font-semibold text-foreground">{call.durationMinutes} minutes</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Agent</span>
              <span className="font-semibold text-foreground">{call.agentName}</span>
            </div>
            {call.sentiment && (
              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
                <span>Sentiment</span>
                <span className="font-semibold text-foreground">{call.sentiment}</span>
              </div>
            )}
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Call cost</span>
              <span className="font-semibold text-foreground">
                {call.callCost ? `$${call.callCost.toFixed(2)}` : "Pending"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Recording</span>
              <span className="font-semibold text-foreground">
                {call.recordingUrl ? "Available" : "Pending"}
              </span>
            </div>
            {call.requiresHandoff ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
                Requires human follow-up. Add a note or assign a callback owner.
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
