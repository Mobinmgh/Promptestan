import type { Prompt } from "@/types/prompt";
import { PromptCard } from "./prompt-card";

export function PromptGrid({
  prompts,
  isLoggedIn = false,
  savedPromptIds = [],
}: {
  prompts: Prompt[];
  isLoggedIn?: boolean;
  savedPromptIds?: string[];
}) {
  const savedSet = new Set(savedPromptIds);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.slug}
          prompt={prompt}
          isLoggedIn={isLoggedIn}
          isSaved={Boolean(prompt.id && savedSet.has(prompt.id))}
        />
      ))}
    </div>
  );
}
