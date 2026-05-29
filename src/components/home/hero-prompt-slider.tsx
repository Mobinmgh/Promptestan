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
      <div className="relative overflow-hidden rounded-xl bg-background-soft">
        <div className="relative aspect-[4/5] md:aspect-[5/4]">
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
                  aria-hidden="true"
                  src={prompt.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl saturate-125"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                <div className="absolute inset-0 flex items-center justify-center p-4 pb-28 sm:p-5 sm:pb-32 md:p-6 md:pb-36">
                  <img
                    src={prompt.coverImage}
                    alt={prompt.imageAlt}
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.68)_100%)]" />
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
        </div>

        {slides.length > 1 ? (
          <div className="absolute left-0 right-0 top-4 z-20 flex justify-center gap-2">
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
