"use client";

import { useMemo, useState } from "react";

import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { appointments } from "@/lib/mock-data";
import { groupAppointmentsByDate } from "@/lib/utils";

const STATUS = ["all", "confirmed", "pending", "rescheduled"] as const;

export default function AppointmentsPage() {
  const [status, setStatus] = useState<(typeof STATUS)[number]>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => {
      const filteredAppointments = appointments.filter((item) => {
        const matchesStatus = status === "all" || item.status === status;
        const matchesQuery =
          query.length === 0 ||
          item.customerName.toLowerCase().includes(query.toLowerCase()) ||
          item.summary.toLowerCase().includes(query.toLowerCase());
        return matchesStatus && matchesQuery;
      });
      
      // Sort by date (newest first), then by time (earliest first)
      return filteredAppointments.sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
    },
    [query, status]
  );

  const groupedAppointments = useMemo(() => {
    return groupAppointmentsByDate(filtered);
  }, [filtered]);

  return (
    <div className="space-y-8">
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

      <div className="space-y-6">
        {groupedAppointments.length > 0 ? (
          groupedAppointments.map((group) => (
            <div key={group.dateKey} className="space-y-4">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b border-border/50">
                <h2 className="text-sm font-semibold text-muted-foreground">
                  {group.dateLabel}
                </h2>
              </div>
              <div className="space-y-4">
                {group.items.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    href={`/calls/${appointment.callId}`}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            No appointments match that filter.
          </div>
        )}
      </div>
    </div>
  );
}
