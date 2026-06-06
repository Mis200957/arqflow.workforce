"use client";

import { useApp } from "./AppProvider";

const ICONS = [
  // Clock
  <svg key="clock" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>,
  // Chat
  <svg key="chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  // Plug
  <svg key="plug" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v5" />
  </svg>,
  // Zap
  <svg key="zap" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
];

export function Features() {
  const { t } = useApp();
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.features.heading}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {t.features.items.map((item, i) => (
          <div key={item.title} className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-[#6BA0AC]/15 text-[#2A6072] grid place-items-center">
              {ICONS[i]}
            </div>
            <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
