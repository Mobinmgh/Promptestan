"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { EmptyState } from "@/components/ui/empty-state";
import type { Category, Prompt } from "@/types/prompt";

type FilterValue = "all" | "free" | "pro" | string;

export function PromptGallery({
  prompts,
  categories,
  isLoggedIn,
  savedPromptIds,
}: {
  prompts: Prompt[];
  categories: Category[];
  isLoggedIn: boolean;
  savedPromptIds: string[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  const filters = [
    { value: "all", label: "همه" },
    { value: "free", label: "رایگان" },
    { value: "pro", label: "حرفه‌ای" },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.name,
    })),
  ];

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const categorySlugs = prompt.categorySlugs ?? (prompt.categorySlug ? [prompt.categorySlug] : []);
      const matchesFilter =
        filter === "all" || prompt.access === filter || categorySlugs.includes(String(filter));

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      return [
        prompt.title,
        prompt.description,
        prompt.category,
        ...(prompt.categoryNames ?? []),
        ...(prompt.categorySlugs ?? []),
        ...prompt.tags,
        ...prompt.models,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [filter, prompts, query]);

  return (
    <>
      <div className="mb-8 rounded-2xl border border-border bg-surface p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
          <label className="relative block">
            <span className="sr-only">جستجوی پرامپت</span>
            <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جستجو در عنوان، دسته، تگ یا مدل..."
              className="h-11 w-full rounded-lg border border-border bg-background-soft py-2 pl-4 pr-10 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>

          <div className="flex max-w-2xl flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={
                  filter === item.value
                    ? "rounded-lg border border-accent bg-accent/18 px-3 py-2 text-xs font-semibold text-indigo-100"
                    : "rounded-lg border border-border bg-background-soft px-3 py-2 text-xs font-semibold text-text-muted transition hover:border-accent/70 hover:text-text"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredPrompts.length > 0 ? (
        <PromptGrid prompts={filteredPrompts} isLoggedIn={isLoggedIn} savedPromptIds={savedPromptIds} />
      ) : (
        <EmptyState
          title="نتیجه‌ای پیدا نشد"
          description="عبارت جستجو یا فیلتر انتخابی را تغییر بده، یا همه پرامپت‌ها را دوباره ببین."
          href="/prompts"
          actionLabel="پاک کردن فیلترها"
        />
      )}
    </>
  );
}
