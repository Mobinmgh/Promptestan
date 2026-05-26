create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  subscription_status text not null default 'free' check (subscription_status in ('free', 'pro')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name_fa text not null,
  name_en text,
  slug text not null unique,
  description text,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  prompt_text text not null,
  negative_prompt text,
  variables jsonb not null default '[]'::jsonb,
  usage_notes_fa text,
  best_for text,
  model_compatibility text[] not null default '{}',
  difficulty text not null default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  access_level text not null default 'free' check (access_level in ('free', 'pro')),
  category_id uuid references public.categories(id) on delete set null,
  cover_image_url text,
  example_images text[] not null default '{}',
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.prompt_tags (
  prompt_id uuid references public.prompts(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (prompt_id, tag_id)
);

create table if not exists public.favorites (
  user_id uuid references auth.users(id) on delete cascade,
  prompt_id uuid references public.prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create index if not exists prompts_slug_idx on public.prompts(slug);
create index if not exists prompts_category_id_idx on public.prompts(category_id);
create index if not exists categories_slug_idx on public.categories(slug);
create index if not exists prompt_tags_prompt_id_idx on public.prompt_tags(prompt_id);
create index if not exists prompt_tags_tag_id_idx on public.prompt_tags(tag_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists prompts_set_updated_at on public.prompts;
create trigger prompts_set_updated_at
before update on public.prompts
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, subscription_status)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', 'user', 'free')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin(user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.prompts enable row level security;
alter table public.prompt_tags enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can update own basic profile" on public.profiles;
create policy "Users can update own basic profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid() and role = 'user');

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published categories" on public.categories;
create policy "Public can read published categories"
on public.categories for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
on public.categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read tags" on public.tags;
create policy "Public can read tags"
on public.tags for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage tags" on public.tags;
create policy "Admins can manage tags"
on public.tags for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published free prompts" on public.prompts;
create policy "Public can read published free prompts"
on public.prompts for select
to anon, authenticated
using (is_published = true and access_level = 'free');

drop policy if exists "Pro users can read published pro prompts" on public.prompts;
create policy "Pro users can read published pro prompts"
on public.prompts for select
to authenticated
using (
  is_published = true
  and access_level = 'pro'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
      and subscription_status = 'pro'
  )
);

drop policy if exists "Admins can manage prompts" on public.prompts;
create policy "Admins can manage prompts"
on public.prompts for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read prompt tags for published prompts" on public.prompt_tags;
create policy "Public can read prompt tags for published prompts"
on public.prompt_tags for select
to anon, authenticated
using (
  exists (
    select 1 from public.prompts
    where prompts.id = prompt_tags.prompt_id
      and prompts.is_published = true
  )
);

drop policy if exists "Admins can manage prompt tags" on public.prompt_tags;
create policy "Admins can manage prompt tags"
on public.prompt_tags for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users can read own favorites" on public.favorites;
create policy "Users can read own favorites"
on public.favorites for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can insert own favorites" on public.favorites;
create policy "Users can insert own favorites"
on public.favorites for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can delete own favorites" on public.favorites;
create policy "Users can delete own favorites"
on public.favorites for delete
to authenticated
using (user_id = auth.uid());

create or replace function public.get_public_prompts()
returns table (
  id uuid,
  title text,
  slug text,
  description text,
  prompt_text text,
  prompt_preview text,
  negative_prompt text,
  variables jsonb,
  usage_notes_fa text,
  best_for text,
  model_compatibility text[],
  difficulty text,
  access_level text,
  cover_image_url text,
  example_images text[],
  category_name text,
  category_slug text,
  tags text[]
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.id,
    p.title,
    p.slug,
    p.description,
    case when p.access_level = 'free' then p.prompt_text else null end as prompt_text,
    case when p.access_level = 'pro' then left(p.prompt_text, 180) || '...' else null end as prompt_preview,
    case when p.access_level = 'free' then p.negative_prompt else null end as negative_prompt,
    p.variables,
    p.usage_notes_fa,
    p.best_for,
    p.model_compatibility,
    p.difficulty,
    p.access_level,
    p.cover_image_url,
    p.example_images,
    c.name_fa as category_name,
    c.slug as category_slug,
    coalesce(array_agg(t.slug order by t.slug) filter (where t.slug is not null), '{}') as tags
  from public.prompts p
  left join public.categories c on c.id = p.category_id
  left join public.prompt_tags pt on pt.prompt_id = p.id
  left join public.tags t on t.id = pt.tag_id
  where p.is_published = true
  group by p.id, c.name_fa, c.slug
  order by p.created_at desc;
$$;

create or replace function public.get_public_prompt_by_slug(p_slug text)
returns table (
  id uuid,
  title text,
  slug text,
  description text,
  prompt_text text,
  prompt_preview text,
  negative_prompt text,
  variables jsonb,
  usage_notes_fa text,
  best_for text,
  model_compatibility text[],
  difficulty text,
  access_level text,
  cover_image_url text,
  example_images text[],
  category_name text,
  category_slug text,
  tags text[]
)
language sql
security definer
set search_path = public
stable
as $$
  select * from public.get_public_prompts()
  where slug = p_slug
  limit 1;
$$;

create or replace function public.get_public_categories()
returns table (
  id uuid,
  name_fa text,
  name_en text,
  slug text,
  description text,
  prompt_count bigint
)
language sql
security definer
set search_path = public
stable
as $$
  select
    c.id,
    c.name_fa,
    c.name_en,
    c.slug,
    c.description,
    count(p.id) as prompt_count
  from public.categories c
  left join public.prompts p on p.category_id = c.id and p.is_published = true
  where c.is_published = true
  group by c.id
  order by c.sort_order, c.name_fa;
$$;

create or replace function public.get_public_category_by_slug(p_slug text)
returns table (
  id uuid,
  name_fa text,
  name_en text,
  slug text,
  description text,
  prompt_count bigint
)
language sql
security definer
set search_path = public
stable
as $$
  select * from public.get_public_categories()
  where slug = p_slug
  limit 1;
$$;

create or replace function public.get_public_prompts_by_category_slug(p_category_slug text)
returns table (
  id uuid,
  title text,
  slug text,
  description text,
  prompt_text text,
  prompt_preview text,
  negative_prompt text,
  variables jsonb,
  usage_notes_fa text,
  best_for text,
  model_compatibility text[],
  difficulty text,
  access_level text,
  cover_image_url text,
  example_images text[],
  category_name text,
  category_slug text,
  tags text[]
)
language sql
security definer
set search_path = public
stable
as $$
  select p.*
  from public.get_public_prompts() p
  where p.category_slug = p_category_slug;
$$;

grant execute on function public.get_public_prompts() to anon, authenticated;
grant execute on function public.get_public_prompt_by_slug(text) to anon, authenticated;
grant execute on function public.get_public_categories() to anon, authenticated;
grant execute on function public.get_public_category_by_slug(text) to anon, authenticated;
grant execute on function public.get_public_prompts_by_category_slug(text) to anon, authenticated;
