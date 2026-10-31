-- Areej Handmade: customer reviews
-- Run this once in your NEW Supabase project: SQL Editor > New query > paste > Run.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 60),
  rating      integer not null check (rating between 1 and 5),
  message     text not null check (char_length(message) between 1 and 800),
  approved    boolean not null default true
);

alter table public.reviews enable row level security;

-- Visitors can SUBMIT a review; it is shown straight away (approved = true).
drop policy if exists "Anyone can submit a review" on public.reviews;
create policy "Anyone can submit a review"
  on public.reviews for insert to anon, authenticated
  with check (approved = true);

-- Visitors can only READ reviews you have approved.
drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
  on public.reviews for select to anon, authenticated
  using (approved = true);

-- Visitors can never edit or delete anything.
revoke update, delete, truncate on public.reviews from anon, authenticated;

-- ALREADY RAN THE FIRST VERSION? Run this instead of the whole file:
--   alter table public.reviews alter column approved set default true;
--   drop policy if exists "Anyone can submit a review" on public.reviews;
--   create policy "Anyone can submit a review" on public.reviews for insert to anon, authenticated with check (approved = true);
-- HOW TO HIDE A REVIEW: Table Editor > reviews, untick "approved" (or delete the row).
