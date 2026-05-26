import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { getCategories, getCategoryBySlug, getPromptsByCategorySlug } from "@/lib/mock-prompts";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "دسته‌بندی پیدا نشد",
    };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const categoryPrompts = getPromptsByCategorySlug(params.slug);

  return (
    <section className="container-page py-8 md:py-12">
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-text-muted transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <ArrowRight size={17} />
        بازگشت به دسته‌بندی‌ها
      </Link>

      <div className="mb-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <span className="mb-4 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          {category.count} پرامپت
        </span>
        <h1 className="text-3xl font-black leading-tight text-text md:text-4xl">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted md:text-base">{category.description}</p>
      </div>

      {categoryPrompts.length > 0 ? (
        <PromptGrid prompts={categoryPrompts} />
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <h2 className="text-xl font-black text-text">فعلا پرامپتی در این دسته نیست</h2>
        </div>
      )}
    </section>
  );
}
