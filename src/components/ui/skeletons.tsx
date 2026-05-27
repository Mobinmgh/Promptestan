export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-4 aspect-[16/10] animate-pulse rounded-lg bg-background-soft" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-background-soft" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-background-soft" />
      <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-background-soft" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function SkeletonPanel() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="h-5 w-40 animate-pulse rounded bg-background-soft" />
      <div className="mt-5 grid gap-3">
        <div className="h-4 animate-pulse rounded bg-background-soft" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-background-soft" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-background-soft" />
      </div>
    </div>
  );
}
