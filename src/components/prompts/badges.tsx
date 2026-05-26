import type { PromptAccess, PromptDifficulty } from "@/types/prompt";
import { cn } from "@/lib/utils";

const difficultyLabels: Record<PromptDifficulty, string> = {
  beginner: "مبتدی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

export function AccessBadge({ access }: { access: PromptAccess }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        access === "free"
          ? "border-success/35 bg-success/12 text-success"
          : "border-accent-2/45 bg-accent-2/15 text-violet-200",
      )}
    >
      {access === "free" ? "رایگان" : "حرفه‌ای"}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: PromptDifficulty }) {
  return (
    <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-xs font-semibold text-yellow-200">
      {difficultyLabels[difficulty]}
    </span>
  );
}

export function ModelBadge({ model }: { model: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-2.5 py-1 text-xs font-medium text-indigo-100">
      {model}
    </span>
  );
}

export function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-text-muted">
      {tag}
    </span>
  );
}
