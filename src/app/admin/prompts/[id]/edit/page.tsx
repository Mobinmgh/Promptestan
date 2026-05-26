import { notFound } from "next/navigation";
import { updatePrompt } from "@/app/admin/actions";
import { PromptForm } from "@/components/admin/prompt-form";
import { requireAdmin } from "@/lib/auth/admin";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditPromptPage({ params }: PageProps) {
  const { supabase } = await requireAdmin();
  const [{ data: prompt }, { data: categories }, { data: tags }, { data: promptTags }] = await Promise.all([
    (supabase.from("prompts") as any).select("*").eq("id", params.id).maybeSingle(),
    supabase.from("categories").select("id,name_fa").order("sort_order"),
    supabase.from("tags").select("id,name,slug").order("name"),
    supabase.from("prompt_tags").select("tag_id").eq("prompt_id", params.id),
  ]);

  if (!prompt) {
    notFound();
  }

  const action = updatePrompt.bind(null, params.id);
  const enrichedPrompt = {
    ...prompt,
    tag_ids: (promptTags ?? []).map((item: any) => item.tag_id),
  };

  return (
    <div className="grid gap-5">
      <h2 className="text-xl font-black text-text">ویرایش پرامپت</h2>
      <PromptForm action={action} submitLabel="ذخیره تغییرات" prompt={enrichedPrompt} categories={(categories ?? []) as any} tags={(tags ?? []) as any} />
    </div>
  );
}
