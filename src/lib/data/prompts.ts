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
      .select("*")
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

    const [tagResult, promptCategoryResult] = await Promise.all([
      (supabase.from("prompt_tags") as any).select("tags(slug)").eq("prompt_id", prompt.id),
      (supabase.from("prompt_categories") as any).select("category_id").eq("prompt_id", prompt.id),
    ]);

    if (tagResult.error) {
      console.error("getPromptBySlug tags failed", tagResult.error.message);
    }

    if (promptCategoryResult.error) {
      console.error("getPromptBySlug prompt categories failed", promptCategoryResult.error.message);
    }

    const assignedCategoryIds = (promptCategoryResult.data ?? [])
      .map((row: any) => row.category_id)
      .filter(Boolean);

    const categoryIds = Array.from(new Set([...(assignedCategoryIds as string[]), prompt.category_id].filter(Boolean)));

    const { data: categoryRows, error: categoryError } = categoryIds.length > 0
      ? await (supabase.from("categories") as any)
          .select("id,name_fa,slug")
          .in("id", categoryIds)
      : { data: [], error: null };

    if (categoryError) {
      console.error("getPromptBySlug categories failed", categoryError.message);
    }

    const categoryById = new Map<string, { name_fa: string; slug: string }>();

    for (const category of categoryRows ?? []) {
      if (category.id) {
        categoryById.set(category.id, category);
      }
    }

    const assignedCategories = assignedCategoryIds
      .map((categoryId: string) => categoryById.get(categoryId))
      .filter(Boolean) as { name_fa: string; slug: string }[];

    const primaryCategory = assignedCategories[0] ?? (prompt.category_id ? categoryById.get(prompt.category_id) : null);

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
      category_name: primaryCategory?.name_fa ?? null,
      category_slug: primaryCategory?.slug ?? null,
      category_names: assignedCategories.map((category) => category.name_fa).filter(Boolean),
      category_slugs: assignedCategories.map((category) => category.slug).filter(Boolean),
      tags: (tagResult.data ?? []).map((row: any) => row.tags?.slug).filter(Boolean),
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
