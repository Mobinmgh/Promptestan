import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function ensureProfile(user: User) {
  const profile = {
    id: user.id,
    email: user.email ?? null,
    full_name: (user.user_metadata?.full_name as string | undefined) ?? null,
    role: "user" as const,
    subscription_status: "free" as const,
    updated_at: new Date().toISOString(),
  };

  const adminClient = createAdminClient();

  if (adminClient) {
    const profiles = adminClient.from("profiles") as any;
    const { data } = await profiles.select("id").eq("id", user.id).maybeSingle();

    if (!data) {
      await profiles.insert(profile);
    } else {
      await profiles.update({ email: profile.email, updated_at: profile.updated_at }).eq("id", user.id);
    }

    return;
  }

  const supabase = createServerClient();
  const profiles = supabase.from("profiles") as any;
  const { data } = await profiles.select("id").eq("id", user.id).maybeSingle();

  if (!data) {
    await profiles.insert(profile);
  }
}
