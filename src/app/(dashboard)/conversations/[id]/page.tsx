"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calls } from "@/lib/mock-data";
import { tagVariantMap } from "@/lib/tag-variants";
import { formatDateTime } from "@/lib/utils";

export default function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const call = calls.find((item) => item.id === id);

  if (!call) {
    notFound();
  }

  const hasRecording = call.recordingUrl && call.recordingUrl !== "#";

  const handlePlayRecording = () => {
    setShowPlayer(true);
    // Auto-play when player is shown
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Audio playback failed - user interaction may be required
        });
      }
    }, 100);
  };

  const handleDownloadRecording = () => {
    if (hasRecording) {
      window.open(call.recordingUrl, "_blank");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/conversations" className="text-xs text-blue hover:underline">
            ← Back to conversations
          </Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">
            {call.customerName
              ? `${call.phone} (${call.customerName})`
              : call.phone}
          </h1>
          <p className="text-sm text-muted-foreground">
            {formatDateTime(call.datetime)} · {call.durationMinutes}m · {call.agentName}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {call.tags.map((tag) => (
              <Badge key={tag} variant={tagVariantMap[tag] ?? "default"}>
                {tag}
              </Badge>
            ))}
            {call.requiresHandoff && !call.tags.includes("handoff") ? (
              <Badge variant="warning">Needs callback</Badge>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handlePlayRecording}
            disabled={!hasRecording}
          >
            <i className="lni lni-headphone-alt" aria-hidden />
            Play recording
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownloadRecording}
            disabled={!hasRecording}
          >
            <i className="lni lni-download" aria-hidden />
            Download
          </Button>
        </div>
      </div>

      {showPlayer && hasRecording && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Recording</CardTitle>
          </CardHeader>
          <CardContent>
            <audio
              ref={audioRef}
              src={call.recordingUrl}
              controls
              className="w-full"
            />
          </CardContent>
        </Card>
      )}

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
            <CardTitle className="text-base font-semibold">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Sentiment</span>
              <span className="font-semibold text-foreground">{call.sentiment ?? "N/A"}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Call cost</span>
              <span className="font-semibold text-foreground">
                {call.callCost ? `$${call.callCost.toFixed(2)}` : "Pending"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Recording</span>
              <span className="font-semibold text-foreground">
                {hasRecording ? "Available" : "Pending"}
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
