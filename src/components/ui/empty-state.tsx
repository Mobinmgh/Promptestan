import Link from "next/link";

export function EmptyState({
  title,
  description,
  href,
  actionLabel,
}: {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <h2 className="text-xl font-black text-text">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-muted">{description}</p>
      {href && actionLabel ? (
        <Link
          href={href}
          className="mt-5 inline-flex rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
