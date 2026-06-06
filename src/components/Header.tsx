"use client";

import Link from "next/link";
import { useApp } from "./AppProvider";

export function Header() {
  const { t, locale, toggleLocale, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-app/70 border-b border-app">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight"
        >
          <LogoMark />
          <span>ArqFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="/#plans" className="hover:text-app transition-colors">
            {t.nav.plans}
          </a>
          <a href="/#features" className="hover:text-app transition-colors">
            {t.nav.features}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-xl border border-app hover:bg-elev transition flex items-center justify-center"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            className="h-10 px-3 rounded-xl border border-app hover:bg-elev transition text-sm font-medium"
            aria-label="Switch language"
          >
            {locale === "ar" ? "EN" : "ع"}
          </button>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2A6072] to-[#6BA0AC] grid place-items-center text-white">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
