import { ActionForm } from "@/components/admin/action-form";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import { accessLabels, accessOptions, difficultyLabels, difficultyOptions, modelOptions } from "@/lib/admin/constants";

type Category = { id: string; name_fa: string };
type Tag = { id: string; name: string; slug: string };
type PromptRow = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string | null;
  prompt_text?: string;
  negative_prompt?: string | null;
  variables?: unknown;
  usage_notes_fa?: string | null;
  best_for?: string | null;
  category_id?: string | null;
  model_compatibility?: string[];
  difficulty?: string;
  access_level?: string;
  cover_image_url?: string | null;
  example_images?: string[];
  is_published?: boolean;
  tag_ids?: string[];
};

export function PromptForm({
  action,
  submitLabel,
  prompt,
  categories,
  tags,
}: {
  action: (state: { error?: string }, formData: FormData) => Promise<{ error?: string }>;
  submitLabel: string;
  prompt?: PromptRow;
  categories: Category[];
  tags: Tag[];
}) {
  const selectedModels = new Set(prompt?.model_compatibility ?? []);
  const selectedTags = new Set(prompt?.tag_ids ?? []);
  const variablesValue = JSON.stringify(prompt?.variables ?? [], null, 2);

  return (
    <ActionForm action={action} submitLabel={submitLabel} className="grid gap-5 rounded-2xl border border-border bg-surface p-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="عنوان">
          <input name="title" defaultValue={prompt?.title ?? ""} className={inputClass} required />
        </Field>
        <Field label="اسلاگ">
          <input name="slug" defaultValue={prompt?.slug ?? ""} dir="ltr" className={inputClass} required />
          <span className="text-xs font-normal text-text-muted">فقط حروف انگلیسی کوچک، عدد و خط تیره</span>
        </Field>
      </div>

      <Field label="توضیح کوتاه">
        <textarea name="description" defaultValue={prompt?.description ?? ""} className={textareaClass} />
      </Field>

      <Field label="متن پرامپت">
        <textarea name="prompt_text" defaultValue={prompt?.prompt_text ?? ""} dir="ltr" className="min-h-44 rounded-lg border border-border bg-background-soft px-3 py-2 text-left text-sm leading-7 text-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" required />
      </Field>

      <Field label="پرامپت منفی">
        <textarea name="negative_prompt" defaultValue={prompt?.negative_prompt ?? ""} dir="ltr" className={textareaClass} />
      </Field>

      <Field label="متغیرها JSON">
        <textarea name="variables" defaultValue={variablesValue} dir="ltr" className="min-h-36 rounded-lg border border-border bg-background-soft px-3 py-2 text-left font-mono text-xs leading-6 text-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
        <span className="text-xs font-normal text-text-muted">
          فرمت نمونه: [{"{"}"key":"product","label_fa":"محصول","example":"perfume bottle"{"}"}]
        </span>
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="دسته‌بندی">
          <select name="category_id" defaultValue={prompt?.category_id ?? ""} className={inputClass}>
            <option value="">بدون دسته‌بندی</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name_fa}</option>
            ))}
          </select>
        </Field>
        <Field label="بهترین کاربرد">
          <input name="best_for" defaultValue={prompt?.best_for ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="راهنمای استفاده فارسی">
        <textarea name="usage_notes_fa" defaultValue={prompt?.usage_notes_fa ?? ""} className={textareaClass} />
        <span className="text-xs font-normal text-text-muted">هر نکته را در یک خط جدا بنویس.</span>
      </Field>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="سختی">
          <select name="difficulty" defaultValue={prompt?.difficulty ?? "beginner"} className={inputClass} required>
            {difficultyOptions.map((item) => (
              <option key={item} value={item}>{difficultyLabels[item]}</option>
            ))}
          </select>
        </Field>
        <Field label="سطح دسترسی">
          <select name="access_level" defaultValue={prompt?.access_level ?? "free"} className={inputClass} required>
            {accessOptions.map((item) => (
              <option key={item} value={item}>{accessLabels[item]}</option>
            ))}
          </select>
          <span className="text-xs font-normal text-text-muted">رایگان برای همه کامل دیده می‌شود؛ حرفه‌ای برای کاربران عادی قفل است.</span>
        </Field>
        <label className="mt-7 flex items-center gap-2 rounded-lg border border-border bg-background-soft px-3 py-2 text-sm font-semibold text-text">
          <input type="checkbox" name="is_published" defaultChecked={prompt?.is_published ?? false} />
          منتشر شود
        </label>
      </div>

      <section className="rounded-xl border border-border bg-background-soft p-4">
        <h2 className="mb-3 text-sm font-bold text-text">سازگاری مدل‌ها</h2>
        <div className="flex flex-wrap gap-3">
          {modelOptions.map((model) => (
            <label key={model} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-muted">
              <input type="checkbox" name="model_compatibility" value={model} defaultChecked={selectedModels.has(model)} />
              {model}
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-background-soft p-4">
        <h2 className="mb-3 text-sm font-bold text-text">تگ‌ها</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-muted">
              <input type="checkbox" name="tag_ids" value={tag.id} defaultChecked={selectedTags.has(tag.id)} />
              {tag.name}
            </label>
          ))}
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="آپلود تصویر کاور">
          <input name="cover_image_file" type="file" accept="image/*" className={inputClass} />
        </Field>
        <Field label="آدرس تصویر کاور">
          <input name="cover_image_url" defaultValue={prompt?.cover_image_url ?? ""} dir="ltr" className={inputClass} />
        </Field>
      </div>

      <Field label="تصاویر نمونه، هر URL در یک خط">
        <textarea name="example_images" defaultValue={(prompt?.example_images ?? []).join("\n")} dir="ltr" className={textareaClass} />
        <span className="text-xs font-normal text-text-muted">هر آدرس تصویر را در یک خط جدا وارد کن.</span>
      </Field>
    </ActionForm>
  );
}
