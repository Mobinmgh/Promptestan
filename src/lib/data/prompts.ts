import { unstable_noStore as noStore } from "next/cache";
import { mapPublicPrompt } from "@/lib/data/mapper";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { PublicPromptRow } from "@/types/database";
import type { Prompt } from "@/types/prompt";

export async function getPublishedPrompts(): Promise<Prompt[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await (supabase as any).rpc("get_public_prompts");

  if (error) {
    console.error("getPublishedPrompts failed", error.message);
    return [];
  }

  return ((data ?? []) as PublicPromptRow[]).map(mapPublicPrompt);
}

export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  noStore();

  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = createClient();
  const { data, error } = await (supabase as any).rpc("get_public_prompt_by_slug", { p_slug: slug });

  if (error) {
    console.error("getPromptBySlug failed", error.message);
    return null;
  }

  const rows = (data ?? []) as PublicPromptRow[];
  return rows[0] ? mapPublicPrompt(rows[0]) : null;
}

export async function getRelatedPrompts(slug: string): Promise<Prompt[]> {
  const current = await getPromptBySlug(slug);
  const prompts = await getPublishedPrompts();

  if (!current) {
    return prompts.slice(0, 3);
  }

  return prompts
    .filter((prompt) => prompt.slug !== slug && prompt.category === current.category)
    .concat(prompts.filter((prompt) => prompt.slug !== slug && prompt.category !== current.category))
    .slice(0, 3);
}
