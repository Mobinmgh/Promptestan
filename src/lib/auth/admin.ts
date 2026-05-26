import { redirect } from "next/navigation";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = createClient();
  const { data } = await (supabase.from("profiles") as any)
    .select("id,email,full_name,role,subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  return data as {
    id: string;
    email: string | null;
    full_name: string | null;
    role: "user" | "admin";
    subscription_status: "free" | "pro";
  } | null;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const profile = await getCurrentProfile();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return {
    user,
    profile,
    supabase: createClient(),
  };
}
