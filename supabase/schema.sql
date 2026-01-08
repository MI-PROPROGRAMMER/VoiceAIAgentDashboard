-- Core schema for Voice AI Dashboard MVP.
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.

-- Enable UUID generation helpers
create extension if not exists "pgcrypto";

-- Tenants (one business/company)
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text
);

-- Profiles: link auth.users -> tenant
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Agents: map tenant <-> voice agent system agent_id
create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now(),
  agent_id text not null,
  agent_name text,
  unique (tenant_id, agent_id)
);

-- Webhook endpoints created in dashboard settings
create table if not exists public.webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now(),
  type text not null check (type in ('call_started', 'call_ended', 'function')),
  enabled boolean not null default true,
  secret text not null
);

-- Calls (normalized core fields)
create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  call_id text not null,
  agent_id text,
  agent_name text,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer,
  summary text,
  sentiment text,
  successful boolean,
  recording_url text,
  call_cost numeric,
  tags text[] not null default '{}',
  unique (tenant_id, call_id)
);

-- Raw payload storage for audit/debug/reprocessing
create table if not exists public.call_webhook_raw (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now(),
  endpoint_id uuid references public.webhook_endpoints (id) on delete set null,
  event_type text,
  call_id text,
  payload jsonb not null
);

-- Appointments (derived from booking/custom_analysis_data)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now(),
  call_id text,
  customer_name text,
  customer_phone text,
  starts_at timestamptz,
  status text not null default 'scheduled'
);

-- Handoffs (need attention)
create table if not exists public.handoffs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz not null default now(),
  call_id text not null,
  needs_callback boolean not null default true,
  status text not null default 'open',
  unique (tenant_id, call_id)
);

-- Keep updated_at current for calls
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_calls_updated_at on public.calls;
create trigger trg_calls_updated_at
before update on public.calls
for each row execute function public.set_updated_at();

-- RLS
alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.webhook_endpoints enable row level security;
alter table public.calls enable row level security;
alter table public.call_webhook_raw enable row level security;
alter table public.appointments enable row level security;
alter table public.handoffs enable row level security;

-- Helper: current tenant_id for the authed user
create or replace function public.current_tenant_id()
returns uuid
stable
language sql
as $$
  select p.tenant_id
  from public.profiles p
  where p.user_id = auth.uid()
  limit 1
$$;

-- Policies: restrict everything to current tenant
drop policy if exists tenants_select on public.tenants;
create policy tenants_select on public.tenants
for select using (id = public.current_tenant_id());

drop policy if exists profiles_self on public.profiles;
create policy profiles_self on public.profiles
for select using (user_id = auth.uid());

drop policy if exists agents_tenant on public.agents;
create policy agents_tenant on public.agents
for all using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

drop policy if exists webhook_endpoints_tenant on public.webhook_endpoints;
create policy webhook_endpoints_tenant on public.webhook_endpoints
for all using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

drop policy if exists calls_tenant on public.calls;
create policy calls_tenant on public.calls
for all using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

drop policy if exists call_webhook_raw_tenant on public.call_webhook_raw;
create policy call_webhook_raw_tenant on public.call_webhook_raw
for all using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

drop policy if exists appointments_tenant on public.appointments;
create policy appointments_tenant on public.appointments
for all using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

drop policy if exists handoffs_tenant on public.handoffs;
create policy handoffs_tenant on public.handoffs
for all using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

-- Auto-create tenant + profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
declare
  new_tenant_id uuid;
begin
  -- Create a new tenant
  insert into public.tenants (name) values ('New Company')
  returning id into new_tenant_id;
  
  -- Create profile linking user -> tenant
  insert into public.profiles (user_id, tenant_id)
  values (new.id, new_tenant_id);
  
  return new;
end;
$$;

-- Trigger on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
