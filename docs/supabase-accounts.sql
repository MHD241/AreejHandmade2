-- Customer accounts for Areej Handmade. Run ONCE in Supabase > SQL Editor > New query > Run.
-- Guests can still order (WhatsApp) and post reviews without an account.

create table if not exists public.user_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  wishlist   jsonb not null default '[]'::jsonb check (jsonb_typeof(wishlist) = 'array' and jsonb_array_length(wishlist) <= 100),
  basket     jsonb not null default '[]'::jsonb check (jsonb_typeof(basket) = 'array' and jsonb_array_length(basket) <= 50),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  items      jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) <= 50),
  subtotal   numeric(10,2) not null,
  discount   numeric(10,2) not null default 0,
  delivery   numeric(10,2) not null default 0,
  total      numeric(10,2) not null,
  code       text check (code is null or char_length(code) <= 30)
);

alter table public.user_data enable row level security;
alter table public.orders    enable row level security;

drop policy if exists "Own data: read"   on public.user_data;
drop policy if exists "Own data: insert" on public.user_data;
drop policy if exists "Own data: update" on public.user_data;
create policy "Own data: read"   on public.user_data for select to authenticated using (auth.uid() = user_id);
create policy "Own data: insert" on public.user_data for insert to authenticated with check (auth.uid() = user_id);
create policy "Own data: update" on public.user_data for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Own orders: read"   on public.orders;
drop policy if exists "Own orders: insert" on public.orders;
create policy "Own orders: read"   on public.orders for select to authenticated using (auth.uid() = user_id);
create policy "Own orders: insert" on public.orders for insert to authenticated with check (auth.uid() = user_id);

revoke all on public.user_data from anon;
revoke all on public.orders    from anon;
revoke delete, truncate on public.user_data from authenticated;
revoke update, delete, truncate on public.orders from authenticated;

-- ALSO in the Supabase dashboard:
--  1. Authentication > URL Configuration: set Site URL to https://areejhandmade.com
--     (confirmation and password-reset emails link back there).
--  2. Authentication > Providers > Email: leave "Confirm email" ON (safer) or turn it OFF for instant sign-up.
