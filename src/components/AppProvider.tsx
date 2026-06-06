"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Locale, translations, Translations } from "@/lib/i18n";

type Theme = "light" | "dark";

type AppContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: Translations;
};

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEYS = {
  locale: "arq.locale",
  theme: "arq.theme",
} as const;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const savedLocale = (typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEYS.locale)
      : null) as Locale | null;
    const savedTheme = (typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEYS.theme)
      : null) as Theme | null;
    if (savedLocale === "ar" || savedLocale === "en") setLocaleState(savedLocale);
    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEYS.locale, locale);
  }, [locale]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleLocale = useCallback(
    () => setLocaleState((l) => (l === "ar" ? "en" : "ar")),
    [],
  );
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      theme,
      setTheme,
      toggleTheme,
      t: translations[locale],
    }),
    [locale, theme, setLocale, setTheme, toggleLocale, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
