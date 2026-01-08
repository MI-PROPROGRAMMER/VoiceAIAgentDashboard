"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CopyFieldProps = {
  value: string;
  label?: string;
};

export function CopyField({ value, label }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      {label ? (
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
      ) : null}
      <div className="mt-1 flex gap-2">
        <Input readOnly value={value} />
        <Button type="button" variant="outline" onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
