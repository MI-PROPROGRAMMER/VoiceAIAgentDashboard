"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { businessProfile } from "@/lib/mock-data";

type EditableProfile = typeof businessProfile;

export default function LinkInBioPage() {
  const [profile, setProfile] = useState<EditableProfile>(businessProfile);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const inlinePreview = useMemo(
    () => `${profile.name} · ${profile.phone} · ${profile.address}`,
    [profile]
  );

  return (
    <div className="space-y-5">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Link in Bio</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Customer-facing mini site
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Inline editing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Business type</label>
                <Input
                  value={profile.type}
                  onChange={(e) => setProfile((p) => ({ ...p, type: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Hours</label>
                <Input
                  value={profile.hours.join(" · ")}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, hours: e.target.value.split("·").map((h) => h.trim()) }))
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Services</label>
                <Input
                  value={profile.services.join(", ")}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      services: e.target.value.split(",").map((s) => s.trim()),
                    }))
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Public link</label>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={profile.link}
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Changes are local for now. Wire up your API to persist updates.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
              {inlinePreview}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.type}</p>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((service) => (
                  <Badge key={service} variant="neutral">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <i className="lni lni-phone" aria-hidden />
                {profile.callNumber}
              </p>
              <p className="flex items-center gap-2">
                <i className="lni lni-map-marker" aria-hidden />
                {profile.address}
              </p>
              <p className="flex items-center gap-2">
                <i className="lni lni-timer" aria-hidden />
                {profile.hours.join(" • ")}
              </p>
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => window.open("/customer-view", "_blank")}
            >
              <i className="lni lni-eye" aria-hidden />
              Open public view
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
