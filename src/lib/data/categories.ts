import { unstable_noStore as noStore } from "next/cache";
import { mapPublicCategory, mapPublicPrompt } from "@/lib/data/mapper";
import { getPublishedPrompts } from "@/lib/data/prompts";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { PublicCategoryRow } from "@/types/database";
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

  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getPromptsByCategorySlug(slug: string): Promise<Prompt[]> {
  noStore();

  const prompts = await getPublishedPrompts();
  return prompts.filter((prompt) => prompt.categorySlug === slug);
}
