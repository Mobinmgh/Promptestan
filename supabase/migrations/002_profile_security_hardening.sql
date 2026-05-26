create or replace function public.is_admin(user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'admin'
  );
$$;

create or replace function public.is_pro_user(user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and (subscription_status = 'pro' or role = 'admin')
  );
$$;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own basic profile" on public.profiles;
drop policy if exists "Admins can manage profiles" on public.profiles;

create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Admins can manage profiles"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Users can create own free profile fallback"
on public.profiles for insert
to authenticated
with check (
  id = auth.uid()
  and role = 'user'
  and subscription_status = 'free'
);

drop policy if exists "Pro users can read published pro prompts" on public.prompts;

create policy "Pro users can read published pro prompts"
on public.prompts for select
to authenticated
using (
  is_published = true
  and access_level = 'pro'
  and public.is_pro_user()
);
