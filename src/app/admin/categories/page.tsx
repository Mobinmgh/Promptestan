import Link from "next/link";
import { createCategory, deleteCategory } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { requireAdmin } from "@/lib/auth/admin";

type PageProps = {
  searchParams?: {
    error?: string;
  };
};

export default async function AdminCategoriesPage({ searchParams }: PageProps) {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("id,name_fa,name_en,slug,description,sort_order,is_published")
    .order("sort_order");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <div className="grid gap-4">
        <h2 className="text-xl font-black text-text">دسته‌بندی‌ها</h2>
        {searchParams?.error ? (
          <div className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-red-100">
            {searchParams.error}
          </div>
        ) : null}
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-background-soft text-text-muted">
              <tr>
                <th className="p-3 text-right">نام</th>
                <th className="p-3 text-right">اسلاگ</th>
                <th className="p-3 text-right">ترتیب</th>
                <th className="p-3 text-right">وضعیت</th>
                <th className="p-3 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {(categories ?? []).map((category: any) => (
                <tr key={category.id} className="border-t border-border">
                  <td className="p-3 font-bold text-text">{category.name_fa}</td>
                  <td className="p-3 text-left text-text-muted" dir="ltr">{category.slug}</td>
                  <td className="p-3 text-text-muted">{category.sort_order}</td>
                  <td className="p-3 text-text-muted">{category.is_published ? "منتشر" : "غیرفعال"}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/categories/${category.id}/edit`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text">
                        ویرایش
                      </Link>
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={category.id} />
                        <input type="hidden" name="slug" value={category.slug} />
                        <button className="rounded-lg border border-danger/40 px-3 py-1.5 text-xs font-bold text-red-200">
                          حذف
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4">
        <h2 className="text-xl font-black text-text">دسته جدید</h2>
        <CategoryForm action={createCategory} submitLabel="ساخت دسته" />
      </div>
    </div>
  );
}
