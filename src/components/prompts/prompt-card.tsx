import Image from "next/image";
import Link from "next/link";
import type { Prompt } from "@/types/prompt";
import { AccessBadge, DifficultyBadge, ModelBadge, TagBadge } from "./badges";

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-surface transition duration-200 hover:-translate-y-1 hover:border-accent/80 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-background-soft">
        <Image
          src={prompt.coverImage}
          alt={prompt.imageAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <AccessBadge access={prompt.access} />
        </div>
      </div>

      <div className="grid min-h-64 gap-4 p-5">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-indigo-100">
              {prompt.category}
            </span>
            <DifficultyBadge difficulty={prompt.difficulty} />
          </div>
          <h2 className="mb-2 text-lg font-bold text-text">{prompt.title}</h2>
          <p className="line-clamp-3 text-sm leading-7 text-text-muted">{prompt.description}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {prompt.models.slice(0, 2).map((model) => (
            <ModelBadge key={model} model={model} />
          ))}
          {prompt.tags.slice(0, 1).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
