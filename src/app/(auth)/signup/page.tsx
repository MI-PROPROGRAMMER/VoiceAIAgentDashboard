"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignupForm } from "@/components/auth/signup-form";

function SignupPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
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
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue/20 to-purple-600/20">
              <div className="h-8 w-8 animate-pulse rounded bg-blue/20" />
            </div>
            <div className="mb-2 h-8 w-48 animate-pulse rounded bg-muted mx-auto" />
            <div className="h-4 w-64 animate-pulse rounded bg-muted mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupPageSkeleton />}>
      <SignupForm />
    </Suspense>
  );
}
