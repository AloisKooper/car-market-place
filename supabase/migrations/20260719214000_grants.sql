-- Required for PostgREST roles on local/cloud Supabase
grant usage on schema public to anon, authenticated, service_role;
grant select on public.products to anon, authenticated, service_role;
grant insert, update, delete on public.products to authenticated, service_role;
grant select on public.profiles to anon, authenticated, service_role;
grant insert, update on public.profiles to authenticated, service_role;
grant all on all tables in schema public to service_role;
