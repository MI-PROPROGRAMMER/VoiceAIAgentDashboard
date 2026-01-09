"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Appointment, Call } from "@/lib/mock-data";
import { calls } from "@/lib/mock-data";
import { tagVariantMap } from "@/lib/tag-variants";
import { cn, formatDateTime } from "@/lib/utils";

type AppointmentCardProps = {
  appointment: Appointment;
  href?: string;
};

const statusVariant: Record<Appointment["status"], "success" | "warning" | "neutral"> = {
  confirmed: "success",
  pending: "warning",
  rescheduled: "neutral",
};

export function AppointmentCard({ appointment, href }: AppointmentCardProps) {
  // Get the related call to show tags and other info
  const relatedCall: Call | undefined = calls.find((call) => call.id === appointment.callId);
  
  // Determine visual styling based on appointment status and related call
  const statusBorderColor = 
    appointment.status === "confirmed" 
      ? "border-l-emerald-500" 
      : appointment.status === "pending" 
      ? "border-l-amber-500" 
      : "border-l-blue";
  
  // Use call's border color if available, otherwise use status color
  const hasHandoff = relatedCall?.requiresHandoff;
  const hasAppointmentTag = relatedCall?.tags.includes("appointment");
  const isCallIncomplete = relatedCall?.tags.includes("call incomplete");
  const sentimentColor = relatedCall?.sentiment === "Positive" 
    ? "border-l-emerald-500" 
    : relatedCall?.sentiment === "Negative" 
    ? "border-l-destructive" 
    : "border-l-blue";
  
  const borderAccent = hasHandoff 
    ? "border-l-amber-500" 
    : hasAppointmentTag 
    ? "border-l-emerald-500" 
    : isCallIncomplete 
    ? "border-l-destructive" 
    : relatedCall 
    ? sentimentColor 
    : statusBorderColor;

  // Format appointment date/time
  const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
  const formattedDate = formatDateTime(appointmentDateTime.toISOString());

  const content = (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg border-l-4",
        borderAccent
      )}
    >
      <CardContent className="p-6 flex flex-col">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-base font-semibold text-foreground">
                {appointment.customerName
                  ? `${appointment.phone} (${appointment.customerName})`
                  : appointment.phone}
              </p>
              {relatedCall?.tags.map((tag) => (
                <Badge key={tag} variant={tagVariantMap[tag] ?? "default"}>
                  {tag}
                </Badge>
              ))}
              <Badge variant={statusVariant[appointment.status]}>
                {appointment.status}
              </Badge>
              {relatedCall?.requiresHandoff && !relatedCall.tags.includes("handoff") && (
                <Badge variant="warning">Needs callback</Badge>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {appointment.summary}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5">
                <i className="lni lni-calendar" aria-hidden />
                {appointment.date}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5">
                <i className="lni lni-timer" aria-hidden />
                {appointment.time}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5">
                <i className="lni lni-briefcase" aria-hidden />
                {appointment.service}
              </span>
            </div>
            {relatedCall?.sentiment && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <i className="lni lni-smile text-sm" aria-hidden />
                {relatedCall.sentiment}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 text-right shrink-0">
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {formattedDate}
            </p>
            {relatedCall && (
              <p className="text-sm font-medium text-foreground">
                {relatedCall.durationMinutes}m
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
