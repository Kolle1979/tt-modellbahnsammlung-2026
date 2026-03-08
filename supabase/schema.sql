create extension if not exists pgcrypto;

create table if not exists public.models (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  inventar_nr text not null,
  hersteller text,
  herstellungszeitraum text,
  artikel_nr text,
  modelltyp text,
  bezeichnung text not null,
  baureihe text,
  kategorie text,
  epoche text,
  bahngesellschaft text,
  betriebsnummer text,
  kaufdatum date,
  kaufpreis numeric(10,2) default 0,
  standort text,
  zustand text,
  bemerkung text,
  laenge numeric(10,2) default 0,
  achsfolge text,
  anzahl_achsen integer default 0,
  angetriebene_achsen integer default 0,
  haftreifen integer default 0,
  kupplung_vorne text,
  kupplung_hinten text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint models_user_inventar_unique unique (user_id, inventar_nr)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_models_updated_at on public.models;
create trigger trg_models_updated_at
before update on public.models
for each row
execute function public.set_updated_at();

alter table public.models enable row level security;

drop policy if exists "users_can_select_own_models" on public.models;
create policy "users_can_select_own_models"
on public.models
for select
using (auth.uid() = user_id);

drop policy if exists "users_can_insert_own_models" on public.models;
create policy "users_can_insert_own_models"
on public.models
for insert
with check (auth.uid() = user_id);

drop policy if exists "users_can_update_own_models" on public.models;
create policy "users_can_update_own_models"
on public.models
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users_can_delete_own_models" on public.models;
create policy "users_can_delete_own_models"
on public.models
for delete
using (auth.uid() = user_id);
