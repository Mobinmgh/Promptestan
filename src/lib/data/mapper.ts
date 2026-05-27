import { formatPromptRow } from "@/lib/data/format";
import type { PublicCategoryRow, PublicPromptRow } from "@/types/database";
import type { Category, Prompt } from "@/types/prompt";

export function mapPublicPrompt(row: PublicPromptRow): Prompt {
  return formatPromptRow(row);
}

export function mapPublicCategory(row: PublicCategoryRow): Category {
  return {
    id: row.id,
    name: row.name_fa,
    slug: row.slug,
    description: row.description ?? `پرامپت‌های آماده برای ${row.name_fa}`,
    count: Number(row.prompt_count ?? 0),
  };
}
