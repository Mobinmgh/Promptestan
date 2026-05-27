import type { Metadata } from "next";
import { PromptGallery } from "@/components/prompts/prompt-gallery";
import { getViewerState } from "@/lib/auth/access";
import { getCategories } from "@/lib/data/categories";
import { getUserFavoritePromptIds } from "@/lib/data/favorites";
import { getPublishedPrompts } from "@/lib/data/prompts";

export const metadata: Metadata = {
  title: "گالری پرامپت‌های تصویری",
  description: "پرامپت‌های آماده برای ساخت عکس محصول، تبلیغ، کاتالوگ، استوری و تصاویر حرفه‌ای با هوش مصنوعی.",
};

export default async function PromptsPage() {
  const viewer = await getViewerState();
  const [prompts, categories, savedPromptIds] = await Promise.all([
    getPublishedPrompts(),
    getCategories(),
    viewer.user ? getUserFavoritePromptIds(viewer.user.id) : Promise.resolve([]),
  ]);

  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto mb-9 max-w-3xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          Prompt Gallery
        </span>
        <h1 className="text-3xl font-black leading-tight text-text md:text-4xl">
          گالری پرامپت‌های تصویری
        </h1>
        <p className="mt-4 text-sm leading-7 text-text-muted md:text-base">
          پرامپت‌های آماده برای ساخت عکس محصول، تبلیغ، کاتالوگ، استوری و تصاویر حرفه‌ای با هوش مصنوعی.
        </p>
      </div>

      <PromptGallery
        prompts={prompts}
        categories={categories}
        isLoggedIn={Boolean(viewer.user)}
        savedPromptIds={savedPromptIds}
      />
    </section>
  );
}
