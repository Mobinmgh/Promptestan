"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container-page grid min-h-[55vh] place-items-center py-16">
      <div className="max-w-xl rounded-2xl border border-border bg-surface p-8 text-center">
        <span className="mb-4 inline-flex rounded-full border border-danger/35 bg-danger/10 px-3 py-1.5 text-xs font-semibold text-red-100">
          خطا
        </span>
        <h1 className="text-3xl font-black text-text">مشکلی پیش آمد</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">
          صفحه به‌درستی بارگذاری نشد. دوباره تلاش کن یا به صفحه اصلی برگرد.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow"
          >
            تلاش دوباره
          </button>
          <Link href="/" className="rounded-lg border border-border bg-background-soft px-4 py-2.5 text-sm font-bold text-text-muted">
            صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
