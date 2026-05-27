import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قوانین استفاده",
  description: "قوانین استفاده از پرامپتستان.",
};

export default function TermsPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 md:p-8">
        <h1 className="text-3xl font-black text-text">قوانین استفاده</h1>
        <div className="mt-6 grid gap-4 text-sm leading-8 text-text-muted">
          <p>پرامپتستان یک کتابخانه پرامپت تصویری است و داخل سایت تصویر تولید نمی‌کند.</p>
          <p>کاربر مسئول استفاده درست از پرامپت‌ها در ابزارهای هوش مصنوعی و رعایت قوانین آن ابزارهاست.</p>
          <p>بازنشر کامل محتوای حرفه‌ای یا فروش دوباره پرامپت‌ها بدون اجازه مجاز نیست.</p>
        </div>
      </div>
    </section>
  );
}
