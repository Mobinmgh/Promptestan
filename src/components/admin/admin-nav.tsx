"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/prompts", label: "پرامپت‌ها" },
  { href: "/admin/categories", label: "دسته‌بندی‌ها" },
  { href: "/admin/tags", label: "تگ‌ها" },
  { href: "/", label: "بازگشت به سایت" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-surface p-2">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : link.href !== "/" && pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent",
              active ? "bg-accent/20 text-indigo-100" : "text-text-muted hover:bg-background-soft hover:text-text",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
