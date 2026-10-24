-- Areej Handmade: customer reviews
-- Run this once in your NEW Supabase project: SQL Editor > New query > paste > Run.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 60),
  rating      integer not null check (rating between 1 and 5),
  message     text not null check (char_length(message) between 1 and 800),
  approved    boolean not null default false
);

alter table public.reviews enable row level security;

-- Visitors can SUBMIT a review, but only as "not approved yet".
drop policy if exists "Anyone can submit a review" on public.reviews;
create policy "Anyone can submit a review"
  on public.reviews for insert to anon, authenticated
  with check (approved = false);

-- Visitors can only READ reviews you have approved.
drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
  on public.reviews for select to anon, authenticated
  using (approved = true);

-- Visitors can never edit or delete anything.
revoke update, delete, truncate on public.reviews from anon, authenticated;

-- HOW TO APPROVE: open Table Editor > reviews and tick the "approved" box on a row,
-- or run:  update public.reviews set approved = true where id = 'PASTE-THE-ID-HERE';
-- HOW TO HIDE/DELETE: untick "approved", or delete the row in the Table Editor.
