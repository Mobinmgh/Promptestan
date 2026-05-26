export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-text">
      {label}
      {children}
    </label>
  );
}

export const inputClass =
  "min-h-11 rounded-lg border border-border bg-background-soft px-3 py-2 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30";

export const textareaClass =
  "min-h-28 rounded-lg border border-border bg-background-soft px-3 py-2 text-sm leading-7 text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30";
