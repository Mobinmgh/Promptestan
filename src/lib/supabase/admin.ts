import { createClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "./env";
import { supabaseServerFetch } from "./proxy-fetch";
import type { Database } from "@/types/database";

export function createAdminClient() {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    global: {
      fetch: supabaseServerFetch,
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
