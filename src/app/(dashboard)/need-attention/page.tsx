"use client";

import { useMemo, useState } from "react";

import { CallCard } from "@/components/dashboard/call-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { calls } from "@/lib/mock-data";
import { groupByDate } from "@/lib/utils";

export default function NeedAttentionPage() {
  const [query, setQuery] = useState("");

  const handoffs = useMemo(
    () => {
      const filtered = calls.filter(
        (call) =>
          call.requiresHandoff &&
          (query.length === 0 ||
            call.phone.toLowerCase().includes(query.toLowerCase()) ||
            (call.customerName && call.customerName.toLowerCase().includes(query.toLowerCase())) ||
            call.summary.toLowerCase().includes(query.toLowerCase()))
      );
      // Sort by datetime (newest first)
      return filtered.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    },
    [query]
  );

  const groupedHandoffs = useMemo(() => {
    return groupByDate(handoffs);
  }, [handoffs]);

  return (
    <div className="space-y-8">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Need attention</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Handoffs requiring callback
        </h1>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-muted/40 p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="warning">{handoffs.length} open</Badge>
          <p className="text-sm text-muted-foreground">
            Assign owners and clear the queue.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search callbacks..."
            className="w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {groupedHandoffs.length > 0 ? (
          groupedHandoffs.map((group) => (
            <div key={group.dateKey} className="space-y-4">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b border-border/50">
                <h2 className="text-sm font-semibold text-muted-foreground">
                  {group.dateLabel}
                </h2>
              </div>
              <div className="space-y-4">
                {group.items.map((call) => (
                  <CallCard key={call.id} call={call} href={`/calls/${call.id}`} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            All handoffs are cleared. Great work!
          </div>
        )}
      </div>

    </div>
  );
}
