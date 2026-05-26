# Security Notes

- Normal users cannot update their `profiles.role`.
- Normal users cannot update their `profiles.subscription_status`.
- Pro access must be granted by an admin or server-side service role logic only.
- Public prompt RPC functions mask pro `prompt_text`; anonymous and free users receive metadata plus a short preview only.
- Admin-only management policies are RLS-gated through `public.is_admin()`.
