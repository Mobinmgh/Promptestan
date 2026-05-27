"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/app/login/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/prompts", label: "پرامپت‌ها" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
  { href: "/pricing", label: "قیمت‌گذاری" },
];

export function HeaderNav({ userEmail, isAdmin }: { userEmail: string | null; isAdmin: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const loggedInLinks = (
    <>
      <Link
        href="/dashboard"
        onClick={() => setIsOpen(false)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent"
      >
        داشبورد
      </Link>
      {isAdmin ? (
        <Link
          href="/admin"
          onClick={() => setIsOpen(false)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-100 transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent"
        >
          مدیریت
        </Link>
      ) : null}
      <form action={logout}>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-muted transition hover:border-accent/70 hover:text-text"
        >
          <LogOut size={16} />
          خروج
        </button>
      </form>
    </>
  );

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
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-surface hover:text-text focus:outline-none focus:ring-2 focus:ring-accent",
                  isActive(item.href) ? "bg-accent/15 text-indigo-100" : "text-text-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {userEmail ? (
            loggedInLinks
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent">
                ورود
              </Link>
              <Link href="/prompts" className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent">
                شروع کن
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-text md:hidden"
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-page grid gap-2 py-4" aria-label="ناوبری موبایل">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent",
                  isActive(item.href) ? "bg-accent/15 text-indigo-100" : "bg-surface text-text-muted hover:text-text",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2">
              {userEmail ? (
                <div className="grid gap-2">{loggedInLinks}</div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="rounded-lg border border-border bg-surface px-3 py-3 text-center text-sm font-semibold text-text-muted">
                    ورود
                  </Link>
                  <Link href="/prompts" onClick={() => setIsOpen(false)} className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-3 py-3 text-center text-sm font-semibold text-white">
                    شروع کن
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
