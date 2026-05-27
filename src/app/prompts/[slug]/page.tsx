import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessBadge, DifficultyBadge, ModelBadge, TagBadge } from "@/components/prompts/badges";
import { FavoriteButton } from "@/components/prompts/favorite-button";
import { LockedPromptBlock } from "@/components/prompts/locked-prompt-block";
import { PromptCustomizer } from "@/components/prompts/prompt-customizer";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { getViewerState } from "@/lib/auth/access";
import { isPromptSaved, getUserFavoritePromptIds } from "@/lib/data/favorites";
import { getPromptBySlug, getRelatedPrompts } from "@/lib/data/prompts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PromptPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const prompt = await getPromptBySlug(params.slug);

  if (!prompt) {
    return {
      title: "پرامپت پیدا نشد",
    };
  }

  return {
    title: prompt.title,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      siteName: "پرامپتستان",
      locale: "fa_IR",
      url: `/prompts/${prompt.slug}`,
      images: prompt.coverImage ? [{ url: prompt.coverImage, alt: prompt.imageAlt }] : undefined,
    },
  };
}

export default async function PromptDetailPage({ params }: PromptPageProps) {
  const viewer = await getViewerState();
  const prompt = await getPromptBySlug(params.slug);

  if (!prompt) {
    notFound();
  }

  const [relatedPrompts, saved, savedPromptIds] = await Promise.all([
    getRelatedPrompts(prompt.slug),
    viewer.user && prompt.id ? isPromptSaved(viewer.user.id, prompt.id) : Promise.resolve(false),
    viewer.user ? getUserFavoritePromptIds(viewer.user.id) : Promise.resolve([]),
  ]);
  const isLocked = prompt.access === "pro" && !viewer.canViewPro;

  return (
    <section className="container-page py-8 md:py-12">
      <Link
        href="/prompts"
        className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-text-muted transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <ArrowRight size={17} />
        بازگشت به گالری
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.86fr)] lg:items-start">
        <article className="order-2 grid gap-6 lg:order-1">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <AccessBadge access={prompt.access} />
              <DifficultyBadge difficulty={prompt.difficulty} />
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-indigo-100">
                {prompt.category}
              </span>
            </div>
            <h1 className="text-3xl font-black leading-tight text-text md:text-4xl">{prompt.title}</h1>
            <p className="mt-4 text-sm leading-8 text-text-muted md:text-base">{prompt.description}</p>
            <div className="mt-5">
              <FavoriteButton
                promptId={prompt.id}
                slug={prompt.slug}
                isLoggedIn={Boolean(viewer.user)}
                isSaved={saved}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {prompt.models.map((model) => (
              <ModelBadge key={model} model={model} />
            ))}
            {prompt.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {isLocked ? (
            <LockedPromptBlock preview={prompt.promptPreview ?? ""} />
          ) : (
            <PromptCustomizer
              promptText={prompt.promptText ?? ""}
              negativePrompt={prompt.negativePrompt}
              variables={prompt.variables}
            />
          )}

          <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-lg font-bold text-text">راهنمای استفاده</h2>
            <p className="mb-4 rounded-lg border border-accent/25 bg-accent/10 p-3 text-sm leading-7 text-indigo-100">
              بهترین کاربرد: {prompt.bestFor}
            </p>
            {prompt.usageGuide.length > 0 ? (
              <ul className="grid gap-3 text-sm leading-7 text-text-muted">
                {prompt.usageGuide.map((item) => (
                  <li key={item} className="rounded-lg border border-border bg-background-soft p-3">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-border bg-background-soft p-3 text-sm text-text-muted">
                راهنمای استفاده برای این پرامپت هنوز ثبت نشده است.
              </p>
            )}
          </section>
        </article>

        <aside className="order-1 lg:sticky lg:top-24 lg:order-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-glow">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background-soft">
              <img
                src={prompt.coverImage}
                alt={prompt.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-text">پرامپت‌های مرتبط</h2>
          <p className="mt-2 text-sm text-text-muted">چند گزینه نزدیک برای ادامه ساخت تصویر.</p>
        </div>
        <PromptGrid prompts={relatedPrompts} isLoggedIn={Boolean(viewer.user)} savedPromptIds={savedPromptIds} />
      </section>
    </section>
  );
}
