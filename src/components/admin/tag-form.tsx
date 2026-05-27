import { ActionForm } from "@/components/admin/action-form";
import { Field, inputClass } from "@/components/admin/fields";

type TagRow = {
  name?: string;
  slug?: string;
};

export function TagForm({
  action,
  submitLabel,
  tag,
}: {
  action: (state: { error?: string }, formData: FormData) => Promise<{ error?: string }>;
  submitLabel: string;
  tag?: TagRow;
}) {
  return (
    <ActionForm action={action} submitLabel={submitLabel} className="grid gap-5 rounded-2xl border border-border bg-surface p-5">
      <Field label="نام">
        <input name="name" defaultValue={tag?.name ?? ""} className={inputClass} required />
      </Field>
      <Field label="اسلاگ">
        <input name="slug" defaultValue={tag?.slug ?? ""} dir="ltr" className={inputClass} required />
        <span className="text-xs font-normal text-text-muted">فقط حروف انگلیسی کوچک، عدد و خط تیره</span>
      </Field>
    </ActionForm>
  );
}
