import { notFound } from "next/navigation";
import Link from "next/link";
import { updateCategory } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { requireAdmin } from "@/lib/auth/admin";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params }: PageProps) {
  const { supabase } = await requireAdmin();
  const { data: category } = await supabase
    .from("categories")
    .select("name_fa,name_en,slug,description,sort_order,is_published")
    .eq("id", params.id)
    .maybeSingle();

  if (!category) {
    notFound();
  }

  const action = updateCategory.bind(null, params.id);

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-text">ویرایش دسته‌بندی</h2>
        <Link href="/admin/categories" className="text-sm font-bold text-indigo-200 hover:text-white">بازگشت به لیست</Link>
      </div>
      <CategoryForm action={action} submitLabel="ذخیره دسته" category={category as any} />
    </div>
  );
}
