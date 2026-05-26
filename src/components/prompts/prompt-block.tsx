"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function PromptBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-text">{title}</h2>
        <button
          type="button"
          onClick={copyPrompt}
          className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-3 py-2 text-xs font-semibold text-indigo-100 transition hover:bg-accent/25 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "کپی شد" : "کپی"}
        </button>
      </div>
      <p
        dir="ltr"
        className="prompt-text whitespace-pre-wrap p-4 text-left text-sm leading-7 text-text-soft"
      >
        {text}
      </p>
    </section>
  );
}
