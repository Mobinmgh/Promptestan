import { unstable_noStore as noStore } from "next/cache";
import { mapPublicPrompt } from "@/lib/data/mapper";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { PublicPromptRow } from "@/types/database";
import type { Prompt } from "@/types/prompt";

export async function getUserFavoritePromptIds(userId: string): Promise<string[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await (supabase.from("favorites") as any)
    .select("prompt_id")
    .eq("user_id", userId);

  if (error) {
    console.error("getUserFavoritePromptIds failed", error.message);
    return [];
  }

  return (data ?? []).map((item: { prompt_id: string }) => item.prompt_id);
}

export async function isPromptSaved(userId: string, promptId: string): Promise<boolean> {
  noStore();

  if (!hasSupabaseEnv()) {
    return false;
  }

  const supabase = createClient();
  const { data } = await (supabase.from("favorites") as any)
    .select("prompt_id")
    .eq("user_id", userId)
    .eq("prompt_id", promptId)
    .maybeSingle();

  return Boolean(data);
}

export async function getSavedPromptsForUser(userId: string): Promise<Prompt[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await (supabase as any).rpc("get_public_prompts");

  if (error) {
    console.error("getSavedPromptsForUser failed", error.message);
    return [];
  }

  const favoriteIds = new Set(await getUserFavoritePromptIds(userId));

  return ((data ?? []) as PublicPromptRow[])
    .filter((prompt) => favoriteIds.has(prompt.id))
    .map(mapPublicPrompt);
}
