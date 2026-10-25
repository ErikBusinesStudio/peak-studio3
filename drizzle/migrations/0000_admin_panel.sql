create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

-- Owner gets admin automatically
create or replace function public.assign_owner_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if lower(new.email) = 'erikbaraca119@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.assign_owner_admin();
insert into public.user_roles (user_id, role)
  select id, 'admin' from auth.users where lower(email) = 'erikbaraca119@gmail.com' on conflict do nothing;

-- Contacts management
alter table public.contacts add column status text not null default 'nuovo';
alter table public.contacts add column notes text;
grant select, update, delete on public.contacts to authenticated;
grant all on public.contacts to service_role;
create policy "Admins read contacts" on public.contacts for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update contacts" on public.contacts for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete contacts" on public.contacts for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Reviews moderation
grant select, update, delete on public.reviews to authenticated;
create policy "Admins read all reviews" on public.reviews for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update reviews" on public.reviews for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete reviews" on public.reviews for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Email log read
grant select on public.email_send_log to authenticated;
create policy "Admins read send log" on public.email_send_log for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Editable site content (prices, portfolio overrides)
create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Anyone reads site content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins insert site content" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update site content" on public.site_content for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete site content" on public.site_content for delete to authenticated using (public.has_role(auth.uid(), 'admin'));