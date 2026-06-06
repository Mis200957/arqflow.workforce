"use client";

import { useApp } from "./AppProvider";

export function SuccessView({
  clientId,
  planLabelAr,
  planLabelEn,
}: {
  clientId: string;
  planLabelAr: string;
  planLabelEn: string;
}) {
  const { t, locale } = useApp();
  const planLabel = locale === "ar" ? planLabelAr : planLabelEn;
  return (
    <div className="card p-8 md:p-10">
      <div className="w-16 h-16 rounded-full bg-[#6BA0AC]/20 text-[#2A6072] grid place-items-center mx-auto">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl md:text-3xl font-bold">{t.form.success.heading}</h1>
      <p className="mt-3 text-muted">{t.form.success.msg}</p>
      {clientId && (
        <p className="mt-6 inline-block px-3 py-2 rounded-lg bg-elev border border-app font-mono text-sm">
          {clientId}
        </p>
      )}
      {planLabel && (
        <p className="mt-2 text-sm text-muted">
          {t.form.planLabel}: <strong>{planLabel}</strong>
        </p>
      )}
    </div>
  );
}
