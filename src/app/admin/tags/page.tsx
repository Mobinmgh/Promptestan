import Link from "next/link";
import { createTag, deleteTag } from "@/app/admin/actions";
import { TagForm } from "@/components/admin/tag-form";
import { requireAdmin } from "@/lib/auth/admin";

export default async function AdminTagsPage() {
  const { supabase } = await requireAdmin();
  const { data: tags } = await supabase.from("tags").select("id,name,slug").order("name");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <div className="grid gap-4">
        <h2 className="text-xl font-black text-text">تگ‌ها</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-background-soft text-text-muted">
              <tr>
                <th className="p-3 text-right">نام</th>
                <th className="p-3 text-right">اسلاگ</th>
                <th className="p-3 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {(tags ?? []).map((tag: any) => (
                <tr key={tag.id} className="border-t border-border">
                  <td className="p-3 font-bold text-text">{tag.name}</td>
                  <td className="p-3 text-left text-text-muted" dir="ltr">{tag.slug}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/tags/${tag.id}/edit`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text">
                        ویرایش
                      </Link>
                      <form action={deleteTag}>
                        <input type="hidden" name="id" value={tag.id} />
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
        <h2 className="text-xl font-black text-text">تگ جدید</h2>
        <TagForm action={createTag} submitLabel="ساخت تگ" />
      </div>
    </div>
  );
}
