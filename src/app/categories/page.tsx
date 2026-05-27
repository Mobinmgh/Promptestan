import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "دسته‌بندی‌ها",
  description: "دسته‌بندی پرامپت‌های تصویری آماده در پرامپتستان.",
  openGraph: {
    title: "دسته‌بندی‌های پرامپتستان",
    description: "دسته‌بندی پرامپت‌های تصویری برای عکس محصول، تبلیغات، برندینگ و محتوا.",
    locale: "fa_IR",
    siteName: "پرامپتستان",
    url: "/categories",
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto mb-9 max-w-3xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          Categories
        </span>
        <h1 className="text-3xl font-black leading-tight text-text md:text-4xl">دسته‌بندی‌ها</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted md:text-base">
          پرامپت‌ها بر اساس کاربرد واقعی دسته‌بندی شده‌اند تا سریع‌تر به خروجی مناسب برسی.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/80 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-black text-text">{category.name}</h2>
                <span className="rounded-full border border-accent/35 bg-accent/12 px-2.5 py-1 text-xs font-semibold text-indigo-100">
                  {category.count} پرامپت
                </span>
              </div>
              <p className="min-h-14 text-sm leading-7 text-text-muted">{category.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 group-hover:text-white">
                مشاهده دسته
                <ArrowLeft size={16} />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="دسته‌بندی‌ای برای نمایش نیست"
          description="بعد از ساخت دسته‌بندی در پنل مدیریت، این بخش پر می‌شود."
          href="/prompts"
          actionLabel="مشاهده پرامپت‌ها"
        />
      )}
    </section>
  );
}
