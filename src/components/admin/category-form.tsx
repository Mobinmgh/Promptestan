import { ActionForm } from "@/components/admin/action-form";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";

type CategoryRow = {
  name_fa?: string;
  name_en?: string | null;
  slug?: string;
  description?: string | null;
  sort_order?: number;
  is_published?: boolean;
};

export function CategoryForm({
  action,
  submitLabel,
  category,
}: {
  action: (state: { error?: string }, formData: FormData) => Promise<{ error?: string }>;
  submitLabel: string;
  category?: CategoryRow;
}) {
  return (
    <ActionForm action={action} submitLabel={submitLabel} className="grid gap-5 rounded-2xl border border-border bg-surface p-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="نام فارسی">
          <input name="name_fa" defaultValue={category?.name_fa ?? ""} className={inputClass} required />
        </Field>
        <Field label="نام انگلیسی">
          <input name="name_en" defaultValue={category?.name_en ?? ""} className={inputClass} />
        </Field>
      </div>
      <Field label="اسلاگ">
        <input name="slug" defaultValue={category?.slug ?? ""} dir="ltr" className={inputClass} required />
        <span className="text-xs font-normal text-text-muted">فقط حروف انگلیسی کوچک، عدد و خط تیره</span>
      </Field>
      <Field label="توضیحات">
        <textarea name="description" defaultValue={category?.description ?? ""} className={textareaClass} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="ترتیب نمایش">
          <input name="sort_order" type="number" defaultValue={category?.sort_order ?? 0} className={inputClass} />
        </Field>
        <label className="mt-7 flex items-center gap-2 rounded-lg border border-border bg-background-soft px-3 py-2 text-sm font-semibold text-text">
          <input type="checkbox" name="is_published" defaultChecked={category?.is_published ?? true} />
          منتشر باشد
        </label>
      </div>
    </ActionForm>
  );
}
