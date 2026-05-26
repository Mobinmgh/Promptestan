import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { prompts } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "گالری پرامپت‌های تصویری",
  description: "پرامپت‌های آماده برای ساخت عکس محصول، تبلیغ، کاتالوگ، استوری و تصاویر حرفه‌ای با هوش مصنوعی.",
};

const filters = ["همه", "رایگان", "حرفه‌ای", "عکس محصول", "تبلیغات", "برندینگ"];

export default function PromptsPage() {
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

      <div className="mb-8 rounded-2xl border border-border bg-surface p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">جستجوی پرامپت</span>
            <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="search"
              placeholder="جستجو در پرامپت‌ها..."
              className="h-11 w-full rounded-lg border border-border bg-background-soft py-2 pl-4 pr-10 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={
                  index === 0
                    ? "rounded-lg border border-accent bg-accent/18 px-3 py-2 text-xs font-semibold text-indigo-100"
                    : "rounded-lg border border-border bg-background-soft px-3 py-2 text-xs font-semibold text-text-muted transition hover:border-accent/70 hover:text-text"
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PromptGrid prompts={prompts} />
    </section>
  );
}
