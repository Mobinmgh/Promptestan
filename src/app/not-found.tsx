import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[55vh] place-items-center py-16">
      <div className="max-w-xl rounded-2xl border border-border bg-surface p-8 text-center">
        <span className="mb-4 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          ۴۰۴
        </span>
        <h1 className="text-3xl font-black text-text">صفحه پیدا نشد</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">
          آدرسی که وارد کردی در پرامپتستان وجود ندارد یا جابه‌جا شده است.
        </p>
        <Link
          href="/prompts"
          className="mt-6 inline-flex rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow"
        >
          رفتن به گالری پرامپت‌ها
        </Link>
      </div>
    </section>
  );
}
