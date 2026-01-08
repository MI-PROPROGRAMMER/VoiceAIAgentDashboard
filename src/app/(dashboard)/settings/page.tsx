import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { BusinessProfileForm } from "@/components/dashboard/business-profile-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyField } from "@/components/dashboard/copy-field";
import { businessProfile } from "@/lib/mock-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function createWebhookEndpoint(formData: FormData) {
  "use server";

  const type = String(formData.get("type") ?? "call_ended");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("tenant_id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    throw new Error("No tenant found for user");
  }

  const secret = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  await supabase.from("webhook_endpoints").insert({
    tenant_id: profile.tenant_id,
    type,
    secret,
    enabled: true,
  });

  revalidatePath("/settings");
}

async function toggleWebhookEnabled(formData: FormData) {
  "use server";

  const endpointId = String(formData.get("endpoint_id") ?? "");
  const currentEnabled = formData.get("enabled") === "true";

  const supabase = await createSupabaseServerClient();

  await supabase
    .from("webhook_endpoints")
    .update({ enabled: !currentEnabled })
    .eq("id", endpointId);

  revalidatePath("/settings");
}

async function deleteWebhookEndpoint(formData: FormData) {
  "use server";

  const endpointId = String(formData.get("endpoint_id") ?? "");

  const supabase = await createSupabaseServerClient();
  await supabase.from("webhook_endpoints").delete().eq("id", endpointId);

  revalidatePath("/settings");
}

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("tenant_id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
        No tenant found for this user. Please contact support.
      </div>
    );
  }

  const { data: endpoints } = profile
    ? await supabase
        .from("webhook_endpoints")
        .select("*")
        .eq("tenant_id", profile.tenant_id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div className="space-y-5">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Settings</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Profile, routing, and webhooks
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BusinessProfileForm initial={businessProfile} />
        </div>

        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Account</CardTitle>
              <Badge variant="neutral">Signed in</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Change password
            </Button>
            <form action="/logout" method="get">
              <Button variant="ghost" className="w-full text-destructive">
                Sign out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 space-y-0 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Webhook endpoints</CardTitle>
            <p className="text-sm text-muted-foreground">
              Connect your voice agent events to downstream systems.
            </p>
          </div>
          <form action={createWebhookEndpoint}>
            <input type="hidden" name="type" value="call_ended" />
            <Button type="submit" className="gap-2">
              <i className="lni lni-plus" aria-hidden />
              Generate endpoint
            </Button>
          </form>
        </CardHeader>
        <CardContent className="space-y-3">
          {!endpoints || endpoints.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              No webhook endpoints yet. Create one to start receiving call data.
            </div>
          ) : (
            endpoints.map((endpoint) => {
              const webhookUrl = `${baseUrl}/api/webhooks/${endpoint.id}`;
              return (
                <div
                  key={endpoint.id}
                  className="rounded-lg border border-border/70 bg-card p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge>{endpoint.type}</Badge>
                        {endpoint.enabled ? (
                          <Badge variant="success">Enabled</Badge>
                        ) : (
                          <Badge variant="neutral">Disabled</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(endpoint.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <form action={toggleWebhookEnabled}>
                        <input type="hidden" name="endpoint_id" value={endpoint.id} />
                        <input type="hidden" name="enabled" value={String(endpoint.enabled)} />
                        <Button variant="ghost" size="sm" className="text-foreground">
                          {endpoint.enabled ? "Disable" : "Enable"}
                        </Button>
                      </form>
                      <form action={deleteWebhookEndpoint}>
                        <input type="hidden" name="endpoint_id" value={endpoint.id} />
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </form>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <CopyField value={webhookUrl} label="Webhook URL" />
                    <CopyField value={endpoint.secret} label="Secret" />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Routing</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure when to hand off to humans and where to send data.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed border-border/70 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <i className="lni lni-protection text-lg text-primary" aria-hidden />
            Add escalation rules for urgent billing or sentiment drops.
          </div>
          <Link href="/need-attention" className="text-primary hover:underline">
            Review handoffs →
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
