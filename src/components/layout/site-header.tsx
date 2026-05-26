import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/prompts", label: "پرامپت‌ها" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
  { href: "/pricing", label: "قیمت‌گذاری" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="پرامپتستان">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/45 bg-accent/15 text-sm font-black text-white shadow-glow">
              پ
            </span>
            <span className="text-lg font-bold text-text">پرامپتستان</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="ناوبری اصلی">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition hover:bg-surface hover:text-text focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent"
          >
            ورود
          </Link>
          <Link
            href="/prompts"
            className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            شروع کن
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-text md:hidden"
          aria-label="باز کردن منو"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
