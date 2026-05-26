import { notFound } from "next/navigation";
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
      <h2 className="text-xl font-black text-text">ویرایش دسته‌بندی</h2>
      <CategoryForm action={action} submitLabel="ذخیره دسته" category={category as any} />
    </div>
  );
}
