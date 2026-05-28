create table if not exists public.prompt_categories (
  prompt_id uuid references public.prompts(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (prompt_id, category_id)
);

create index if not exists prompt_categories_category_id_idx on public.prompt_categories(category_id);

alter table public.prompt_categories enable row level security;

insert into public.prompt_categories (prompt_id, category_id)
select id, category_id
from public.prompts
where category_id is not null
on conflict (prompt_id, category_id) do nothing;

drop policy if exists "Public can read prompt categories for published prompts" on public.prompt_categories;
create policy "Public can read prompt categories for published prompts"
on public.prompt_categories for select
to anon, authenticated
using (
  exists (
    select 1
    from public.prompts p
    where p.id = prompt_categories.prompt_id
      and p.is_published = true
  )
);

drop policy if exists "Admins can manage prompt categories" on public.prompt_categories;
create policy "Admins can manage prompt categories"
on public.prompt_categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop function if exists public.get_public_prompts_by_category_slug(text);
drop function if exists public.get_public_prompt_by_slug(text);
drop function if exists public.get_public_prompts();
drop function if exists public.get_public_category_by_slug(text);
drop function if exists public.get_public_categories();

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
  category_names text[],
  category_slugs text[],
  tags text[]
)
language sql
security definer
set search_path = public
stable
as $$
  with assigned_categories as (
    select
      pc.prompt_id,
      array_agg(c.name_fa order by c.sort_order, c.name_fa) as category_names,
      array_agg(c.slug order by c.sort_order, c.name_fa) as category_slugs
    from public.prompt_categories pc
    join public.categories c on c.id = pc.category_id
    where c.is_published = true
    group by pc.prompt_id
  ),
  assigned_tags as (
    select
      pt.prompt_id,
      array_agg(t.slug order by t.slug) as tags
    from public.prompt_tags pt
    join public.tags t on t.id = pt.tag_id
    group by pt.prompt_id
  )
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
    coalesce((ac.category_names)[1], primary_category.name_fa) as category_name,
    coalesce((ac.category_slugs)[1], primary_category.slug) as category_slug,
    coalesce(ac.category_names, case when primary_category.name_fa is not null then array[primary_category.name_fa] else '{}'::text[] end) as category_names,
    coalesce(ac.category_slugs, case when primary_category.slug is not null then array[primary_category.slug] else '{}'::text[] end) as category_slugs,
    coalesce(at.tags, '{}'::text[]) as tags
  from public.prompts p
  left join public.categories primary_category on primary_category.id = p.category_id
  left join assigned_categories ac on ac.prompt_id = p.id
  left join assigned_tags at on at.prompt_id = p.id
  where p.is_published = true
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
  category_names text[],
  category_slugs text[],
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
    count(distinct p.id) as prompt_count
  from public.categories c
  left join public.prompt_categories pc on pc.category_id = c.id
  left join public.prompts p on p.id = pc.prompt_id and p.is_published = true
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
  category_names text[],
  category_slugs text[],
  tags text[]
)
language sql
security definer
set search_path = public
stable
as $$
  select p.*
  from public.get_public_prompts() p
  where p_category_slug = any(p.category_slugs);
$$;

grant execute on function public.get_public_prompts() to anon, authenticated;
grant execute on function public.get_public_prompt_by_slug(text) to anon, authenticated;
grant execute on function public.get_public_categories() to anon, authenticated;
grant execute on function public.get_public_category_by_slug(text) to anon, authenticated;
grant execute on function public.get_public_prompts_by_category_slug(text) to anon, authenticated;
