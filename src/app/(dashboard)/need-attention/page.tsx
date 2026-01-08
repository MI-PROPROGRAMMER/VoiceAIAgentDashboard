"use client";

import { useMemo, useState } from "react";

import { CallCard } from "@/components/dashboard/call-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { calls } from "@/lib/mock-data";

export default function NeedAttentionPage() {
  const [query, setQuery] = useState("");

  const handoffs = useMemo(
    () =>
      calls.filter(
        (call) =>
          call.requiresHandoff &&
          (query.length === 0 ||
            call.customerName.toLowerCase().includes(query.toLowerCase()) ||
            call.summary.toLowerCase().includes(query.toLowerCase()))
      ),
    [query]
  );

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

      <div className="space-y-4">
        {handoffs.map((call) => (
          <CallCard key={call.id} call={call} href={`/calls/${call.id}`} />
        ))}
        {handoffs.length === 0 && (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            All handoffs are cleared. Great work!
          </div>
        )}
      </div>

    </div>
  );
}
