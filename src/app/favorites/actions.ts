"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export async function savePrompt(formData: FormData) {
  const user = await requireUser();
  const promptId = String(formData.get("prompt_id") ?? "");
  const slug = String(formData.get("slug") ?? "");

  if (!promptId) {
    return;
  }

  const supabase = createClient();
  const { error } = await (supabase.from("favorites") as any).insert({ user_id: user.id, prompt_id: promptId });

  if (error && error.code !== "23505") {
    console.error("savePrompt failed", error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/prompts");
  if (slug) revalidatePath(`/prompts/${slug}`);
}

export async function unsavePrompt(formData: FormData) {
  const user = await requireUser();
  const promptId = String(formData.get("prompt_id") ?? "");
  const slug = String(formData.get("slug") ?? "");

  if (!promptId) {
    return;
  }

  const supabase = createClient();
  await (supabase.from("favorites") as any)
    .delete()
    .eq("user_id", user.id)
    .eq("prompt_id", promptId);

  revalidatePath("/dashboard");
  revalidatePath("/prompts");
  if (slug) revalidatePath(`/prompts/${slug}`);
}

export async function redirectToLogin() {
  redirect("/login");
}
