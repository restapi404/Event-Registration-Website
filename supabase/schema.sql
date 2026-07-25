-- Run this once in the Supabase SQL editor for your project.

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  college text not null,
  year text not null,
  department text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id) -- one registration per account
);

-- Keep updated_at current on every edit
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_registrations_updated_at on public.registrations;
create trigger trg_registrations_updated_at
  before update on public.registrations
  for each row execute function public.set_updated_at();

-- Row Level Security: a user can only ever see or touch their own row
alter table public.registrations enable row level security;

create policy "Users can view their own registration"
  on public.registrations for select
  using (auth.uid() = user_id);

create policy "Users can create their own registration"
  on public.registrations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own registration"
  on public.registrations for update
  using (auth.uid() = user_id);

create policy "Users can delete their own registration"
  on public.registrations for delete
  using (auth.uid() = user_id);
