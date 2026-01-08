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
    <div className="space-y-5">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Welcome back</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Voice AI performance at a glance
        </h1>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Appointments"
          value={stats.totalAppointments.toString()}
          helper="Booked through the AI agent"
          icon="lni lni-calendar"
        />
        <StatCard
          title="Conversion rate"
          value={`${stats.conversionRate}%`}
          helper="Call → booking conversion"
          icon="lni lni-pulse"
        />
        <StatCard
          title="Total calls"
          value={stats.totalCalls.toString()}
          helper="Last 30 days"
          icon="lni lni-headphone-alt"
        />
        <StatCard
          title="Handoffs"
          value={stats.handoffs.toString()}
          helper="Needing callbacks"
          icon="lni lni-flag-alt"
          accent="warning"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">Recent calls</CardTitle>
              <p className="text-sm text-muted-foreground">
                Summaries, tags, and quick handoff visibility.
              </p>
            </div>
            <Link href="/conversations" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {recentCalls.map((call) => (
              <CallCard key={call.id} call={call} href={`/conversations/${call.id}`} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">Today&apos;s schedules</CardTitle>
            <Link href="/appointments" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {schedules.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg bg-muted/40 px-3 py-3"
              >
                <span className="rounded-md bg-background px-2 py-1 text-xs font-semibold text-primary">
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

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">Recent bookings</CardTitle>
            <Link href="/appointments" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg bg-card/70 px-3 py-3 shadow-sm"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{booking.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.service} · {booking.date} · {booking.time}
                  </p>
                </div>
                <Badge variant="neutral">New</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">Handoffs</CardTitle>
            <Link href="/need-attention" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {handoffCalls.map((call) => (
              <div
                key={call.id}
                className="rounded-lg border border-dashed border-amber-200 bg-amber-50 px-3 py-3 dark:border-amber-900/50 dark:bg-amber-950/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{call.customerName}</p>
                  <Badge variant="warning">Needs callback</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {call.summary}
                </p>
                <Link
                  href={`/conversations/${call.id}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:underline dark:text-amber-400"
                >
                  Open call
                  <i className="lni lni-chevron-right text-[11px]" aria-hidden />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">Appointments</CardTitle>
            <Link href="/appointments" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {upcomingAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                href={`/conversations/${apt.callId}`}
              />
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-3 space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">
              Call-to-booking conversion
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track how many calls turn into appointments. Tune scripts and routing to improve.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <i className="lni lni-stats-up text-base" aria-hidden />
            View report
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
              <p className="text-sm font-semibold">Booking-ready calls</p>
              <p className="text-xs text-muted-foreground">
                54 calls contained booking intent; 18 converted.
              </p>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
              <p className="text-sm font-semibold">Callbacks required</p>
              <p className="text-xs text-muted-foreground">
                {stats.handoffs} calls need human follow-up to close.
              </p>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
              <p className="text-sm font-semibold">Avg. handling time</p>
              <p className="text-xs text-muted-foreground">9m 30s per call</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
