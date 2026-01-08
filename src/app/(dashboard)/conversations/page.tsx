"use client";

import { useMemo, useState } from "react";

import { CallCard } from "@/components/dashboard/call-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calls } from "@/lib/mock-data";

const TAGS = ["all", "appointment", "handoff", "general", "completed", "incomplete"];

export default function ConversationsPage() {
  const [tag, setTag] = useState<string>("all");
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    return calls.filter((call) => {
      const matchesTag = tag === "all" || call.tags.includes(tag as any);
      const matchesQuery =
        query.length === 0 ||
        call.summary.toLowerCase().includes(query.toLowerCase()) ||
        call.customerName.toLowerCase().includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [query, tag]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-muted-foreground">Conversations</p>
          <h1 className="text-xl font-semibold tracking-tight">
            Call history & transcripts
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <i className="lni lni-download" aria-hidden />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <i className="lni lni-plus" aria-hidden />
            New booking
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-muted/40 p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {TAGS.map((item) => (
            <Badge
              key={item}
              variant={item === tag ? "default" : "neutral"}
              className="cursor-pointer select-none capitalize"
              onClick={() => setTag(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search calls..."
            className="w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" aria-label="Filter">
            <i className="lni lni-funnel text-lg" aria-hidden />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((call) => (
          <CallCard key={call.id} call={call} href={`/calls/${call.id}`} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            No calls match that filter yet.
          </div>
        )}
      </div>
    </div>
  );
}
