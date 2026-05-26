"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { accessOptions, difficultyOptions } from "@/lib/admin/constants";
import { revalidateCategoryPaths, revalidatePromptPaths } from "@/lib/admin/revalidate";

type ActionState = {
  error?: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function values(formData: FormData, key: string) {
  return formData.getAll(key).map((item) => String(item)).filter(Boolean);
}

function parseVariables(raw: string) {
  try {
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return { error: "متغیرها باید یک آرایه JSON معتبر باشند." };
    }

    return { data: parsed };
  } catch {
    return { error: "متغیرها باید JSON معتبر باشند." };
  }
}

function parsePromptForm(formData: FormData) {
  const title = value(formData, "title");
  const slug = value(formData, "slug");
  const promptText = value(formData, "prompt_text");
  const difficulty = value(formData, "difficulty");
  const accessLevel = value(formData, "access_level");
  const variables = parseVariables(value(formData, "variables"));

  if (!title) return { error: "عنوان الزامی است." };
  if (!slug) return { error: "اسلاگ الزامی است." };
  if (!slugPattern.test(slug)) return { error: "اسلاگ باید URL-safe و انگلیسی باشد؛ مثل product-photo." };
  if (!promptText) return { error: "متن پرامپت الزامی است." };
  if (!difficultyOptions.includes(difficulty as any)) return { error: "سطح سختی معتبر نیست." };
  if (!accessOptions.includes(accessLevel as any)) return { error: "سطح دسترسی معتبر نیست." };
  if (variables.error) return { error: variables.error };

  return {
    data: {
      title,
      slug,
      description: value(formData, "description") || null,
      prompt_text: promptText,
      negative_prompt: value(formData, "negative_prompt") || null,
      variables: variables.data,
      usage_notes_fa: value(formData, "usage_notes_fa") || null,
      best_for: value(formData, "best_for") || null,
      category_id: value(formData, "category_id") || null,
      model_compatibility: values(formData, "model_compatibility"),
      difficulty,
      access_level: accessLevel,
      cover_image_url: value(formData, "cover_image_url") || null,
      example_images: value(formData, "example_images")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean),
      is_published: formData.get("is_published") === "on",
      tag_ids: values(formData, "tag_ids"),
    },
  };
}

async function getCategorySlug(supabase: any, categoryId?: string | null) {
  if (!categoryId) return null;

  const { data } = await (supabase.from("categories") as any).select("slug").eq("id", categoryId).maybeSingle();
  return data?.slug ?? null;
}

async function uploadCoverIfPresent(supabase: any, promptId: string, formData: FormData) {
  const file = formData.get("cover_image_file");

  if (!(file instanceof File) || file.size === 0) {
    return { url: null as string | null, error: null as string | null };
  }

  const extension = file.name.split(".").pop() || "webp";
  const path = `prompts/${promptId}/cover-${Date.now()}.${extension}`;
  const { error } = await supabase.storage.from("prompt-images").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    return { url: null, error: `آپلود تصویر انجام نشد: ${error.message}` };
  }

  const { data } = supabase.storage.from("prompt-images").getPublicUrl(path);
  return { url: data.publicUrl as string, error: null };
}

async function replacePromptTags(supabase: any, promptId: string, tagIds: string[]) {
  await (supabase.from("prompt_tags") as any).delete().eq("prompt_id", promptId);

  if (tagIds.length > 0) {
    await (supabase.from("prompt_tags") as any).insert(tagIds.map((tagId) => ({ prompt_id: promptId, tag_id: tagId })));
  }
}

export async function createPrompt(_state: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const parsed = parsePromptForm(formData);

  if (parsed.error) return { error: parsed.error };

  const { tag_ids, ...payload } = parsed.data as NonNullable<ReturnType<typeof parsePromptForm>["data"]>;
  const { data, error } = await (supabase.from("prompts") as any).insert(payload).select("id,slug,category_id").single();

  if (error || !data) {
    return { error: error?.message ?? "ساخت پرامپت ناموفق بود." };
  }

  const upload = await uploadCoverIfPresent(supabase, data.id, formData);
  if (upload.url) {
    await (supabase.from("prompts") as any).update({ cover_image_url: upload.url }).eq("id", data.id);
  }

  await replacePromptTags(supabase, data.id, tag_ids);
  revalidatePromptPaths(data.slug, await getCategorySlug(supabase, data.category_id));

  if (upload.error) return { error: upload.error };

  redirect("/admin/prompts");
}

