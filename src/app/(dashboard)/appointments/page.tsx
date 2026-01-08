"use client";

import { useMemo, useState } from "react";

import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { appointments } from "@/lib/mock-data";

const STATUS = ["all", "confirmed", "pending", "rescheduled"] as const;

export default function AppointmentsPage() {
  const [status, setStatus] = useState<(typeof STATUS)[number]>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      appointments.filter((item) => {
        const matchesStatus = status === "all" || item.status === status;
        const matchesQuery =
          query.length === 0 ||
          item.customerName.toLowerCase().includes(query.toLowerCase()) ||
          item.summary.toLowerCase().includes(query.toLowerCase());
        return matchesStatus && matchesQuery;
      }),
    [query, status]
  );

  return (
    <div className="space-y-5">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Appointments</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Bookings connected to voice calls
        </h1>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-muted/40 p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS.map((item) => (
            <Badge
              key={item}
              variant={item === status ? "default" : "neutral"}
              className="cursor-pointer select-none capitalize"
              onClick={() => setStatus(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Search bookings..."
          className="w-full max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            href={`/conversations/${appointment.callId}`}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            No appointments match that filter.
          </div>
        )}
      </div>
    </div>
  );
}
