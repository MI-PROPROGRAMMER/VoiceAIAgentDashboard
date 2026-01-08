"use client";

import { Phone, Calendar, TrendingUp, Zap } from "lucide-react";

export function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Floating Phone Icons */}
      <div className="absolute left-[10%] top-[20%] animate-float-slow">
        <Phone className="h-8 w-8 text-blue/20" />
      </div>
      <div className="absolute right-[15%] top-[40%] animate-float-medium">
        <Calendar className="h-6 w-6 text-emerald-600/20" />
      </div>
      <div className="absolute left-[20%] bottom-[30%] animate-float-fast">
        <TrendingUp className="h-7 w-7 text-purple-600/20" />
      </div>
      <div className="absolute right-[10%] bottom-[20%] animate-float-slow">
        <Zap className="h-6 w-6 text-yellow-500/20" />
      </div>
    </div>
  );
}
