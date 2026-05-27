import Link from "next/link";
import { deletePrompt, togglePromptPublished } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { EmptyState } from "@/components/ui/empty-state";
import { accessLabels, difficultyLabels } from "@/lib/admin/constants";
import { requireAdmin } from "@/lib/auth/admin";

type PageProps = {
  searchParams?: {
    q?: string;
    access?: string;
    published?: string;
  };
};

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

  const { data: prompts } = await query;

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-text">پرامپت‌ها</h2>
        <Link href="/admin/prompts/new" className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow">
          پرامپت جدید
        </Link>
      </div>

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

      {(prompts ?? []).length > 0 ? (
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[960px] text-sm">
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
            {(prompts ?? []).map((prompt: any) => (
              <tr key={prompt.id} className="border-t border-border">
                <td className="p-3 font-bold text-text">{prompt.title}</td>
                <td className="p-3 text-left text-text-muted" dir="ltr">{prompt.slug}</td>
                <td className="p-3 text-text-muted">{prompt.categories?.name_fa ?? "-"}</td>
                <td className="p-3 text-text-muted">{accessLabels[prompt.access_level] ?? prompt.access_level}</td>
                <td className="p-3 text-text-muted">{difficultyLabels[prompt.difficulty] ?? prompt.difficulty}</td>
                <td className="p-3 text-text-muted">{prompt.is_published ? "منتشرشده" : "پیش‌نویس"}</td>
                <td className="p-3 text-text-muted">{new Date(prompt.updated_at).toLocaleDateString("fa-IR")}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/prompts/${prompt.id}/edit`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text">
                      ویرایش
                    </Link>
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
            ))}
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
