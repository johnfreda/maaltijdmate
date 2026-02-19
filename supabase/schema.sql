-- MaaltijdMate Database Schema

-- Recipes
create table recipes (
  id uuid primary key default gen_random_uuid(),
  title_nl text not null,
  title_en text not null,
  description_nl text,
  description_en text,
  prep_time int not null default 30, -- minutes
  servings int not null default 4,
  difficulty text not null default 'easy' check (difficulty in ('easy', 'medium', 'hard')),
  image_url text,
  source_url text,
  source_name text, -- e.g. "HelloFresh"
  tags text[] default '{}', -- vegetarian, vegan, quick, budget
  steps_nl text[] default '{}',
  steps_en text[] default '{}',
  created_at timestamptz default now()
);

-- Ingredients (master list, mapped to Lidl products)
create table ingredients (
  id uuid primary key default gen_random_uuid(),
  name_nl text not null,
  name_en text not null,
  category text not null check (category in ('produce', 'dairy', 'meat', 'bakery', 'pantry', 'frozen', 'drinks', 'spices', 'canned', 'other')),
  unit text not null default 'stuk' check (unit in ('g', 'kg', 'ml', 'l', 'stuk', 'el', 'tl', 'snuf', 'bos', 'teen')),
  lidl_name text, -- exact Lidl product name
  lidl_price decimal(6,2), -- price in euros
  lidl_unit_size text, -- e.g. "500g", "1 stuk"
  is_common boolean default false, -- salt, pepper, oil etc (likely in stock)
  created_at timestamptz default now()
);

-- Recipe ingredients (linking table)
create table recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid references recipes(id) on delete cascade,
  ingredient_id uuid references ingredients(id) on delete cascade,
  amount decimal(8,2) not null,
  unit text not null default 'stuk',
  notes_nl text, -- e.g. "fijngesneden"
  notes_en text,
  optional boolean default false
);

-- Meal plans
create table meal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid, -- for future auth
  week_start date not null, -- always a Monday
  created_at timestamptz default now(),
  unique(user_id, week_start)
);

-- Meal plan entries
create table meal_plan_entries (
  id uuid primary key default gen_random_uuid(),
  meal_plan_id uuid references meal_plans(id) on delete cascade,
  day int not null check (day between 0 and 6), -- 0=monday
  meal_type text not null check (meal_type in ('lunch', 'dinner')),
  recipe_id uuid references recipes(id) on delete cascade,
  servings int not null default 2,
  unique(meal_plan_id, day, meal_type)
);

-- Shopping list (auto-generated from meal plan + manual items)
create table shopping_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  ingredient_id uuid references ingredients(id),
  custom_name text, -- for manual items not in ingredients
  amount decimal(8,2),
  unit text,
  category text default 'other',
  checked boolean default false,
  meal_plan_id uuid references meal_plans(id) on delete set null,
  created_at timestamptz default now()
);

-- Pantry (items user has in stock)
create table pantry_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  ingredient_id uuid references ingredients(id),
  has_it boolean default true,
  updated_at timestamptz default now()
);

-- Indexes
create index idx_recipe_ingredients_recipe on recipe_ingredients(recipe_id);
create index idx_meal_plan_entries_plan on meal_plan_entries(meal_plan_id);
create index idx_shopping_items_user on shopping_items(user_id);
create index idx_ingredients_category on ingredients(category);
