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

  const handleExport = (format: "json" | "csv") => {
    // Prepare data for export (only visible fields on the page)
    const exportData = filtered.map((call) => ({
      id: call.id,
      customerName: call.customerName,
      agentName: call.agentName,
      tags: call.tags.join(", "),
      datetime: call.datetime,
      durationMinutes: call.durationMinutes,
      summary: call.summary,
      requiresHandoff: call.requiresHandoff || false,
      sentiment: call.sentiment || "N/A",
    }));

    if (format === "json") {
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `conversations-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      // Convert to CSV
      const headers = [
        "ID",
        "Customer Name",
        "Agent Name",
        "Tags",
        "Date/Time",
        "Duration (minutes)",
        "Summary",
        "Requires Handoff",
        "Sentiment",
      ];
      const csvRows = [
        headers.join(","),
        ...exportData.map((row) =>
          [
            row.id,
            `"${row.customerName.replace(/"/g, '""')}"`,
            `"${row.agentName.replace(/"/g, '""')}"`,
            `"${row.tags.replace(/"/g, '""')}"`,
            row.datetime,
            row.durationMinutes,
            `"${row.summary.replace(/"/g, '""')}"`,
            row.requiresHandoff,
            row.sentiment,
          ].join(",")
        ),
      ];
      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `conversations-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

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
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              // Show a simple menu or directly export CSV (most common)
              handleExport("csv");
            }}
          >
            <i className="lni lni-download" aria-hidden />
            Export
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
