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
      error: "Enter both email and password.",
    };
  }

  return { email, password, error: null };
}

function normalizeAuthError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error && "message" in error
        ? String((error as { message?: unknown }).message ?? "")
        : String(error ?? "");

  if (message.toLowerCase().includes("fetch failed")) {
    return "Could not reach Supabase from the Next.js server. Restart dev server and check network/VPN/firewall.";
  }

  return message || "Unexpected Supabase auth error.";
}

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase environment variables are missing." };
  }

  const { email, password, error } = getCredentials(formData);

  if (error) {
    return { error };
  }

  const supabase = createClient();
  let result;

  try {
    result = await supabase.auth.signInWithPassword({ email, password });
  } catch (authError) {
    return { error: normalizeAuthError(authError) };
  }

  const { data, error: authError } = result;

  if (authError || !data.user) {
    return { error: authError ? normalizeAuthError(authError) : "Login failed." };
  }

  try {
    await ensureProfile(data.user);
  } catch (profileError) {
    return { error: normalizeAuthError(profileError) };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase environment variables are missing." };
  }

  const { email, password, error } = getCredentials(formData);

  if (error) {
    return { error };
  }

  const supabase = createClient();
  let result;

  try {
    result = await supabase.auth.signUp({ email, password });
  } catch (authError) {
    return { error: normalizeAuthError(authError) };
  }

  const { data, error: authError } = result;

  if (authError || !data.user) {
    return { error: authError ? normalizeAuthError(authError) : "Signup failed." };
  }

  try {
    await ensureProfile(data.user);
  } catch (profileError) {
    return { error: normalizeAuthError(profileError) };
  }

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
