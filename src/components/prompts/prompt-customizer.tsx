"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import type { PromptVariable } from "@/types/prompt";

function replaceAllLiteral(source: string, needle: string, replacement: string) {
  if (!needle) return source;
  return source.split(needle).join(replacement);
}

export function PromptCustomizer({
  promptText,
  negativePrompt,
  variables,
}: {
  promptText: string;
  negativePrompt?: string | null;
  variables: PromptVariable[];
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const generatedPrompt = useMemo(() => {
    let output = promptText ?? "";

    for (const variable of variables) {
      const value = values[variable.key]?.trim();
      const fallback = variable.example?.trim();
      const replacement = value || fallback || `{${variable.key}}`;

      output = replaceAllLiteral(output, `{${variable.key}}`, replacement);
    }

    const cleanNegativePrompt = negativePrompt?.trim();

    if (cleanNegativePrompt) {
      return `${output}\n\nNegative prompt:\n${cleanNegativePrompt}`;
    }

    return output;
  }, [negativePrompt, promptText, values, variables]);

  async function copyPrompt() {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="rounded-xl border border-border bg-surface">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-text">پرامپت آماده کپی</h2>
        <p className="mt-1 text-xs leading-6 text-text-muted">
          متغیرها را پر کن تا متن نهایی پرامپت به‌صورت زنده آماده کپی شود. اگر فیلدی خالی بماند، نمونه همان فیلد داخل پرامپت قرار می‌گیرد.
        </p>
      </div>

      {variables.length > 0 ? (
        <div className="grid gap-4 border-b border-border p-4 md:grid-cols-2">
          {variables.map((variable) => (
            <label key={variable.key} className="grid gap-2 text-sm font-semibold text-text">
              {variable.labelFa}
              <input
                type="text"
                value={values[variable.key] ?? ""}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [variable.key]: event.target.value,
                  }))
                }
                placeholder={variable.example}
                className="h-11 rounded-lg border border-border bg-background-soft px-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <span dir="ltr" className="text-left text-xs font-normal text-text-muted">
                {`{${variable.key}} → ${variable.example || "بدون نمونه"}`}
              </span>
            </label>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-text">متن نهایی</h3>
        <button
          type="button"
          onClick={copyPrompt}
          className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-3 py-2 text-xs font-semibold text-indigo-100 transition hover:bg-accent/25 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "کپی شد" : "کپی پرامپت"}
        </button>
      </div>

      {generatedPrompt ? (
        <pre dir="ltr" className="prompt-text whitespace-pre-wrap p-4 text-left text-sm leading-7 text-text-soft">
          {generatedPrompt}
        </pre>
      ) : (
        <p className="p-4 text-sm text-text-muted">متن پرامپت خالی است.</p>
      )}
    </section>
  );
}
