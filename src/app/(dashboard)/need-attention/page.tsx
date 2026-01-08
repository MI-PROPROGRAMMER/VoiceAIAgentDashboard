"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CallCard } from "@/components/dashboard/call-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          <Button variant="outline" size="sm" className="gap-2">
            <i className="lni lni-clipboard" aria-hidden />
            Assign
          </Button>
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

      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-amber-200 bg-amber-50 px-4 py-4 dark:border-amber-900/50 dark:bg-amber-950/30 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Improve resolution speed
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Route urgent calls directly to a human or schedule callbacks automatically.
          </p>
        </div>
        <Link href="/settings" className="text-sm font-medium text-amber-800 hover:underline dark:text-amber-300">
          Update routing →
        </Link>
      </div>
    </div>
  );
}
