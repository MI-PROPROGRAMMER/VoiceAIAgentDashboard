import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Phone, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Star,
  Shield,
  BarChart3,
  Zap,
  CheckCircle2,
  Users,
  Award,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  HelpCircle,
  FileText,
  BookOpen,
  MessageSquare
} from "lucide-react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SavingsCalculator } from "@/components/landing/savings-calculator";
import { AnimatedCounter } from "@/components/landing/animated-counter";
import { FloatingElements } from "@/components/landing/floating-elements";

export default async function LandingPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  // Redirect authenticated users to dashboard
  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-up">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-blue animate-pulse-glow" />
              <span className="text-lg font-semibold">VoiceAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="animate-pulse-glow">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <FloatingElements />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            {/* Trust Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-4 py-2 text-sm animate-fade-in">
              <Shield className="h-4 w-4 text-blue" />
              <span className="text-muted-foreground">Trusted by <AnimatedCounter value={500} suffix="+ service businesses" className="font-semibold text-foreground" /> </span>
            </div>

            {/* Headline - Under 10 words */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-slide-up">
              Never miss a call. Book appointments 24/7.
            </h1>

            {/* Subheadline - Benefit-driven */}
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl animate-fade-in">
              Your AI phone agent answers every call, books appointments, and handles customer questions—even when you&apos;re closed. Built for service businesses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto group hover:scale-105 transition-transform">
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                  Sign in
                </Button>
              </Link>
            </div>

            {/* Product Visual - Interactive Feature Cards */}
            <div className="mt-12 animate-slide-up">
              <div className="mx-auto max-w-4xl">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Link 
                    href="/#features" 
                    className="group relative overflow-hidden rounded-xl border-2 border-blue/20 bg-gradient-to-br from-blue/10 to-blue/5 p-6 text-center transition-all hover:border-blue/40 hover:shadow-lg hover:scale-105"
                  >
                    <div className="mb-4 inline-flex rounded-full bg-blue/20 p-3 group-hover:bg-blue/30 transition-colors">
                      <Phone className="h-6 w-6 text-blue" />
                    </div>
                    <h3 className="mb-2 font-semibold">24/7 Call Answering</h3>
                    <p className="text-xs text-muted-foreground">
                      Never miss a call, even after hours
                    </p>
                    <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-blue opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>

                  <Link 
                    href="/#features" 
                    className="group relative overflow-hidden rounded-xl border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-600/10 to-emerald-600/5 p-6 text-center transition-all hover:border-emerald-600/40 hover:shadow-lg hover:scale-105"
                  >
                    <div className="mb-4 inline-flex rounded-full bg-emerald-600/20 p-3 group-hover:bg-emerald-600/30 transition-colors">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">Auto Booking</h3>
                    <p className="text-xs text-muted-foreground">
                      Instant appointment scheduling
                    </p>
                    <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>

                  <Link 
                    href="/#features" 
                    className="group relative overflow-hidden rounded-xl border-2 border-purple-600/20 bg-gradient-to-br from-purple-600/10 to-purple-600/5 p-6 text-center transition-all hover:border-purple-600/40 hover:shadow-lg hover:scale-105"
                  >
                    <div className="mb-4 inline-flex rounded-full bg-purple-600/20 p-3 group-hover:bg-purple-600/30 transition-colors">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">Analytics Dashboard</h3>
                    <p className="text-xs text-muted-foreground">
                      Track conversions and insights
                    </p>
                    <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </div>
                
                {/* Quick Stats Below Cards */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-muted-foreground">Minimal setup fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-muted-foreground">14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-muted-foreground">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section id="calculator" className="border-b border-border/40 bg-gradient-to-br from-muted/30 via-background to-muted/20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SavingsCalculator />
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="border-b border-border/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-semibold sm:text-3xl animate-slide-up">
              Tired of missing calls?
            </h2>
            <p className="mb-12 text-muted-foreground animate-fade-in">
              Every missed call is a lost customer. Here&apos;s what you&apos;re dealing with:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
              <CardContent className="p-6">
                <Clock className="mb-4 h-8 w-8 text-destructive group-hover:animate-pulse" />
                <h3 className="mb-2 font-semibold">Calls go unanswered</h3>
                <p className="text-sm text-muted-foreground">
                  After hours, during lunch, or when you&apos;re busy—customers hang up and call your competitor.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
              <CardContent className="p-6">
                <Calendar className="mb-4 h-8 w-8 text-destructive group-hover:animate-pulse" />
                <h3 className="mb-2 font-semibold">Manual booking chaos</h3>
                <p className="text-sm text-muted-foreground">
                  Back-and-forth texts, double bookings, and scheduling errors cost you time and customers.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
              <CardContent className="p-6">
                <TrendingUp className="mb-4 h-8 w-8 text-destructive group-hover:animate-pulse" />
                <h3 className="mb-2 font-semibold">No visibility</h3>
                <p className="text-sm text-muted-foreground">
                  You don&apos;t know which calls convert, what customers ask, or where you&apos;re losing them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section - Max 3 Features */}
      <section id="features" className="border-b border-border/40 bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-semibold sm:text-3xl animate-slide-up">
              Your AI agent works 24/7
            </h2>
            <p className="mb-12 text-muted-foreground animate-fade-in">
              One setup. Zero missed calls. More bookings.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="mb-4 inline-flex rounded-full bg-blue/10 p-3 group-hover:bg-blue/20 transition-colors">
                <Phone className="h-6 w-6 text-blue group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Answers every call</h3>
              <p className="text-sm text-muted-foreground">
                Natural conversations that feel human. Handles questions, provides info, and books appointments instantly.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="mb-4 inline-flex rounded-full bg-emerald-600/10 p-3 group-hover:bg-emerald-600/20 transition-colors">
                <Calendar className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Books automatically</h3>
              <p className="text-sm text-muted-foreground">
                Syncs with your calendar. No double bookings. Sends confirmations. Customers get instant answers.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="mb-4 inline-flex rounded-full bg-purple-600/10 p-3 group-hover:bg-purple-600/20 transition-colors">
                <BarChart3 className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Shows you everything</h3>
              <p className="text-sm text-muted-foreground">
                See every call, track conversions, identify what works. Make data-driven decisions to grow faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="border-b border-border/40 bg-gradient-to-br from-blue/5 via-background to-purple-600/5 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
              Real results from real businesses
            </h2>
            <p className="text-muted-foreground">
              See the impact VoiceAI has on service businesses like yours
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-2 border-blue/20 bg-gradient-to-br from-blue/5 to-blue/10 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue mx-auto mb-4" />
                <div className="mb-2 text-4xl font-bold text-blue">
                  <AnimatedCounter value={500} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Service businesses</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-600/5 to-emerald-600/10 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                <div className="mb-2 text-4xl font-bold text-emerald-600">
                  <AnimatedCounter value={40} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Average conversion rate</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-600/20 bg-gradient-to-br from-purple-600/5 to-purple-600/10 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <div className="mb-2 text-4xl font-bold text-purple-600">
                  <AnimatedCounter value={24} suffix="/7" />
                </div>
                <p className="text-sm text-muted-foreground">Always available</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                <div className="mb-2 text-4xl font-bold text-yellow-500">
                  <AnimatedCounter value={3} suffix="x" />
                </div>
                <p className="text-sm text-muted-foreground">More bookings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-b border-border/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Testimonials */}
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-semibold animate-slide-up">
              What customers say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed">
                    &quot;We went from missing 60% of calls to booking 3x more appointments. The AI handles everything after hours.&quot;
                  </p>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">Dental Practice Owner</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed">
                    &quot;Our conversion rate jumped from 15% to 38% in 2 months. The dashboard shows exactly what&apos;s working.&quot;
                  </p>
                  <div>
                    <p className="font-semibold">Mike Rodriguez</p>
                    <p className="text-xs text-muted-foreground">HVAC Business Owner</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-b border-border/40 bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
              How it works
            </h2>
            <p className="text-muted-foreground">
              Get started in minutes, not days
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center group">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue/10 text-2xl font-bold text-blue group-hover:bg-blue/20 transition-colors">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Connect your phone</h3>
              <p className="text-sm text-muted-foreground">
                Link your business phone number in under 2 minutes. No hardware needed.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/10 text-2xl font-bold text-emerald-600 group-hover:bg-emerald-600/20 transition-colors">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Set your preferences</h3>
              <p className="text-sm text-muted-foreground">
                Tell the AI your services, hours, and booking rules. Takes 10 minutes.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/10 text-2xl font-bold text-purple-600 group-hover:bg-purple-600/20 transition-colors">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Start booking</h3>
              <p className="text-sm text-muted-foreground">
                Your AI agent goes live immediately. Watch appointments roll in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Top 5 Objections */}
      <section id="faq" className="border-b border-border/40 bg-gradient-to-br from-muted/20 to-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-2xl font-semibold sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Does it sound like a robot?</h3>
                <p className="text-sm text-muted-foreground">
                  No. Our AI uses natural language processing and voice synthesis that customers can&apos;t distinguish from a human. Most customers don&apos;t realize they&apos;re talking to AI.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">How long does setup take?</h3>
                <p className="text-sm text-muted-foreground">
                  About 15 minutes. Connect your phone number, set your business hours and services, and you&apos;re live. No technical skills needed.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">What if it can&apos;t answer a question?</h3>
                <p className="text-sm text-muted-foreground">
                  The AI flags complex questions for you to call back. You see everything in your dashboard and can prioritize follow-ups. Most calls are handled automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">How much does it cost?</h3>
                <p className="text-sm text-muted-foreground">
                  Plans start at $99/month with unlimited calls. No per-call fees. Free trial for 14 days. Cancel anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Does it work with my calendar?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes. Syncs with Google Calendar, Outlook, and most scheduling systems. The AI only books available slots and prevents double bookings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 bg-gradient-to-br from-blue/10 via-purple-600/5 to-emerald-600/10">
        <FloatingElements />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl animate-slide-up">
            Ready to never miss a call?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground animate-fade-in">
            Join <AnimatedCounter value={500} suffix="+ service businesses" className="font-semibold text-foreground" /> using AI to book more appointments.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto group hover:scale-105 transition-transform">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                Sign in
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground animate-fade-in">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-6 w-6 text-blue" />
                <span className="text-lg font-semibold">VoiceAI</span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground max-w-sm">
                Never miss a call again. Your AI phone agent answers every call, books appointments 24/7, and helps you grow your service business.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Start free trial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <BookOpen className="h-3 w-3" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <HelpCircle className="h-3 w-3" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <MessageSquare className="h-3 w-3" />
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Case Studies
                  </a>
                </li>
                <li>
                  <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 border-t border-border/40 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-semibold">Stay updated</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest tips, updates, and product news delivered to your inbox.
                </p>
              </div>
              <form className="flex gap-2 sm:flex-1 sm:max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 flex-1 rounded-lg border border-border/70 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" size="sm" className="shrink-0">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 border-t border-border/40 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} VoiceAI. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="mailto:support@voiceai.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-3 w-3" />
                  support@voiceai.com
                </a>
                <a href="tel:+1-555-0123" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-3 w-3" />
                  +1 (555) 012-3456
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
