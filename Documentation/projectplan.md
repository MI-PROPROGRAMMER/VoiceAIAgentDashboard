# Project Plan — Voice AI Agent Dashboard (YCI) — MVP

## 1) Goal (what we’re building)
- **System B (Dashboard)**: A Next.js app (frontend + backend) backed by **Supabase Postgres** that:
  - Generates **webhook URLs** per customer.
  - Receives webhook payloads from **System A (Voice AI Agent)**.
  - Stores call + analytics data.
  - Shows a **minimal, clean** dashboard for business owners.

## 2) Systems + data flow (high level)
- **System A (Voice AI Agent)** → sends webhooks to → **System B (Dashboard)**
- Webhook types (at least 3):
  - **Call started** (future)
  - **During-call function events** (future)
  - **Call ended** (MVP focus): sends a **large JSON** (see `ingestion.md` sample)

## 3) Tenant identification & routing
- **Tenant identifier in payload**: we will use **`agent_id`** to associate incoming events to the correct customer/tenant.
- **Implementation detail (recommended for security + flexibility)**:
  - Webhook endpoint URL contains an internal `endpointId`.
  - On ingest: verify signature → extract `agent_id` → confirm `agent_id` is allowed for that `endpointId` → write under the correct tenant.
  - This prevents someone from posting a valid-looking payload with a random `agent_id` to the wrong tenant endpoint.

## 4) MVP pages (NO Super Admin)
Based on your Notion spec (“Dashboard for Voice AI Agent”), we will implement:

### Dashboard / Home
- KPI widgets (examples):
  - total calls
  - total appointments
  - conversion rate (calls → bookings)
  - recent calls
  - today’s schedule
  - recent bookings
  - handoffs that need attention
- Each widget links to its corresponding full page (show “top items” only on home).

### Conversations / Call History
- List of call cards with:
  - tags: **appointment**, **general query**, **handoff**, and optionally **completed / incomplete**
  - date/time, duration
  - 2–3 line summary
- Call detail view (on click):
  - full transcript
  - tags, summary, duration, time, phone number (if available)
  - recording link (if available)

### Need Attention
- Same call card UI, filtered to:
  - calls that were **handoff** and still **need callback**

### Appointments
- Appointment cards with:
  - date/time
  - customer name + phone
  - short summary
- Clicking an appointment links back to the related call detail.

### Link-in-bio / Customer View Page (public)
- Public, shareable **read-only** page.
- Contains business info: timings, contact info, address, pricing, services, call number.
- Editable from dashboard settings, but the shared public link is not editable.

### Pricing (placeholder)
- A simple page/section to show package pricing (details later).

### Settings
- Generate + manage webhook URLs:
  - enable/disable
  - rotate secret
  - copy URL
- Manage business profile data used by the public page.

## 5) Webhook payload usage (Call Ended)
From the sample payload (`ingestion.md`), we will store and use:
- **Identifiers**: `event`, `call_id`, `agent_id`, `agent_name`, `call_type`
- **Timing**: start/end timestamps, duration
- **Conversation**: transcript and/or structured transcript objects
- **Artifacts**: recording/log URLs
- **Analysis**: `call_summary`, sentiment, `call_successful`, custom data
- **Ops/cost**: latency metrics, call_cost

### Appointment booking data (future payload)
- A boolean/object field like **`booking`** will be added to the payload.
  - If present, it indicates an appointment was booked in that call.
  - If date/time is not provided directly, we’ll derive it from:
    - call analysis `custom_analysis_data` (or future function events).

## 6) Ingestion pipeline (production-grade, simple)
### Endpoint
- `POST /api/webhooks/:endpointId` (Next.js Route Handler)

### Security
- Verify signature header (e.g., `x-retell-signature`) before accepting payload.
- Replay protection:
  - reject events outside an allowed timestamp window.

### Reliability
- **Idempotency**:
  - dedupe with a DB unique constraint on `(tenant_id, call_id, event_type)` (or a true event id if available later).
  - use upserts so retries are safe.
- **Out-of-order delivery**:
  - allow “call ended” to create the call record even if “call started” hasn’t arrived yet.

### Storage strategy
- Store the **raw JSON** (jsonb) for audit/debug/reprocessing.
- Normalize minimal fields into tables for fast UI lists.
- Avoid sending full transcript in list endpoints (only in call detail).

## 7) Authentication (required)
You want auth to require:
- **Business/Company name**
- **Password**
- **Phone number + OTP via SMS**

### Recommended auth flow (clean + secure)
- **Signup**
  - Step 1: user enters **phone** → receives **OTP** → verifies phone.
  - Step 2: user sets **company name** and **password**.
- **Login**
  - Step 1: phone + OTP (prove possession of phone)
  - Step 2: password check (knowledge factor)

### Implementation approach (Supabase-friendly)
- Use **Supabase Auth Phone (OTP)** for phone verification + sessions.
- Store company name + password hash in a `profiles/tenants` table.
- Enforce “OTP + password” at the app layer (server checks) for protected routes.
- SMS provider:
  - configure Supabase Auth SMS using a provider like **Twilio** (recommended) (exact provider can be chosen during setup).

## 8) Data model (minimal)
Core tables (tenant-scoped):
- `tenants` (company)
- `profiles` (user → tenant)
- `agents` (tenant ↔ `agent_id` mapping)
- `webhook_endpoints` (endpointId, type, secret, enabled)
- `calls` (one row per `call_id`)
- `call_events` (optional: per webhook event record for idempotency/audit)
- `appointments` (derived from `booking` or analysis)
- `handoffs` (for Need Attention filtering)
- `public_pages` (business info + public slug)

## 9) UI/UX constraints (what “amazing minimal dashboard” means)
- Minimal layout: “KPIs → Today → Recent”
- Consistent card components for Calls / Need Attention / Appointments
- Strong typography, whitespace, and restrained color usage
- Fast list loading (pagination) + good empty/loading states

## 10) Critical edge cases to handle early
- Duplicate webhook deliveries (retries) → idempotency + upsert
- Missing optional fields (recording URL, analysis) → graceful UI
- Large transcripts → store raw + lazy load detail view
- PII safety → avoid logging full payload; protect transcript access
- Multi-tenant isolation → strict tenant scoping everywhere (DB + API)

## 11) Proposed tech choices
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS + shadcn/ui** (clean, customizable dashboard UI)
- **Supabase Postgres + Supabase Auth (Phone OTP)**
- ORM: **Drizzle** (lean) or **Prisma** (mature). Choose one early and stay consistent.
- Validation: **Zod**
- Client fetching: **TanStack Query** (or SWR)

## 12) What’s explicitly out of scope for MVP (for now)
- Super Admin dashboard
- Real-time streaming updates (refresh pulls latest DB state is sufficient)
- Advanced role management beyond a single tenant owner/admin model

