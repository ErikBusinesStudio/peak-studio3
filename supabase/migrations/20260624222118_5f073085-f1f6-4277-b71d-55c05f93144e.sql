create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

grant insert on public.contacts to anon, authenticated;
grant all on public.contacts to service_role;

alter table public.contacts enable row level security;

create policy "Anyone can submit a contact"
on public.contacts for insert
to anon, authenticated
with check (true);