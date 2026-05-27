import Link from "next/link";
import type { Prompt } from "@/types/prompt";
import { AccessBadge, DifficultyBadge, ModelBadge, TagBadge } from "./badges";
import { FavoriteButton } from "./favorite-button";

export function PromptCard({
  prompt,
  isLoggedIn = false,
  isSaved = false,
}: {
  prompt: Prompt;
  isLoggedIn?: boolean;
  isSaved?: boolean;
}) {
  return (
    <article className="group relative mb-6 break-inside-avoid overflow-hidden rounded-xl border border-border bg-surface transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/80 hover:shadow-glow">
      <Link href={`/prompts/${prompt.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-accent">
        <div className="relative overflow-hidden bg-background-soft">
          <img
            src={prompt.coverImage}
            alt={prompt.imageAlt}
            className="block h-auto w-full object-contain transition duration-500 ease-out group-hover:scale-[1.015]"
            loading="lazy"
          />
          <div className="absolute right-3 top-3 z-20 flex gap-2">
            <AccessBadge access={prompt.access} />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/95 via-black/65 to-transparent p-4 pt-24 md:block">
            <h2 className="translate-y-0 text-base font-black leading-7 text-white drop-shadow transition-all duration-300 ease-out group-hover:-translate-y-1">
              {prompt.title}
            </h2>
            <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,transform] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
              <div className="min-h-0 overflow-hidden">
                <div className="grid translate-y-2 gap-3 pt-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-accent/35 bg-accent/20 px-2.5 py-1 text-xs text-indigo-100">
                      {prompt.category}
                    </span>
                    <DifficultyBadge difficulty={prompt.difficulty} />
                  </div>
                  <p className="line-clamp-2 text-xs leading-6 text-zinc-200">{prompt.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {prompt.models.slice(0, 2).map((model) => (
                      <ModelBadge key={model} model={model} />
                    ))}
                    {prompt.tags.slice(0, 1).map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-3 md:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-indigo-100">
              {prompt.category}
            </span>
            <DifficultyBadge difficulty={prompt.difficulty} />
          </div>
          <div>
            <h2 className="mb-1 text-base font-bold leading-7 text-text">{prompt.title}</h2>
            <p className="line-clamp-1 text-xs leading-6 text-text-muted">{prompt.description}</p>
          </div>
        </div>
      </Link>

      <div className="grid gap-3 p-3 pt-0 md:hidden">
        <FavoriteButton promptId={prompt.id} slug={prompt.slug} isLoggedIn={isLoggedIn} isSaved={isSaved} />
      </div>

      <div className="hidden md:block">
        <div className="absolute left-3 top-3 z-20 opacity-0 transition duration-300 ease-out group-hover:opacity-100">
          <FavoriteButton promptId={prompt.id} slug={prompt.slug} isLoggedIn={isLoggedIn} isSaved={isSaved} />
        </div>
      </div>
    </article>
  );
}
