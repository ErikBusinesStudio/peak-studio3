drop policy if exists "Anyone can submit a contact" on public.contacts;
revoke insert on public.contacts from anon, authenticated;