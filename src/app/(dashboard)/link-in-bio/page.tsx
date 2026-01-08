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

        <Card className="lg:sticky lg:top-4 lg:self-start">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Live Preview</CardTitle>
            <p className="text-xs text-muted-foreground">How customers will see your page</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t border-border">
              <div className="h-[600px] overflow-y-auto bg-background">
                <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/30">
                  <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8">
                    {/* Header Section */}
                    <header className="space-y-4 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5">
                        <i className="lni lni-mic text-sm text-blue" aria-hidden />
                        <p className="text-xs font-medium text-muted-foreground">Powered by Voice AI</p>
                      </div>
                      <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                          {profile.name}
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">{profile.type}</p>
                      </div>
                    </header>

                    {/* Main Card */}
                    <Card className="border-border/70 shadow-lg">
                      <CardHeader className="space-y-1 pb-6 text-center">
                        <CardTitle className="text-xl font-semibold sm:text-2xl">Visit or call us</CardTitle>
                        <p className="text-xs text-muted-foreground sm:text-sm">We're here to help you</p>
                      </CardHeader>
                      <CardContent className="space-y-6 px-4 pb-6 sm:px-6 sm:pb-8">
                        {/* Phone Number - Prominent */}
                        <div className="flex flex-col items-center gap-3 rounded-xl bg-blue/5 border border-blue/10 p-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/10">
                            <i className="lni lni-phone text-xl text-blue" aria-hidden />
                          </div>
                          <a
                            href={`tel:${profile.callNumber.replace(/\s/g, "")}`}
                            className="text-xl font-bold text-blue hover:text-blue/80 transition-colors"
                          >
                            {profile.callNumber}
                          </a>
                          <Button size="lg" className="mt-2 w-full sm:w-auto gap-2">
                            <i className="lni lni-phone text-base" aria-hidden />
                            Call now
                          </Button>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <i className="lni lni-map-marker text-xl text-foreground" aria-hidden />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Address</p>
                            <p className="text-sm leading-relaxed text-foreground">
                              {profile.address}
                            </p>
                          </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <i className="lni lni-timer text-xl text-foreground" aria-hidden />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-muted-foreground mb-3">Business Hours</p>
                            <div className="space-y-2">
                              {profile.hours.map((hour, idx) => (
                                <p key={idx} className="text-sm leading-relaxed text-foreground">
                                  {hour}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Our Services
                          </p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {profile.services.map((service) => (
                              <Badge
                                key={service}
                                variant="default"
                                className="bg-blue/10 text-blue border-blue/20 px-3 py-1.5 text-xs font-medium"
                              >
                                <i className="lni lni-checkmark-circle mr-1.5 text-xs" aria-hidden />
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Need assistance? Our AI assistant is available 24/7 to help you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-border p-4">
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={() => window.open("/customer-view", "_blank")}
              >
                <i className="lni lni-external-link text-base" aria-hidden />
                Open in new tab
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
