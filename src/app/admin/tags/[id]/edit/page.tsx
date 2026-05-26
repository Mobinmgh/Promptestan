import { notFound } from "next/navigation";
import { updateTag } from "@/app/admin/actions";
import { TagForm } from "@/components/admin/tag-form";
import { requireAdmin } from "@/lib/auth/admin";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditTagPage({ params }: PageProps) {
  const { supabase } = await requireAdmin();
  const { data: tag } = await supabase.from("tags").select("name,slug").eq("id", params.id).maybeSingle();

  if (!tag) {
    notFound();
  }

  const action = updateTag.bind(null, params.id);

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <h2 className="text-xl font-black text-text">ویرایش تگ</h2>
      <TagForm action={action} submitLabel="ذخیره تگ" tag={tag as any} />
    </div>
  );
}
