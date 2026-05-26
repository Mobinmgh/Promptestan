insert into storage.buckets (id, name, public)
values ('prompt-images', 'prompt-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read prompt images" on storage.objects;
create policy "Public can read prompt images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'prompt-images');

drop policy if exists "Admins can insert prompt images" on storage.objects;
create policy "Admins can insert prompt images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'prompt-images'
  and public.is_admin()
);

drop policy if exists "Admins can update prompt images" on storage.objects;
create policy "Admins can update prompt images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'prompt-images'
  and public.is_admin()
)
with check (
  bucket_id = 'prompt-images'
  and public.is_admin()
);

drop policy if exists "Admins can delete prompt images" on storage.objects;
create policy "Admins can delete prompt images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'prompt-images'
  and public.is_admin()
);
