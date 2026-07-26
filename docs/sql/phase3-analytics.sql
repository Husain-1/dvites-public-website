-- Dvites Phase 3 — Analytics, live sessions, push subscriptions
-- Run in Supabase SQL editor after public.orders exists.

-- ---------------------------------------------------------------------------
-- analytics_events
-- ---------------------------------------------------------------------------
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  page_path text,
  template_slug text,
  session_id text,
  visitor_id text,
  referrer text,
  user_agent text,
  device_type text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_event_type_idx
  on public.analytics_events (event_type, created_at desc);

create index if not exists analytics_events_template_slug_idx
  on public.analytics_events (template_slug, created_at desc);

-- ---------------------------------------------------------------------------
-- live_sessions
-- ---------------------------------------------------------------------------
create table if not exists public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  session_id text not null unique,
  page_path text,
  last_seen_at timestamptz not null default now(),
  user_agent text,
  device_type text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists live_sessions_last_seen_idx
  on public.live_sessions (last_seen_at desc);

-- ---------------------------------------------------------------------------
-- push_subscriptions
-- ---------------------------------------------------------------------------
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- orders.created_at (if missing)
-- ---------------------------------------------------------------------------
alter table public.orders
  add column if not exists created_at timestamptz not null default now();

-- ---------------------------------------------------------------------------
-- RLS (adjust to your security model)
-- ---------------------------------------------------------------------------
alter table public.analytics_events enable row level security;
alter table public.live_sessions enable row level security;
alter table public.push_subscriptions enable row level security;

-- Allow anonymous inserts from website tracking (publishable key)
drop policy if exists "analytics_events_insert_anon" on public.analytics_events;
create policy "analytics_events_insert_anon"
  on public.analytics_events for insert
  to anon, authenticated
  with check (true);

drop policy if exists "live_sessions_insert_anon" on public.live_sessions;
create policy "live_sessions_insert_anon"
  on public.live_sessions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "live_sessions_update_anon" on public.live_sessions;
create policy "live_sessions_update_anon"
  on public.live_sessions for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "push_subscriptions_insert_anon" on public.push_subscriptions;
create policy "push_subscriptions_insert_anon"
  on public.push_subscriptions for insert
  to anon, authenticated
  with check (true);

-- Admin reads are performed via Cloudflare Functions using publishable key.
-- Add select policies for authenticated service reads if needed:
drop policy if exists "analytics_events_select_anon" on public.analytics_events;
create policy "analytics_events_select_anon"
  on public.analytics_events for select
  to anon, authenticated
  using (true);

drop policy if exists "live_sessions_select_anon" on public.live_sessions;
create policy "live_sessions_select_anon"
  on public.live_sessions for select
  to anon, authenticated
  using (true);

drop policy if exists "push_subscriptions_select_anon" on public.push_subscriptions;
create policy "push_subscriptions_select_anon"
  on public.push_subscriptions for select
  to anon, authenticated
  using (true);

drop policy if exists "orders_select_anon" on public.orders;
create policy "orders_select_anon"
  on public.orders for select
  to anon, authenticated
  using (true);

drop policy if exists "orders_delete_anon" on public.orders;
create policy "orders_delete_anon"
  on public.orders for delete
  to anon, authenticated
  using (true);

drop policy if exists "push_subscriptions_delete_anon" on public.push_subscriptions;
create policy "push_subscriptions_delete_anon"
  on public.push_subscriptions for delete
  to anon, authenticated
  using (true);
