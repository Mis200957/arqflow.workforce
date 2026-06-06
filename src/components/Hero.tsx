"use client";

import { useApp } from "./AppProvider";

export function Hero() {
  const { t } = useApp();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#6BA0AC]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#2A6072]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-app text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-[#6BA0AC] animate-pulse" />
          {t.hero.badge}
        </span>

        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mx-auto">
          {t.hero.title}
        </h1>

        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <a href="#plans" className="btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#features" className="btn-outline">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
