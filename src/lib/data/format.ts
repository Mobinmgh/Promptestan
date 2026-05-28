import type { Prompt, PromptVariable } from "@/types/prompt";

export type PromptLikeRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  prompt_text: string | null;
  prompt_preview?: string | null;
  negative_prompt?: string | null;
  variables: unknown;
  usage_notes_fa: string | null;
  best_for: string | null;
  model_compatibility: string[] | null;
  difficulty: Prompt["difficulty"];
  access_level: Prompt["access"];
  cover_image_url: string | null;
  category_name?: string | null;
  category_slug?: string | null;
  category_names?: string[] | null;
  category_slugs?: string[] | null;
  tags?: string[] | null;
};

const fallbackImage = "/mock/perfume.svg";

export function parseVariables(value: unknown): PromptVariable[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;

      if (typeof record.key !== "string" || !record.key.trim()) {
        return null;
      }

      const labelFa =
        typeof record.label_fa === "string"
          ? record.label_fa
          : typeof record.labelFa === "string"
            ? record.labelFa
            : record.key;

      return {
        key: record.key,
        labelFa,
        example: typeof record.example === "string" ? record.example : "",
      };
    })
    .filter((item): item is PromptVariable => Boolean(item));
}

export function parseUsageGuide(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
}

export function formatPromptRow(row: PromptLikeRow): Prompt {
  const categoryNames = row.category_names?.filter(Boolean) ?? [];
  const categorySlugs = row.category_slugs?.filter(Boolean) ?? [];
  const categories = categoryNames
    .map((name, index) => {
      const slug = categorySlugs[index];
      return slug ? { name, slug } : null;
    })
    .filter((item): item is { name: string; slug: string } => Boolean(item));
  const primaryCategory =
    categories[0] ??
    (row.category_name && row.category_slug ? { name: row.category_name, slug: row.category_slug } : null);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    category: primaryCategory?.name ?? row.category_name ?? "بدون دسته‌بندی",
    categorySlug: primaryCategory?.slug ?? row.category_slug ?? undefined,
    categories: categories.length > 0 ? categories : primaryCategory ? [primaryCategory] : [],
    categoryNames: categoryNames.length > 0 ? categoryNames : primaryCategory ? [primaryCategory.name] : [],
    categorySlugs: categorySlugs.length > 0 ? categorySlugs : primaryCategory ? [primaryCategory.slug] : [],
    tags: row.tags ?? [],
    access: row.access_level,
    difficulty: row.difficulty,
    models: row.model_compatibility ?? [],
    coverImage: row.cover_image_url || fallbackImage,
    imageAlt: row.title,
    promptText: row.prompt_text,
    promptPreview:
      row.prompt_preview ??
      (row.access_level === "pro" && row.prompt_text ? `${row.prompt_text.slice(0, 180)}...` : null),
    negativePrompt: row.negative_prompt ?? null,
    variables: parseVariables(row.variables),
    usageGuide: parseUsageGuide(row.usage_notes_fa),
    bestFor: row.best_for ?? "ساخت تصویر حرفه‌ای با هوش مصنوعی",
  };
}
