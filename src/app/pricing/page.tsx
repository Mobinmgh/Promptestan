import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "قیمت‌گذاری",
  description: "مقایسه پلن رایگان و حرفه‌ای پرامپتستان.",
};

const plans = [
  {
    name: "رایگان",
    description: "برای شروع و تست پرامپت‌های آماده تصویری.",
    price: "۰ تومان",
    cta: "شروع رایگان",
    highlighted: false,
    features: ["دسترسی به پرامپت‌های رایگان", "پیش‌نمایش پرامپت‌های حرفه‌ای", "ذخیره پرامپت‌ها در فاز بعدی"],
  },
  {
    name: "حرفه‌ای",
    description: "برای سازندگان محتوا، فروشگاه‌ها و تیم‌هایی که خروجی حرفه‌ای‌تر می‌خواهند.",
    price: "فعال‌سازی دستی",
    cta: "عضویت حرفه‌ای",
    highlighted: true,
    features: ["باز شدن پرامپت‌های حرفه‌ای", "دسترسی به پکیج‌های پرمیوم ویژوال پرامپت", "دریافت پرامپت‌های جدید در آینده"],
  },
];

export default function PricingPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-semibold text-indigo-100">
          Pricing
        </span>
        <h1 className="text-3xl font-black leading-tight text-text md:text-4xl">پلن مناسب خودت را انتخاب کن</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted md:text-base">
          از پرامپت‌های رایگان شروع کن یا برای پرامپت‌های حرفه‌ای‌تر پلن Pro را انتخاب کن.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={
              plan.highlighted
                ? "rounded-2xl border border-accent/60 bg-accent/10 p-6 shadow-glow md:p-8"
                : "rounded-2xl border border-border bg-surface p-6 md:p-8"
            }
          >
            <div className="mb-8">
              <h2 className="text-2xl font-black text-text">{plan.name}</h2>
              <p className="mt-3 min-h-14 text-sm leading-7 text-text-muted">{plan.description}</p>
              <div className="mt-6 text-3xl font-black text-text">{plan.price}</div>
            </div>

            <div className="mb-8 grid gap-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-text-soft">
                  <CheckCircle2 size={18} className="shrink-0 text-success" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className={
                plan.highlighted
                  ? "inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-3 text-sm font-bold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent"
                  : "inline-flex w-full items-center justify-center rounded-lg border border-border bg-background-soft px-4 py-3 text-sm font-bold text-text transition hover:border-accent/70 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-accent"
              }
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
