import { unstable_noStore as noStore } from "next/cache";
import { canViewProContent } from "@/lib/auth/access";
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
      .select("*,categories(name_fa,slug)")
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

    const { data: tagRows } = await (supabase.from("prompt_tags") as any)
      .select("tags(slug)")
      .eq("prompt_id", prompt.id);

    return {
      id: prompt.id,
      slug: prompt.slug,
      title: prompt.title,
      description: prompt.description ?? "",
      category: prompt.categories?.name_fa ?? "بدون دسته‌بندی",
      categorySlug: prompt.categories?.slug ?? undefined,
      tags: (tagRows ?? []).map((row: any) => row.tags?.slug).filter(Boolean),
      access: prompt.access_level,
      difficulty: prompt.difficulty,
      models: prompt.model_compatibility ?? [],
      coverImage: prompt.cover_image_url ?? "/mock/perfume.svg",
      imageAlt: prompt.title,
      promptText: prompt.prompt_text,
      promptPreview: prompt.access_level === "pro" ? `${String(prompt.prompt_text).slice(0, 180)}...` : null,
      negativePrompt: prompt.negative_prompt,
      variables: Array.isArray(prompt.variables)
        ? prompt.variables.map((item: any) => ({
            key: String(item.key ?? ""),
            labelFa: String(item.label_fa ?? item.key ?? ""),
            example: String(item.example ?? ""),
          }))
        : [],
      usageGuide: String(prompt.usage_notes_fa ?? "")
        .split(/\r?\n/)
        .map((item) => item.trim().replace(/^[-•]\s*/, ""))
        .filter(Boolean),
      bestFor: prompt.best_for ?? "ساخت تصویر حرفه‌ای با هوش مصنوعی",
    };
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

  return prompts
    .filter((prompt) => prompt.slug !== slug && prompt.category === current.category)
    .concat(prompts.filter((prompt) => prompt.slug !== slug && prompt.category !== current.category))
    .slice(0, 3);
}
