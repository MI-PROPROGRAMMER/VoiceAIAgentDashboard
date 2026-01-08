"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Mail, Lock, ArrowRight, Shield, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength, PasswordRequirements } from "@/components/auth/password-strength";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam === "missing_credentials" 
        ? "Please enter both email and password."
        : decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Redirect to login after successful signup
      router.push("/login?message=Account created successfully. Please sign in.");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

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
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue/20 to-purple-600/20">
              <Sparkles className="h-8 w-8 text-blue" />
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          {/* Error Message */}
          {error ? (
            <div className="mb-6 animate-slide-up">
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            </div>
          ) : null}

          {/* Signup Card */}
          <Card className="border-2 shadow-lg animate-slide-up">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    minLength={8}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {password && (
                    <div className="space-y-2 pt-2">
                      <PasswordStrength password={password} />
                      <PasswordRequirements password={password} />
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-border text-blue focus:ring-2 focus:ring-ring"
                  />
                  <label htmlFor="terms" className="text-muted-foreground">
                    I agree to the{" "}
                    <Link href="#" className="text-blue hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                  {!loading && (
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span>Secure signup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>No credit card</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue hover:text-blue/80 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Benefits Preview */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in">
            <div className="text-center">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                <Phone className="h-5 w-5 text-blue" />
              </div>
              <p className="text-xs font-medium">24/7 AI Agent</p>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-xs font-medium">Auto Booking</p>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/10">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-xs font-medium">Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
