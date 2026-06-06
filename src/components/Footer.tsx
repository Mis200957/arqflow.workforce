"use client";

import { useApp } from "./AppProvider";

export function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-app mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p>ArqFlow — {t.footer.tagline}</p>
        <p>
          © {year} ArqFlow. {t.footer.rights}.
        </p>
      </div>
    </footer>
  );
}
