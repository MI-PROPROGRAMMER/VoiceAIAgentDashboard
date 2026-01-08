"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { businessProfile } from "@/lib/mock-data";

type Profile = typeof businessProfile;

export function BusinessProfileForm({ initial }: { initial?: Profile }) {
  const [profile, setProfile] = useState<Profile>(initial ?? businessProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Business profile</CardTitle>
          {saved ? <Badge variant="success">Saved</Badge> : null}
        </div>
        <p className="text-sm text-muted-foreground">
          Update contact, hours, and the public-facing profile.
        </p>
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
        </div>

        <Button onClick={handleSave} className="gap-2">
          <i className="lni lni-save" aria-hidden />
          Save changes
        </Button>
        <p className="text-xs text-muted-foreground">
          Saving writes to local state today. Connect this to your backend when ready.
        </p>
      </CardContent>
    </Card>
  );
}
