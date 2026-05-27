# Promptestan

پرامپتستان یک گالری فارسی‌اول برای پرامپت‌های تصویری آماده و تست‌شده است.

## Production Setup

### Environment Variables

Create `.env.local` locally and configure the same variables in your hosting provider:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://promptestan.com
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Do not expose it in client components or browser code.

If the server needs a proxy to reach Supabase, set:

```env
NEXT_SERVER_PROXY=http://127.0.0.1:PORT
```

### Migrations

Run the SQL files in order from `supabase/migrations`:

1. `001_initial_schema.sql`
2. `002_profile_security_hardening.sql`
3. `003_storage_prompt_images.sql`

### Seed Data

After migrations, run:

```txt
supabase/seed.sql
```

This inserts starter categories, tags, and sample prompts.

### First Admin

Create a user through `/login` or Supabase Auth, then manually promote that profile in Supabase SQL:

```sql
update public.profiles
set role = 'admin'
where email = 'you@example.com';
```

Pro access is manually controlled for now:

```sql
update public.profiles
set subscription_status = 'pro'
where email = 'customer@example.com';
```

### Deploy

1. Set the environment variables on the host.
2. Apply migrations to the production Supabase project.
3. Seed initial data if needed.
4. Build the app:

```bash
npm run build
```

5. Deploy with a Next.js-compatible platform.

No payment or AI image generation is included in this MVP.
