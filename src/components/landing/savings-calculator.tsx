"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Phone, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SavingsCalculator() {
  const [callsPerDay, setCallsPerDay] = useState(20);
  const [missedCallRate, setMissedCallRate] = useState(40);
  const [avgAppointmentValue, setAvgAppointmentValue] = useState(150);
  const [conversionRate, setConversionRate] = useState(15);

  // Calculate savings
  const totalCallsPerMonth = callsPerDay * 30;
  const missedCallsPerMonth = Math.round((totalCallsPerMonth * missedCallRate) / 100);
  const potentialAppointments = Math.round((missedCallsPerMonth * conversionRate) / 100);
  const lostRevenue = potentialAppointments * avgAppointmentValue;
  const monthlySavings = Math.round(lostRevenue * 0.85); // 85% of lost revenue recovered
  const yearlySavings = monthlySavings * 12;
  const aiCost = 99; // Monthly AI cost
  const netSavings = monthlySavings - aiCost;
  const roi = Math.round((netSavings / aiCost) * 100);

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
          Calculate your potential savings
        </h2>
        <p className="text-muted-foreground">
          See how much revenue you&apos;re losing to missed calls
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue" />
              Your Business Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Calls per day
              </label>
              <div className="space-y-2">
                <Input
                  type="number"
                  min="1"
                  max="500"
                  value={callsPerDay}
                  onChange={(e) => setCallsPerDay(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={callsPerDay}
                  onChange={(e) => setCallsPerDay(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Missed call rate (%)
              </label>
              <div className="space-y-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={missedCallRate}
                  onChange={(e) => setMissedCallRate(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={missedCallRate}
                  onChange={(e) => setMissedCallRate(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Average appointment value ($)
              </label>
              <div className="space-y-2">
                <Input
                  type="number"
                  min="1"
                  max="10000"
                  value={avgAppointmentValue}
                  onChange={(e) => setAvgAppointmentValue(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={avgAppointmentValue}
                  onChange={(e) => setAvgAppointmentValue(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Conversion rate (%)
              </label>
              <div className="space-y-2">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          <Card className="border-2 border-blue/20 bg-gradient-to-br from-blue/5 to-blue/10">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Monthly Lost Revenue</span>
                <DollarSign className="h-5 w-5 text-destructive" />
              </div>
              <div className="mb-2 text-4xl font-bold text-destructive">
                ${lostRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {missedCallsPerMonth} missed calls × {potentialAppointments} potential bookings
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-600/5 to-emerald-600/10">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Monthly Savings with AI</span>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="mb-2 text-4xl font-bold text-emerald-600">
                ${monthlySavings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Recovering 85% of lost revenue
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-600/20 bg-gradient-to-br from-purple-600/5 to-purple-600/10">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Net Monthly Savings</span>
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div className="mb-2 text-4xl font-bold text-purple-600">
                ${netSavings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                After $99/month AI cost
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue/30 bg-gradient-to-br from-blue/10 to-blue/20">
            <CardContent className="p-6 text-center">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Annual Savings</div>
              <div className="mb-4 text-5xl font-bold text-blue">
                ${yearlySavings.toLocaleString()}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue/20 px-4 py-2">
                <TrendingUp className="h-4 w-4 text-blue" />
                <span className="text-sm font-semibold text-blue">
                  {roi > 0 ? `${roi}% ROI` : "Break even"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
