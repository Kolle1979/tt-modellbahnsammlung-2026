create table if not exists public.models (
  id uuid primary key default gen_random_uuid(),
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
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_models_inventar_nr on public.models (inventar_nr);

create table if not exists public.model_images (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.models(id) on delete cascade,
  image_path text not null,
  image_name text,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_model_images_model_id on public.model_images (model_id);

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
