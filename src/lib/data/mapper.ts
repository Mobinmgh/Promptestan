import type { PublicCategoryRow, PublicPromptRow } from "@/types/database";
import type { Category, Prompt, PromptVariable } from "@/types/prompt";

const fallbackImage = "/mock/perfume.svg";

function parseVariables(value: PublicPromptRow["variables"]): PromptVariable[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;

      if (typeof record.key !== "string") {
        return null;
      }

      return {
        key: record.key,
        labelFa: typeof record.label_fa === "string" ? record.label_fa : record.key,
        example: typeof record.example === "string" ? record.example : "",
      };
    })
    .filter((item): item is PromptVariable => Boolean(item));
}

function parseUsageGuide(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
}

export function mapPublicPrompt(row: PublicPromptRow): Prompt {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    category: row.category_name ?? "بدون دسته‌بندی",
    categorySlug: row.category_slug ?? undefined,
    tags: row.tags ?? [],
    access: row.access_level,
    difficulty: row.difficulty,
    models: row.model_compatibility ?? [],
    coverImage: row.cover_image_url ?? fallbackImage,
    imageAlt: row.title,
    promptText: row.prompt_text,
    promptPreview: row.prompt_preview,
    negativePrompt: row.negative_prompt,
    variables: parseVariables(row.variables),
    usageGuide: parseUsageGuide(row.usage_notes_fa),
    bestFor: row.best_for ?? "ساخت تصویر حرفه‌ای با هوش مصنوعی",
  };
}

export function mapPublicCategory(row: PublicCategoryRow): Category {
  return {
    id: row.id,
    name: row.name_fa,
    slug: row.slug,
    description: row.description ?? `پرامپت‌های آماده برای ${row.name_fa}`,
    count: row.prompt_count,
  };
}
