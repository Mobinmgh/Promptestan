import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/auth/admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <section className="container-page py-8 md:py-10">
      <div className="mb-6">
        <span className="mb-3 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          Admin CMS
        </span>
        <h1 className="text-2xl font-black text-text md:text-3xl">مدیریت پرامپتستان</h1>
      </div>
      <AdminNav />
      <div className="mt-6">{children}</div>
    </section>
  );
}
