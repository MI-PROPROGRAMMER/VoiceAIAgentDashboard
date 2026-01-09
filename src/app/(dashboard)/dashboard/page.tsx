"use client";

import Link from "next/link";

import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { CallCard } from "@/components/dashboard/call-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import {
  appointments,
  calls,
  recentBookings,
  schedules,
  stats,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const recentCalls = calls.slice(0, 4);
  const handoffCalls = calls.filter((call) => call.requiresHandoff).slice(0, 3);
  const upcomingAppointments = appointments.slice(0, 3);
  const conversionTrend = [22, 28, 26, 32, 35, 36, 38, 40];

  return (
    <div className="space-y-8">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Welcome back</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Voice AI performance at a glance
        </h1>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Appointments"
          value={stats.totalAppointments.toString()}
          helper="Booked through the AI agent"
          icon="calendar"
          href="/appointments"
        />
        <StatCard
          title="Conversion rate"
          value={`${stats.conversionRate}%`}
          helper="Call → booking conversion"
          icon="pulse"
        />
        <StatCard
          title="Total calls"
          value={stats.totalCalls.toString()}
          helper="Last 30 days"
          icon="headphone"
          href="/conversations"
        />
        <StatCard
          title="Handoffs"
          value={stats.handoffs.toString()}
          helper="Needing callbacks"
          icon="flag"
          accent="warning"
          href="/need-attention"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1.5">
              <CardTitle className="text-lg font-bold">Recent calls</CardTitle>
              <p className="text-sm text-muted-foreground">
                Summaries, tags, and quick handoff visibility.
              </p>
            </div>
            <Link href="/conversations" className="text-sm text-blue hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {recentCalls.map((call) => (
              <CallCard key={call.id} call={call} href={`/calls/${call.id}`} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold">Today&apos;s schedules</CardTitle>
            <Link href="/appointments" className="text-sm text-blue hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {schedules.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-lg bg-muted/40 px-4 py-4"
              >
                <span className="rounded-md bg-blue/10 px-3 py-1.5 text-xs font-semibold text-blue">
                  {item.time}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold">Recent bookings</CardTitle>
            <Link href="/appointments" className="text-sm text-blue hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-card/70 px-3 py-2 shadow-sm"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-sm font-semibold truncate">{booking.customer}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {booking.service} · {booking.date} · {booking.time}
                  </p>
                </div>
                <Badge variant="neutral" className="shrink-0">New</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold">Handoffs</CardTitle>
            <Link href="/need-attention" className="text-sm text-blue hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
            {handoffCalls.map((call) => (
              <div
                key={call.id}
                className="w-full rounded-lg border border-dashed border-amber-200 bg-amber-50 px-2.5 py-2 dark:border-amber-900/50 dark:bg-amber-950/30 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <p className="text-xs font-semibold line-clamp-1 min-w-0 flex-1">
                    {call.customerName
                      ? `${call.phone} (${call.customerName})`
                      : call.phone}
                  </p>
                  <Badge variant="warning" className="text-xs shrink-0">Needs callback</Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {call.summary}
                </p>
                <Link
                  href={`/calls/${call.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:underline dark:text-amber-400"
                >
                  Open call
                  <i className="lni lni-chevron-right text-xs" aria-hidden />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold">Appointments</CardTitle>
            <Link href="/appointments" className="text-sm text-blue hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {upcomingAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                href={`/calls/${apt.callId}`}
              />
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-4 space-y-0 md:flex-row md:items-center md:justify-between pb-4">
          <div className="space-y-1.5">
            <CardTitle className="text-lg font-bold">
              Call-to-booking conversion
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track how many calls turn into appointments. Tune scripts and routing to improve.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" disabled>
            <i className="lni lni-stats-up text-base" aria-hidden />
            View report
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <div>
              <p className="text-sm text-muted-foreground">This week</p>
              <p className="text-3xl font-semibold">{stats.conversionRate}%</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <i className="lni lni-trending-up" aria-hidden />
              +3.2% vs last week
            </div>
            <div className="w-full max-w-md">
              <TrendChart data={conversionTrend} color="emerald" />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border/70 bg-muted/40 p-4">
              <p className="text-sm font-semibold mb-2">Booking-ready calls</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                54 calls contained booking intent; 18 converted.
              </p>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/40 p-4">
              <p className="text-sm font-semibold mb-2">Callbacks required</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {stats.handoffs} calls need human follow-up to close.
              </p>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/40 p-4">
              <p className="text-sm font-semibold mb-2">Avg. handling time</p>
              <p className="text-xs leading-relaxed text-muted-foreground">9m 30s per call</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
