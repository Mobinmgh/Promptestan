"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { login, signup, type AuthFormState } from "@/app/login/actions";

const initialState: AuthFormState = {
  error: null,
};

function SubmitButton({ mode }: { mode: "login" | "signup" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 h-12 rounded-lg bg-gradient-to-l from-accent to-accent-2 px-4 text-sm font-bold text-white shadow-glow transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "در حال ارسال..." : mode === "login" ? "ورود" : "ساخت حساب"}
    </button>
  );
}

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction] = useFormState(login, initialState);
  const [signupState, signupAction] = useFormState(signup, initialState);
  const state = mode === "login" ? loginState : signupState;

  return (
    <form action={mode === "login" ? loginAction : signupAction} className="grid gap-5 p-6 lg:p-8">
      <div className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background-soft p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={
            mode === "login"
              ? "rounded-md bg-accent/20 px-3 py-2 text-sm font-bold text-indigo-100"
              : "rounded-md px-3 py-2 text-sm font-bold text-text-muted"
          }
        >
          ورود
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={
            mode === "signup"
              ? "rounded-md bg-accent/20 px-3 py-2 text-sm font-bold text-indigo-100"
              : "rounded-md px-3 py-2 text-sm font-bold text-text-muted"
          }
        >
          ایجاد حساب
        </button>
      </div>

      {state.error ? (
        <div className="rounded-lg border border-danger/35 bg-danger/10 p-3 text-sm leading-7 text-red-100">
          {state.error}
        </div>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-text">
        ایمیل
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          dir="ltr"
          className="h-12 rounded-lg border border-border bg-background-soft px-4 text-left text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-text">
        رمز عبور
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          dir="ltr"
          className="h-12 rounded-lg border border-border bg-background-soft px-4 text-left text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
          required
          minLength={6}
        />
      </label>

      <SubmitButton mode={mode} />
    </form>
  );
}
