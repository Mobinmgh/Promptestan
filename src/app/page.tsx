import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { HeroPromptSlider } from "@/components/home/hero-prompt-slider";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { getViewerState } from "@/lib/auth/access";
import { getCategories } from "@/lib/data/categories";
import { getUserFavoritePromptIds } from "@/lib/data/favorites";
import { getPublishedPrompts } from "@/lib/data/prompts";

export const metadata: Metadata = {
  title: "پرامپت‌های آماده برای ساخت تصاویر حرفه‌ای با هوش مصنوعی",
  description:
    "پرامپتستان مرجع پرامپت‌های آماده و تست‌شده برای ساخت عکس محصول، تبلیغات اینستاگرام، کاتالوگ، برندینگ و تصاویر حرفه‌ای با هوش مصنوعی است.",
  openGraph: {
    title: "پرامپتستان",
    description: "پرامپت‌های آماده و تست‌شده برای ساخت تصاویر حرفه‌ای با هوش مصنوعی.",
    siteName: "پرامپتستان",
    locale: "fa_IR",
    url: "/",
  },
};

export default async function HomePage() {
  const viewer = await getViewerState();
  const [prompts, categories, savedPromptIds] = await Promise.all([
    getPublishedPrompts(),
    getCategories(),
    viewer.user ? getUserFavoritePromptIds(viewer.user.id) : Promise.resolve([]),
  ]);
  const heroPrompts = prompts.slice(0, 5);
  const featuredFreePrompts = prompts.filter((prompt) => prompt.access === "free").slice(0, 6);
  const latestProPrompts = prompts.filter((prompt) => prompt.access === "pro").slice(0, 6);

  return (
    <>
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <span className="mb-5 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
            گالری حرفه‌ای پرامپت تصویر
          </span>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.35] text-text md:text-5xl">
            پرامپت‌های آماده برای ساخت تصاویر حرفه‌ای با هوش مصنوعی
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted md:text-lg">
            برای عکس محصول، تبلیغات اینستاگرام، کاتالوگ، استوری، برندینگ و محتوای فروش.
            پرامپت‌ها تست‌شده‌اند، دسته‌بندی شده‌اند، فارسی توضیح داده شده‌اند و آماده کپی کردن هستند.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-l from-accent to-accent-2 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              مشاهده پرامپت‌های رایگان
              <ArrowLeft size={17} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-3 text-sm font-bold text-text transition hover:border-accent/70 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-accent"
            >
              دیدن پکیج حرفه‌ای
            </Link>
          </div>
        </div>

        <HeroPromptSlider prompts={heroPrompts} />
      </section>

      <section className="container-page py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-text">دسته‌بندی‌های پرکاربرد</h2>
          <p className="mt-2 text-sm text-text-muted">برای خروجی‌هایی که مستقیم به فروش و محتوا کمک می‌کنند.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent/70">
              <h3 className="font-bold text-text">{category.name}</h3>
              <p className="mt-2 text-sm leading-7 text-text-muted">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-text">پرامپت‌های رایگان منتخب</h2>
            <p className="mt-2 text-sm text-text-muted">نمونه‌هایی برای شروع سریع، بدون آزمون‌وخطای طولانی.</p>
          </div>
          <Link href="/prompts" className="hidden text-sm font-semibold text-indigo-200 hover:text-white md:block">
            مشاهده همه
          </Link>
        </div>
        {featuredFreePrompts.length > 0 ? (
          <PromptGrid prompts={featuredFreePrompts} isLoggedIn={Boolean(viewer.user)} savedPromptIds={savedPromptIds} />
        ) : null}
      </section>

      {latestProPrompts.length > 0 ? (
        <section className="container-page py-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-text">پرامپت‌های حرفه‌ای جدید</h2>
              <p className="mt-2 text-sm text-text-muted">
                جدیدترین پرامپت‌های پریمیوم برای خروجی‌های جدی‌تر و فروش‌محور.
              </p>
            </div>
            <Link href="/pricing" className="hidden text-sm font-semibold text-indigo-200 hover:text-white md:block">
              دیدن دسترسی حرفه‌ای
            </Link>
          </div>
          <PromptGrid prompts={latestProPrompts} isLoggedIn={Boolean(viewer.user)} savedPromptIds={savedPromptIds} />
        </section>
      ) : null}

      <section className="container-page py-10">
        <div className="rounded-2xl border border-accent/35 bg-accent/10 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-black text-text">پکیج حرفه‌ای برای خروجی‌های فروش‌محور</h2>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                پرامپت‌های حرفه‌ای برای کمپین، برندینگ، بسته‌بندی و محتوای تصویری سطح بالاتر.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-text-soft">
              {["دسترسی به پرامپت‌های حرفه‌ای", "توضیحات فارسی کاربردی", "سازگار با مدل‌های محبوب تصویر"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-4">
          {["انتخاب پرامپت", "جایگزینی متغیرها", "کپی در ابزار AI", "اصلاح و استفاده"].map((step, index) => (
            <div key={step} className="rounded-xl border border-border bg-surface p-5">
              <span className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-sm font-black text-indigo-100">
                {index + 1}
              </span>
              <h3 className="font-bold text-text">{step}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
