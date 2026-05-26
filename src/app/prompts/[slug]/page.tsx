import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessBadge, DifficultyBadge, ModelBadge, TagBadge } from "@/components/prompts/badges";
import { LockedPromptBlock } from "@/components/prompts/locked-prompt-block";
import { PromptBlock } from "@/components/prompts/prompt-block";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { getPromptBySlug, getPublishedPrompts, getRelatedPrompts } from "@/lib/data/prompts";

type PromptPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const prompts = await getPublishedPrompts();
  return prompts.map((prompt) => ({ slug: prompt.slug }));
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
  };
}

export default async function PromptDetailPage({ params }: PromptPageProps) {
  const prompt = await getPromptBySlug(params.slug);

  if (!prompt) {
    notFound();
  }

  const relatedPrompts = await getRelatedPrompts(prompt.slug);
  const isLocked = prompt.access === "pro";

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
            <PromptBlock title="متن پرامپت" text={prompt.promptText ?? ""} />
          )}

          {!isLocked && prompt.negativePrompt ? (
            <PromptBlock title="پرامپت منفی" text={prompt.negativePrompt} />
          ) : null}

          <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-lg font-bold text-text">متغیرها</h2>
            <div className="grid gap-3">
              {prompt.variables.map((variable) => (
                <div
                  key={variable.key}
                  className="grid gap-2 rounded-lg border border-border bg-background-soft p-3 text-sm md:grid-cols-[9rem_1fr]"
                >
                  <div>
                    <span className="font-semibold text-text">{variable.labelFa}</span>
                    <span dir="ltr" className="mt-1 block text-left text-xs text-text-muted">
                      {`{${variable.key}}`}
                    </span>
                  </div>
                  <span dir="ltr" className="prompt-text text-left text-text-soft">
                    {variable.example}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-lg font-bold text-text">راهنمای استفاده</h2>
            <p className="mb-4 rounded-lg border border-accent/25 bg-accent/10 p-3 text-sm leading-7 text-indigo-100">
              بهترین کاربرد: {prompt.bestFor}
            </p>
            <ul className="grid gap-3 text-sm leading-7 text-text-muted">
              {prompt.usageGuide.map((item) => (
                <li key={item} className="rounded-lg border border-border bg-background-soft p-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="order-1 lg:sticky lg:top-24 lg:order-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-glow">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background-soft">
              <Image
                src={prompt.coverImage}
                alt={prompt.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
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
        <PromptGrid prompts={relatedPrompts} />
      </section>
    </section>
  );
}
