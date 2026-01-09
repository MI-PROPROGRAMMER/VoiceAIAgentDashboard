import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "@/lib/supabase/env";

// Webhook endpoint: POST /api/webhooks/:endpointId
// This receives call-ended (and later call-started/function) events from the voice agent system.

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> },
) {
  const { endpointId } = await params;

  try {
    // 1) Parse body
    const payload = await request.json();
    const eventType = payload.event; // e.g., "call_ended"
    const callId = payload.call?.call_id;
    const agentId = payload.agent_id;

    if (!eventType || !callId || !agentId) {
      return NextResponse.json(
        { error: "Missing required fields: event, call.call_id, agent_id" },
        { status: 400 },
      );
    }

    // 2) Use service role client (bypass RLS for webhook ingestion)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 3) Lookup endpoint + tenant
    const { data: endpoint, error: endpointError } = await supabase
      .from("webhook_endpoints")
      .select("id, tenant_id, type, enabled, secret")
      .eq("id", endpointId)
      .single();

    if (endpointError || !endpoint) {
      return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
    }

    if (!endpoint.enabled) {
      return NextResponse.json({ error: "Endpoint disabled" }, { status: 403 });
    }

    // TODO: Verify signature using endpoint.secret + x-retell-signature header (later)

    // 4) Confirm agent_id is allowed for this tenant
    const { data: agent } = await supabase
      .from("agents")
      .select("id")
      .eq("tenant_id", endpoint.tenant_id)
      .eq("agent_id", agentId)
      .maybeSingle();

    if (!agent) {
      // Auto-create agent mapping if not exists (convenience for MVP)
      await supabase.from("agents").insert({
        tenant_id: endpoint.tenant_id,
        agent_id: agentId,
        agent_name: payload.agent_name,
      });
    }

    // 5) Store raw payload
    await supabase.from("call_webhook_raw").insert({
      tenant_id: endpoint.tenant_id,
      endpoint_id: endpoint.id,
      event_type: eventType,
      call_id: callId,
      payload,
    });

    // 6) Upsert call record (idempotent)
    if (eventType === "call_ended") {
      const call = payload.call;
      const analysis = payload.call_analysis || {};
      const tags: string[] = [];

      // Derive tags
      if (payload.booking || analysis.booking) {
        tags.push("appointment");
      }
      if (call.disconnection_reason?.includes("handoff") || analysis.handoff) {
        tags.push("handoff");
      }
      if (analysis.call_successful) {
        tags.push("completed");
      } else if (analysis.call_successful === false) {
        tags.push("incomplete");
      }

      const { error: callError } = await supabase
        .from("calls")
        .upsert(
          {
            tenant_id: endpoint.tenant_id,
            call_id: callId,
            agent_id: agentId,
            agent_name: payload.agent_name,
            started_at: call.start_timestamp
              ? new Date(call.start_timestamp * 1000).toISOString()
              : null,
            ended_at: call.end_timestamp
              ? new Date(call.end_timestamp * 1000).toISOString()
              : null,
            duration_seconds: call.end_timestamp && call.start_timestamp
              ? call.end_timestamp - call.start_timestamp
              : null,
            summary: analysis.call_summary,
            sentiment: analysis.user_sentiment,
            successful: analysis.call_successful,
            recording_url: call.recording_url,
            call_cost: call.call_cost,
            tags,
          },
          { onConflict: "tenant_id,call_id" },
        );

      if (callError) {
        // Log error for monitoring (implement proper logging service in production)
      }

      // 7) Create handoff if needed
      if (tags.includes("handoff")) {
        await supabase.from("handoffs").upsert(
          {
            tenant_id: endpoint.tenant_id,
            call_id: callId,
            needs_callback: true,
            status: "open",
          },
          { onConflict: "tenant_id,call_id" },
        );
      }

      // 8) Create appointment if booking exists (future)
      if (payload.booking) {
        await supabase.from("appointments").insert({
          tenant_id: endpoint.tenant_id,
          call_id: callId,
          customer_name: payload.booking.customer_name,
          customer_phone: payload.booking.customer_phone,
          starts_at: payload.booking.starts_at,
          status: "scheduled",
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    // Log error for monitoring (implement proper logging service in production)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
