import { unstable_noStore as noStore } from "next/cache";
import { canViewProContent } from "@/lib/auth/access";
import { formatPromptRow } from "@/lib/data/format";
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
  const canViewPro = await canViewProContent();

  if (canViewPro) {
    const { data: prompt, error } = await (supabase.from("prompts") as any)
      .select("*,categories(name_fa,slug),prompt_categories(categories(name_fa,slug))")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error("getPromptBySlug full prompt failed", error.message);
      return null;
    }

    if (!prompt) {
      return null;
    }

    const { data: tagRows, error: tagError } = await (supabase.from("prompt_tags") as any)
      .select("tags(slug)")
      .eq("prompt_id", prompt.id);

    if (tagError) {
      console.error("getPromptBySlug tags failed", tagError.message);
    }

    const assignedCategories = (prompt.prompt_categories ?? [])
      .map((row: any) => row.categories)
      .filter(Boolean);

    return formatPromptRow({
      id: prompt.id,
      slug: prompt.slug,
      title: prompt.title,
      description: prompt.description,
      prompt_text: prompt.prompt_text,
      prompt_preview: prompt.access_level === "pro" ? `${String(prompt.prompt_text ?? "").slice(0, 180)}...` : null,
      negative_prompt: prompt.negative_prompt,
      variables: prompt.variables,
      usage_notes_fa: prompt.usage_notes_fa,
      best_for: prompt.best_for,
      model_compatibility: prompt.model_compatibility,
      difficulty: prompt.difficulty,
      access_level: prompt.access_level,
      cover_image_url: prompt.cover_image_url,
      category_name: prompt.categories?.name_fa ?? null,
      category_slug: prompt.categories?.slug ?? null,
      category_names: assignedCategories.map((category: any) => category.name_fa).filter(Boolean),
      category_slugs: assignedCategories.map((category: any) => category.slug).filter(Boolean),
      tags: (tagRows ?? []).map((row: any) => row.tags?.slug).filter(Boolean),
    });
  }

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

  const currentCategorySlugs = new Set(current.categorySlugs ?? (current.categorySlug ? [current.categorySlug] : []));

  return prompts
    .filter((prompt) => {
      const categorySlugs = prompt.categorySlugs ?? (prompt.categorySlug ? [prompt.categorySlug] : []);
      return prompt.slug !== slug && categorySlugs.some((categorySlug) => currentCategorySlugs.has(categorySlug));
    })
    .concat(
      prompts.filter((prompt) => {
        const categorySlugs = prompt.categorySlugs ?? (prompt.categorySlug ? [prompt.categorySlug] : []);
        return prompt.slug !== slug && !categorySlugs.some((categorySlug) => currentCategorySlugs.has(categorySlug));
      }),
    )
    .slice(0, 3);
}
