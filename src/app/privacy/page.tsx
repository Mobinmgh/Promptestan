import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "سیاست حریم خصوصی پرامپتستان.",
};

export default function PrivacyPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 md:p-8">
        <h1 className="text-3xl font-black text-text">حریم خصوصی</h1>
        <div className="mt-6 grid gap-4 text-sm leading-8 text-text-muted">
          <p>برای ورود و مدیریت حساب، ایمیل کاربر از طریق Supabase Auth نگهداری می‌شود.</p>
          <p>وضعیت اشتراک فقط برای کنترل دسترسی به پرامپت‌های حرفه‌ای استفاده می‌شود.</p>
          <p>کلیدهای خصوصی و سرویس‌رول Supabase هرگز در مرورگر نمایش داده نمی‌شوند.</p>
        </div>
      </div>
    </section>
  );
}
