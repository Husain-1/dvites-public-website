-- Allow server-side order deletes via Supabase REST (publishable/anon key in Cloudflare).
-- Run once in Supabase SQL editor if you do not use SUPABASE_SERVICE_ROLE_KEY.

alter table public.orders enable row level security;

drop policy if exists "orders_delete_anon" on public.orders;
create policy "orders_delete_anon"
  on public.orders for delete
  to anon, authenticated
  using (true);

-- Stale push subscription cleanup from web push (optional)
drop policy if exists "push_subscriptions_delete_anon" on public.push_subscriptions;
create policy "push_subscriptions_delete_anon"
  on public.push_subscriptions for delete
  to anon, authenticated
  using (true);
