import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه ارتباط با پرامپتستان.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 md:p-8">
        <h1 className="text-3xl font-black text-text">تماس با ما</h1>
        <p className="mt-6 text-sm leading-8 text-text-muted">
          برای پیشنهاد، همکاری یا پشتیبانی می‌توانی از ایمیل زیر با ما در ارتباط باشی.
        </p>
        <p dir="ltr" className="mt-4 text-left text-lg font-bold text-indigo-100">
          hello@promptestan.com
        </p>
      </div>
    </section>
  );
}
