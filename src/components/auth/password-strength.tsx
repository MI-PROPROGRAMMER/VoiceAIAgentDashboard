"use client";

import { CheckCircle2 } from "lucide-react";

export function PasswordStrength({ password }: { password: string }) {
  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-destructive",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue",
    "bg-emerald-600",
  ];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex h-1.5 gap-1 overflow-hidden rounded-full bg-muted">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 transition-all ${
              i < strength ? strengthColors[strength - 1] : "bg-transparent"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength:{" "}
        <span className={`font-medium ${
          strength >= 3 ? "text-emerald-600" : strength >= 2 ? "text-yellow-500" : "text-destructive"
        }`}>
          {strengthLabels[strength - 1] || "Very Weak"}
        </span>
      </p>
    </div>
  );
}

export function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
  ];

  return (
    <div className="space-y-1.5 text-xs">
      {requirements.map((req, i) => (
        <div key={i} className="flex items-center gap-2">
          <CheckCircle2
            className={`h-3.5 w-3.5 ${
              req.met ? "text-emerald-600" : "text-muted-foreground"
            }`}
          />
          <span className={req.met ? "text-foreground" : "text-muted-foreground"}>
            {req.text}
          </span>
        </div>
      ))}
    </div>
  );
}
