import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "ورود",
  description: "صفحه ورود نمایشی پرامپتستان.",
};

export default function LoginPage() {
  return (
    <section className="container-page grid min-h-[calc(100vh-16rem)] items-center py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-border bg-background-soft p-6 lg:border-b-0 lg:border-l lg:p-8">
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-accent/35 bg-accent/15 text-indigo-100">
            <LockKeyhole size={22} />
          </span>
          <h1 className="text-2xl font-black text-text">ورود به پرامپتستان</h1>
          <p className="mt-4 text-sm leading-7 text-text-muted">
            برای ذخیره پرامپت‌ها و دسترسی به قابلیت‌های حساب کاربری وارد شو.
          </p>
          <Link href="/prompts" className="mt-8 inline-flex text-sm font-semibold text-indigo-200 hover:text-white">
            بازگشت به گالری پرامپت‌ها
          </Link>
        </div>

        <form className="grid gap-5 p-6 lg:p-8">
          {/* Real authentication is intentionally deferred to the next phase. */}
          <label className="grid gap-2 text-sm font-semibold text-text">
            ایمیل
            <input
              type="email"
              placeholder="you@example.com"
              dir="ltr"
              className="h-12 rounded-lg border border-border bg-background-soft px-4 text-left text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-text">
            رمز عبور
            <input
              type="password"
              placeholder="••••••••"
              dir="ltr"
              className="h-12 rounded-lg border border-border bg-background-soft px-4 text-left text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>

          <button
            type="submit"
            className="mt-2 h-12 rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 text-sm font-bold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            ورود
          </button>
        </form>
      </div>
    </section>
  );
}
