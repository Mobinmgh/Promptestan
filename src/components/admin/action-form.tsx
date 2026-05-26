"use client";

import type { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";

type State = {
  error?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "در حال ذخیره..." : label}
    </button>
  );
}

export function ActionForm({
  action,
  submitLabel,
  children,
  className,
}: {
  action: (state: State, formData: FormData) => Promise<State>;
  submitLabel: string;
  children: ReactNode;
  className?: string;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className={className ?? "grid gap-5"} encType="multipart/form-data">
      {state.error ? (
        <div className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm leading-7 text-red-100">
          {state.error}
        </div>
      ) : null}
      {children}
      <SubmitButton label={submitLabel} />
    </form>
  );
}
