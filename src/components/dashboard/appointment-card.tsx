"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Appointment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
  const content = (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{appointment.customerName}</p>
            <p className="text-xs text-muted-foreground">{appointment.phone}</p>
          </div>
          <Badge variant={statusVariant[appointment.status]}>
            {appointment.status}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
            <i className="lni lni-calendar" aria-hidden />
            {appointment.date}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
            <i className="lni lni-timer" aria-hidden />
            {appointment.time}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
            <i className="lni lni-briefcase" aria-hidden />
            {appointment.service}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {appointment.summary}
        </p>
        {href ? (
          <div className="flex justify-end">
            <span className="text-sm font-medium text-primary hover:underline">
              View call
            </span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
