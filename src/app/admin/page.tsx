import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const [
    totalPrompts,
    publishedPrompts,
    proPrompts,
    freePrompts,
    categories,
    tags,
  ] = await Promise.all([
    supabase.from("prompts").select("id", { count: "exact", head: true }),
    supabase.from("prompts").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("prompts").select("id", { count: "exact", head: true }).eq("access_level", "pro"),
    supabase.from("prompts").select("id", { count: "exact", head: true }).eq("access_level", "free"),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("tags").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "کل پرامپت‌ها", value: totalPrompts.count ?? 0 },
    { label: "منتشرشده", value: publishedPrompts.count ?? 0 },
    { label: "حرفه‌ای", value: proPrompts.count ?? 0 },
    { label: "رایگان", value: freePrompts.count ?? 0 },
    { label: "دسته‌بندی‌ها", value: categories.count ?? 0 },
    { label: "تگ‌ها", value: tags.count ?? 0 },
  ];

  const links = [
    { href: "/admin/prompts/new", label: "ساخت پرامپت جدید" },
    { href: "/admin/prompts", label: "مدیریت پرامپت‌ها" },
    { href: "/admin/categories", label: "مدیریت دسته‌بندی‌ها" },
    { href: "/admin/tags", label: "مدیریت تگ‌ها" },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm text-text-muted">{card.label}</p>
            <div className="mt-3 text-3xl font-black text-text">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-lg font-black text-text">دسترسی سریع</h2>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg border border-border bg-background-soft px-4 py-2.5 text-sm font-bold text-text-muted transition hover:border-accent hover:text-text">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
