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
    <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
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
