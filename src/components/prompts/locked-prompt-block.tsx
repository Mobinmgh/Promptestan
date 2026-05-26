import Link from "next/link";
import { Lock } from "lucide-react";

export function LockedPromptBlock({ preview }: { preview: string }) {
  return (
    <section className="overflow-hidden rounded-xl border border-accent/35 bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-text">متن پرامپت حرفه‌ای</h2>
        <span className="inline-flex items-center gap-2 rounded-lg border border-accent-2/40 bg-accent-2/15 px-3 py-2 text-xs font-semibold text-violet-100">
          <Lock size={15} />
          قفل شده
        </span>
      </div>
      <div className="relative">
        <p
          dir="ltr"
          className="prompt-text max-h-40 overflow-hidden whitespace-pre-wrap p-4 text-left text-sm leading-7 text-text-soft"
        >
          {preview}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <div className="border-t border-border bg-background-soft p-4">
        <p className="mb-4 text-sm leading-7 text-text-muted">
          این پرامپت در نسخه حرفه‌ای کامل باز می‌شود. برای مشاهده متن کامل، پلن Pro را انتخاب کن.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          عضویت حرفه‌ای
        </Link>
      </div>
    </section>
  );
}
