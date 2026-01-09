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
import { formatDateTime } from "@/lib/utils";

const tagVariantMap: Record<string, "default" | "neutral" | "warning" | "destructive" | "success"> =
  {
    appointment: "success",
    completed: "neutral",
    general: "neutral",
    handoff: "warning",
    incomplete: "destructive",
  };

export default function CallDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [copied, setCopied] = useState(false);
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
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }, 100);
  };

  const handleDownloadRecording = () => {
    if (hasRecording) {
      window.open(call.recordingUrl, "_blank");
    }
  };

  const handleCopyCallId = async () => {
    await navigator.clipboard.writeText(call.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <Link href="/conversations" className="text-xs text-blue hover:underline">
            ← Back to calls
          </Link>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-semibold tracking-tight">
              {call.customerName
                ? `${call.phone} (${call.customerName})`
                : call.phone}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
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
          <p className="mt-2 text-sm text-muted-foreground">
            {formatDateTime(call.datetime)}
          </p>
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
            {call.transcript.map((line, idx) => {
              const isAgent = line.speaker === "Agent";
              return (
                <div
                  key={`${line.speaker}-${idx}`}
                  className={`flex ${isAgent ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                      isAgent
                        ? "bg-muted/60 text-foreground"
                        : "bg-blue/10 text-foreground"
                    }`}
                  >
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      {line.speaker}
                    </p>
                    <p className="text-sm">{line.text}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Call Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <span>Call ID</span>
              <button
                onClick={handleCopyCallId}
                className="font-semibold text-foreground hover:text-blue transition-colors cursor-pointer flex items-center gap-1.5"
                title="Click to copy Call ID"
              >
                <span>{call.id}</span>
                <i className={`lni ${copied ? "lni-checkmark text-green-600" : "lni-files"} text-sm`} aria-hidden />
              </button>
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
