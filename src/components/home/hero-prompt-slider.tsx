"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AccessBadge } from "@/components/prompts/badges";
import type { Prompt } from "@/types/prompt";

export function HeroPromptSlider({ prompts }: { prompts: Prompt[] }) {
  const slides = useMemo(() => prompts.slice(0, 5), [prompts]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-3 shadow-glow">
        <div className="rounded-xl border border-border bg-background-soft p-6 text-sm leading-7 text-text-muted">
          پس از اجرای داده‌های اولیه، پرامپت‌های منتخب اینجا نمایش داده می‌شوند.
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-border bg-surface p-3 shadow-glow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background-soft">
          {slides.map((prompt, index) => {
            const isActive = index === activeIndex;

            return (
              <Link
                key={prompt.slug}
                href={`/prompts/${prompt.slug}`}
                className={
                  isActive
                    ? "pointer-events-auto absolute inset-0 z-10 opacity-100 transition-opacity duration-700"
                    : "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700"
                }
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
              >
                <img
                  src={prompt.coverImage}
                  alt={prompt.imageAlt}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <AccessBadge access={prompt.access} />
                    <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-xs text-zinc-100 backdrop-blur">
                      {prompt.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black leading-9 text-white md:text-3xl">{prompt.title}</h2>
                  <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-7 text-zinc-200">
                    {prompt.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/12 px-3 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/18">
                    مشاهده پرامپت
                    <ArrowLeft size={16} />
                  </span>
                </div>
              </Link>
            );
          })}

        {slides.length > 1 ? (
          <div className="absolute left-0 right-0 top-4 z-30 flex justify-center gap-2">
            {slides.map((prompt, index) => (
              <button
                key={prompt.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={
                  index === activeIndex
                    ? "h-2.5 w-7 rounded-full bg-white transition-all"
                    : "h-2.5 w-2.5 rounded-full bg-white/45 transition-all hover:bg-white/75"
                }
                aria-label={`نمایش اسلاید ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
