-- 1) Helpers
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2) Admin table
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  );
$$;

create policy "Admins can view admin list"
on public.admin_users
for select
to authenticated
using (public.is_admin());

create policy "Admins can manage admins"
on public.admin_users
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- 3) Properties
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  city text not null,
  neighborhood text not null default '',
  address text not null default '',
  price_uyu integer not null,
  price_usd integer,
  beds integer not null default 0,
  baths integer not null default 0,
  area_m2 integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_published_idx on public.properties (is_published);
create index if not exists properties_city_idx on public.properties (city);

alter table public.properties enable row level security;

create policy "Public can read published properties"
on public.properties
for select
to anon, authenticated
using (is_published = true or public.is_admin());

create policy "Admins can manage properties"
on public.properties
for insert
to authenticated
with check (public.is_admin());

create policy "Admins can update properties"
on public.properties
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can delete properties"
on public.properties
for delete
to authenticated
using (public.is_admin());

drop trigger if exists set_properties_updated_at on public.properties;
create trigger set_properties_updated_at
before update on public.properties
for each row
execute function public.update_updated_at_column();

-- 4) Property photos (store only the storage object path)
create table if not exists public.property_photos (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  object_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists property_photos_property_idx on public.property_photos (property_id);

alter table public.property_photos enable row level security;

create policy "Public can read photos for published properties"
on public.property_photos
for select
to anon, authenticated
using (
  public.is_admin() or
  exists (select 1 from public.properties p where p.id = property_id and p.is_published = true)
);

create policy "Admins can manage photos"
on public.property_photos
for insert
to authenticated
with check (public.is_admin());

create policy "Admins can update photos"
on public.property_photos
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can delete photos"
on public.property_photos
for delete
to authenticated
using (public.is_admin());

-- 5) Storage bucket (private) + policies
insert into storage.buckets (id, name, public)
values ('property-photos', 'property-photos', false)
on conflict (id) do nothing;

-- Allow admins to upload/read/manage objects in property-photos
create policy "Admins can manage property photo objects"
on storage.objects
for all
to authenticated
using (bucket_id = 'property-photos' and public.is_admin())
with check (bucket_id = 'property-photos' and public.is_admin());

-- Allow public to read objects only via signed URLs (no direct select policy)
-- (No anon select policy intentionally)

-- 6) Views
create or replace view public.public_properties
with (security_invoker=on)
as
select id, title, description, city, neighborhood, address, price_uyu, price_usd, beds, baths, area_m2, created_at, updated_at
from public.properties
where is_published = true;

create or replace view public.admin_properties
with (security_invoker=on)
as
select * from public.properties;

create or replace view public.public_property_photos
with (security_invoker=on)
as
select pp.id, pp.property_id, pp.object_path, pp.sort_order
from public.property_photos pp
join public.properties p on p.id = pp.property_id
where p.is_published = true;

create or replace view public.admin_property_photos
with (security_invoker=on)
as
select * from public.property_photos;