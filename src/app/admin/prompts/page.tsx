import Link from "next/link";
import { deletePrompt, duplicatePrompt, togglePromptPublished } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { EmptyState } from "@/components/ui/empty-state";
import { accessLabels, difficultyLabels } from "@/lib/admin/constants";
import { requireAdmin } from "@/lib/auth/admin";

type PageProps = {
  searchParams?: {
    q?: string;
    access?: string;
    published?: string;
    error?: string;
  };
};

function AccessBadge({ access }: { access: string }) {
  return (
    <span className={access === "pro" ? "rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-bold text-indigo-100" : "rounded-full border border-success/35 bg-success/10 px-2.5 py-1 text-xs font-bold text-success"}>
      {accessLabels[access] ?? access}
    </span>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span className={published ? "rounded-full border border-success/35 bg-success/10 px-2.5 py-1 text-xs font-bold text-success" : "rounded-full border border-warning/35 bg-warning/10 px-2.5 py-1 text-xs font-bold text-yellow-200"}>
      {published ? "منتشرشده" : "پیش‌نویس"}
    </span>
  );
}

export default async function AdminPromptsPage({ searchParams }: PageProps) {
  const { supabase } = await requireAdmin();
  const q = searchParams?.q?.trim() ?? "";
  const access = searchParams?.access ?? "all";
  const published = searchParams?.published ?? "all";

  let query = (supabase.from("prompts") as any)
    .select("id,title,slug,access_level,difficulty,is_published,updated_at,category_id,categories(name_fa,slug)")
    .order("updated_at", { ascending: false });

  if (q) query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
  if (access !== "all") query = query.eq("access_level", access);
  if (published !== "all") query = query.eq("is_published", published === "published");

  const { data: prompts, error: promptsError } = await query;
  const promptRows = prompts ?? [];
  const categoriesByPromptId = new Map<string, string[]>();
  let categoryWarning: string | null = null;

  if (!promptsError && promptRows.length > 0) {
    const promptIds = promptRows.map((prompt: any) => prompt.id).filter(Boolean);
    const { data: categoryRows, error: categoryError } = await (supabase.from("prompt_categories") as any)
      .select("prompt_id,categories(name_fa,slug)")
      .in("prompt_id", promptIds);

    if (categoryError) {
      categoryWarning = `پرامپت‌ها دریافت شدند اما دسته‌بندی‌ها کامل بارگذاری نشدند: ${categoryError.message}`;
    } else {
      for (const row of categoryRows ?? []) {
        const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;

        if (!category?.name_fa) {
          continue;
        }

        const current = categoriesByPromptId.get(row.prompt_id) ?? [];
        current.push(category.name_fa);
        categoriesByPromptId.set(row.prompt_id, current);
      }
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-text">پرامپت‌ها</h2>
        <Link href="/admin/prompts/new" className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow">
          پرامپت جدید
        </Link>
      </div>

      {searchParams?.error ? (
        <div className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-red-100">
          {searchParams.error}
        </div>
      ) : null}

      {promptsError ? (
        <div className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-red-100">
          خطا در دریافت پرامپت‌ها: {promptsError.message}
        </div>
      ) : null}

      {categoryWarning ? (
        <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-yellow-100">
          {categoryWarning}
        </div>
      ) : null}

      <form className="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[1fr_12rem_12rem_auto]">
        <input name="q" defaultValue={q} placeholder="جستجو عنوان یا اسلاگ" className="rounded-lg border border-border bg-background-soft px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        <select name="access" defaultValue={access} className="rounded-lg border border-border bg-background-soft px-3 py-2 text-sm text-text">
          <option value="all">همه دسترسی‌ها</option>
          <option value="free">رایگان</option>
          <option value="pro">حرفه‌ای</option>
        </select>
        <select name="published" defaultValue={published} className="rounded-lg border border-border bg-background-soft px-3 py-2 text-sm text-text">
          <option value="all">همه وضعیت‌ها</option>
          <option value="published">منتشرشده</option>
          <option value="draft">منتشرنشده</option>
        </select>
        <button className="rounded-lg border border-accent/50 bg-accent/15 px-4 py-2 text-sm font-bold text-indigo-100">
          اعمال
        </button>
      </form>

      {!promptsError && promptRows.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[1060px] text-sm">
            <thead className="bg-background-soft text-text-muted">
              <tr>
                <th className="p-3 text-right">عنوان</th>
                <th className="p-3 text-right">اسلاگ</th>
                <th className="p-3 text-right">دسته</th>
                <th className="p-3 text-right">دسترسی</th>
                <th className="p-3 text-right">سختی</th>
                <th className="p-3 text-right">وضعیت</th>
                <th className="p-3 text-right">به‌روزرسانی</th>
                <th className="p-3 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {promptRows.map((prompt: any) => {
                const assignedCategories = categoriesByPromptId.get(prompt.id) ?? [];
                const categories = assignedCategories.length > 0 ? assignedCategories : prompt.categories?.name_fa ? [prompt.categories.name_fa] : [];
                const visibleCategories = categories.slice(0, 2);
                const extraCategoryCount = Math.max(categories.length - visibleCategories.length, 0);

                return (
                <tr key={prompt.id} className="border-t border-border">
                  <td className="p-3 font-bold text-text">{prompt.title}</td>
                  <td className="p-3 text-left text-text-muted" dir="ltr">{prompt.slug}</td>
                  <td className="p-3 text-text-muted">
                    <div className="flex flex-wrap gap-1.5">
                      {visibleCategories.length > 0 ? visibleCategories.map((category: string) => (
                        <span key={category} className="rounded-full border border-border bg-background-soft px-2 py-1 text-xs">
                          {category}
                        </span>
                      )) : "-"}
                      {extraCategoryCount > 0 ? (
                        <span className="rounded-full border border-border bg-background-soft px-2 py-1 text-xs">
                          +{extraCategoryCount}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="p-3"><AccessBadge access={prompt.access_level} /></td>
                  <td className="p-3 text-text-muted">{difficultyLabels[prompt.difficulty] ?? prompt.difficulty}</td>
                  <td className="p-3"><StatusBadge published={prompt.is_published} /></td>
                  <td className="p-3 text-text-muted">{new Date(prompt.updated_at).toLocaleDateString("fa-IR")}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/prompts/${prompt.id}/edit`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text">
                        ویرایش
                      </Link>
                      {prompt.is_published ? (
                        <Link href={`/prompts/${prompt.slug}`} className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-bold text-indigo-100">
                          نمایش عمومی
                        </Link>
                      ) : null}
                      <form action={duplicatePrompt}>
                        <input type="hidden" name="id" value={prompt.id} />
                        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text">
                          کپی
                        </button>
                      </form>
                      <form action={togglePromptPublished}>
                        <input type="hidden" name="id" value={prompt.id} />
                        <input type="hidden" name="slug" value={prompt.slug} />
                        <input type="hidden" name="category_id" value={prompt.category_id ?? ""} />
                        <input type="hidden" name="is_published" value={String(prompt.is_published)} />
                        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text">
                          {prompt.is_published ? "لغو انتشار" : "انتشار"}
                        </button>
                      </form>
                      <form action={deletePrompt}>
                        <input type="hidden" name="id" value={prompt.id} />
                        <input type="hidden" name="slug" value={prompt.slug} />
                        <input type="hidden" name="category_id" value={prompt.category_id ?? ""} />
                        <ConfirmSubmitButton className="rounded-lg border border-danger/40 px-3 py-1.5 text-xs font-bold text-red-200">
                          حذف
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="پرامپتی پیدا نشد"
          description="اولین پرامپت را بساز یا فیلترهای جستجو را تغییر بده."
          href="/admin/prompts/new"
          actionLabel="ساخت پرامپت"
        />
      )}
    </div>
  );
}
