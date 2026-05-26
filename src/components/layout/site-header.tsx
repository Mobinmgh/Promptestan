import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  let userEmail: string | null = null;

  if (hasSupabaseEnv()) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  }

  return <HeaderNav userEmail={userEmail} />;
}
