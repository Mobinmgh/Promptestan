import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/auth/profile";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "داشبورد حساب کاربری پرامپتستان.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    redirect("/login");
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await ensureProfile(user);

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("email, subscription_status")
    .eq("id", user.id)
    .maybeSingle();
  const profile = profileRow as { email: string | null; subscription_status: "free" | "pro" } | null;

  return (
    <section className="container-page py-10 md:py-14">
      <div className="mb-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <span className="mb-4 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          حساب کاربری
        </span>
        <h1 className="text-3xl font-black text-text">داشبورد</h1>
        <div className="mt-5 grid gap-3 text-sm leading-7 text-text-muted">
          <p>
            ایمیل: <span dir="ltr" className="text-text-soft">{profile?.email ?? user.email}</span>
          </p>
          <p>
            وضعیت اشتراک:{" "}
            <span className="rounded-full border border-success/35 bg-success/10 px-2.5 py-1 text-success">
              {profile?.subscription_status === "pro" ? "حرفه‌ای" : "رایگان"}
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-black text-text">پرامپت‌های ذخیره‌شده</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-muted">
          بخش ذخیره پرامپت‌ها در فاز بعدی تکمیل می‌شود. ساختار حساب و وضعیت اشتراک از Supabase خوانده می‌شود.
        </p>
      </div>
    </section>
  );
}
