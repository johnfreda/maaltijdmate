create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  full_name text
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  prep_minutes int not null default 15,
  servings int not null default 2,
  created_at timestamptz not null default now()
);

create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  name text not null,
  amount text not null
);

create table if not exists public.week_plan_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  recipe_id uuid references public.recipes(id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  unique (user_id, day)
);

alter table public.profiles enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.week_plan_items enable row level security;

create policy "own profile" on public.profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own recipes" on public.recipes
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "ingredients via own recipe" on public.recipe_ingredients
for all using (
  exists (
    select 1 from public.recipes r
    where r.id = recipe_id and r.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.recipes r
    where r.id = recipe_id and r.user_id = auth.uid()
  )
);

create policy "own weekplan" on public.week_plan_items
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
