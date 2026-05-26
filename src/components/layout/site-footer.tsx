import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-background-soft">
      <div className="container-page grid gap-10 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/45 bg-accent/15 text-sm font-black text-white">
              پ
            </span>
            <span className="text-lg font-bold">پرامپتستان</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-text-muted">
            گالری پرامپت‌های آماده و تست‌شده برای ساخت عکس محصول، تبلیغات اینستاگرام،
            کاتالوگ، برندینگ و محتوای فروش.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-text">لینک‌های سریع</h2>
          <div className="grid gap-3 text-sm text-text-muted">
            <Link href="/prompts" className="hover:text-text">پرامپت‌ها</Link>
            <Link href="/categories" className="hover:text-text">دسته‌بندی‌ها</Link>
            <Link href="/pricing" className="hover:text-text">قیمت‌گذاری</Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-text">ارتباط</h2>
          <div className="grid gap-3 text-sm text-text-muted">
            <span dir="ltr" className="text-right">hello@promptestan.com</span>
            <span>قوانین استفاده</span>
            <span>حریم خصوصی</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