export async function updatePrompt(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const parsed = parsePromptForm(formData);

  if (parsed.error) return { error: parsed.error };

  const { tag_ids, ...payload } = parsed.data as NonNullable<ReturnType<typeof parsePromptForm>["data"]>;
  const upload = await uploadCoverIfPresent(supabase, id, formData);
  const finalPayload = upload.url ? { ...payload, cover_image_url: upload.url } : payload;
  const { data, error } = await (supabase.from("prompts") as any)
    .update(finalPayload)
    .eq("id", id)
    .select("slug,category_id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "ویرایش پرامپت ناموفق بود." };
  }

  await replacePromptTags(supabase, id, tag_ids);
  revalidatePromptPaths(data.slug, await getCategorySlug(supabase, data.category_id));

  if (upload.error) return { error: upload.error };

  redirect("/admin/prompts");
}

export async function deletePrompt(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id");
  const slug = value(formData, "slug");
  const categoryId = value(formData, "category_id");

  await (supabase.from("prompts") as any).delete().eq("id", id);
  revalidatePromptPaths(slug, await getCategorySlug(supabase, categoryId));
}

export async function togglePromptPublished(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id");
  const slug = value(formData, "slug");
  const categoryId = value(formData, "category_id");
  const nextValue = formData.get("is_published") !== "true";

  await (supabase.from("prompts") as any).update({ is_published: nextValue }).eq("id", id);
  revalidatePromptPaths(slug, await getCategorySlug(supabase, categoryId));
}

export async function createCategory(_state: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const nameFa = value(formData, "name_fa");
  const slug = value(formData, "slug");

  if (!nameFa) return { error: "نام فارسی الزامی است." };
  if (!slugPattern.test(slug)) return { error: "اسلاگ معتبر نیست." };

  const { error } = await (supabase.from("categories") as any).insert({
    name_fa: nameFa,
    name_en: value(formData, "name_en") || null,
    slug,
    description: value(formData, "description") || null,
    sort_order: Number(value(formData, "sort_order") || 0),
    is_published: formData.get("is_published") === "on",
  });

  if (error) return { error: error.message };
  revalidateCategoryPaths(slug);
  redirect("/admin/categories");
}

export async function updateCategory(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const nameFa = value(formData, "name_fa");
  const slug = value(formData, "slug");

  if (!nameFa) return { error: "نام فارسی الزامی است." };
  if (!slugPattern.test(slug)) return { error: "اسلاگ معتبر نیست." };

  const { error } = await (supabase.from("categories") as any)
    .update({
      name_fa: nameFa,
      name_en: value(formData, "name_en") || null,
      slug,
      description: value(formData, "description") || null,
      sort_order: Number(value(formData, "sort_order") || 0),
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidateCategoryPaths(slug);
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id");
  const slug = value(formData, "slug");
  const { count } = await (supabase.from("prompts") as any).select("id", { count: "exact", head: true }).eq("category_id", id);

  if (count && count > 0) {
    redirect(`/admin/categories?error=${encodeURIComponent("این دسته‌بندی توسط پرامپت‌ها استفاده شده و قابل حذف نیست.")}`);
  }

  await (supabase.from("categories") as any).delete().eq("id", id);
  revalidateCategoryPaths(slug);
}

export async function createTag(_state: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const name = value(formData, "name");
  const slug = value(formData, "slug");

  if (!name) return { error: "نام تگ الزامی است." };
  if (!slugPattern.test(slug)) return { error: "اسلاگ معتبر نیست." };

  const { error } = await (supabase.from("tags") as any).insert({ name, slug });
  if (error) return { error: error.message };
  revalidatePromptPaths();
  redirect("/admin/tags");
}

export async function updateTag(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const name = value(formData, "name");
  const slug = value(formData, "slug");

  if (!name) return { error: "نام تگ الزامی است." };
  if (!slugPattern.test(slug)) return { error: "اسلاگ معتبر نیست." };

  const { error } = await (supabase.from("tags") as any).update({ name, slug }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePromptPaths();
  redirect("/admin/tags");
}

export async function deleteTag(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id");

  await (supabase.from("tags") as any).delete().eq("id", id);
  revalidatePromptPaths();
}
