"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/auth/profile";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export type AuthFormState = {
  error: string | null;
};

function getCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      email,
      password,
      error: "ایمیل و رمز عبور را وارد کن.",
    };
  }

  return { email, password, error: null };
}

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!hasSupabaseEnv()) {
    return { error: "متغیرهای محیطی Supabase تنظیم نشده‌اند." };
  }

  const { email, password, error } = getCredentials(formData);

  if (error) {
    return { error };
  }

  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

  if (authError || !data.user) {
    return { error: authError?.message ?? "ورود ناموفق بود." };
  }

  await ensureProfile(data.user);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!hasSupabaseEnv()) {
    return { error: "متغیرهای محیطی Supabase تنظیم نشده‌اند." };
  }

  const { email, password, error } = getCredentials(formData);

  if (error) {
    return { error };
  }

  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.signUp({ email, password });

  if (authError || !data.user) {
    return { error: authError?.message ?? "ساخت حساب ناموفق بود." };
  }

  await ensureProfile(data.user);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  if (hasSupabaseEnv()) {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/");
}
