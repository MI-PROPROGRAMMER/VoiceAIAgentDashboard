import Link from "next/link";
import { redirect } from "next/navigation";
import { Phone, Mail, Lock, ArrowRight, Shield, CheckCircle2, Sparkles } from "lucide-react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";

async function signInAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?error=missing_credentials");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; message?: string }>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const error = resolved?.error;
  const message = resolved?.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-blue" />
              <span className="text-lg font-semibold">VoiceAI</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center animate-slide-up">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue/10">
              <Phone className="h-8 w-8 text-blue" />
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your VoiceAI account to continue
            </p>
          </div>

          {/* Success Message */}
          {message ? (
            <div className="mb-6 animate-slide-up">
              <div className="rounded-lg border border-emerald-600/30 bg-emerald-600/10 px-4 py-3 text-sm text-emerald-600">
                {message}
              </div>
            </div>
          ) : null}

          {/* Error Message */}
          {error ? (
            <div className="mb-6 animate-slide-up">
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error === "missing_credentials"
                  ? "Please enter both email and password."
                  : error}
              </div>
            </div>
          ) : null}

          {/* Login Card */}
          <Card className="border-2 shadow-lg animate-slide-up">
            <CardContent className="p-6 sm:p-8">
              <form action={signInAction} className="space-y-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium" htmlFor="email">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-11"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium" htmlFor="password">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Password
                  </label>
                  <PasswordInput
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-blue focus:ring-2 focus:ring-ring"
                    />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link
                    href="#"
                    className="text-blue hover:underline hover:text-blue/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                >
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span>Secure login</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>SSL encrypted</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-blue hover:text-blue/80 hover:underline transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in">
            <div className="text-center">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                <Phone className="h-5 w-5 text-blue" />
              </div>
              <p className="text-xs font-medium">24/7 Support</p>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/10">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-xs font-medium">AI Powered</p>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/10">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-xs font-medium">Easy Setup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
