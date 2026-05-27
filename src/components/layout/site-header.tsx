import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  let userEmail: string | null = null;
  let isAdmin = false;

  if (hasSupabaseEnv()) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;

    if (user) {
      const { data: profile } = await (supabase.from("profiles") as any)
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      isAdmin = profile?.role === "admin";
    }
  }

  return <HeaderNav userEmail={userEmail} isAdmin={isAdmin} />;
}
