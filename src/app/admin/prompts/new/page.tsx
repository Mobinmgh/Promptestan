import { createPrompt } from "@/app/admin/actions";
import { PromptForm } from "@/components/admin/prompt-form";
import { requireAdmin } from "@/lib/auth/admin";

export default async function NewPromptPage() {
  const { supabase } = await requireAdmin();
  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from("categories").select("id,name_fa").order("sort_order"),
    supabase.from("tags").select("id,name,slug").order("name"),
  ]);

  return (
    <div className="grid gap-5">
      <h2 className="text-xl font-black text-text">پرامپت جدید</h2>
      <PromptForm action={createPrompt} submitLabel="ساخت پرامپت" categories={(categories ?? []) as any} tags={(tags ?? []) as any} />
    </div>
  );
}
