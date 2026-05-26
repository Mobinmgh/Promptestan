import { unstable_noStore as noStore } from "next/cache";
import { mapPublicCategory, mapPublicPrompt } from "@/lib/data/mapper";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { PublicCategoryRow, PublicPromptRow } from "@/types/database";
import type { Category, Prompt } from "@/types/prompt";

export async function getCategories(): Promise<Category[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await (supabase as any).rpc("get_public_categories");

  if (error) {
    console.error("getCategories failed", error.message);
    return [];
  }

  return ((data ?? []) as PublicCategoryRow[]).map(mapPublicCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  noStore();

  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = createClient();
  const { data, error } = await (supabase as any).rpc("get_public_category_by_slug", { p_slug: slug });

  if (error) {
    console.error("getCategoryBySlug failed", error.message);
    return null;
  }

  const rows = (data ?? []) as PublicCategoryRow[];
  return rows[0] ? mapPublicCategory(rows[0]) : null;
}

export async function getPromptsByCategorySlug(slug: string): Promise<Prompt[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await (supabase as any).rpc("get_public_prompts_by_category_slug", { p_category_slug: slug });

  if (error) {
    console.error("getPromptsByCategorySlug failed", error.message);
    return [];
  }

  return ((data ?? []) as PublicPromptRow[]).map(mapPublicPrompt);
}
