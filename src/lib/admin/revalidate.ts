import { revalidatePath } from "next/cache";

export function revalidatePromptPaths(slug?: string | null, categorySlug?: string | null) {
  revalidatePath("/");
  revalidatePath("/prompts");
  revalidatePath("/categories");
  revalidatePath("/admin");
  revalidatePath("/admin/prompts");

  if (slug) {
    revalidatePath(`/prompts/${slug}`);
  }

  if (categorySlug) {
    revalidatePath(`/categories/${categorySlug}`);
  }
}

export function revalidateCategoryPaths(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/admin");
  revalidatePath("/admin/categories");

  if (slug) {
    revalidatePath(`/categories/${slug}`);
  }
}
