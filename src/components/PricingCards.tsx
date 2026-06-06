"use client";

import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { useApp } from "./AppProvider";

export function PricingCards() {
  const { t, locale } = useApp();

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(n);

  return (
    <section id="plans" className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.plans.heading}
        </h2>
        <p className="mt-3 text-muted">{t.plans.sub}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const featured = plan.highlighted;
          return (
            <div
              key={plan.id}
              className={`relative card p-7 flex flex-col ${
                featured ? "ring-2 ring-[#6BA0AC] md:scale-[1.03]" : ""
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#2A6072] to-[#6BA0AC] text-white text-xs font-semibold">
                  {t.plans.mostPopular}
                </span>
              )}

              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold">{plan.name[locale]}</h3>
                <span className="w-2 h-2 rounded-full bg-[#6BA0AC]" />
              </div>
              <p className="mt-2 text-sm text-muted leading-relaxed min-h-[3.5rem]">
                {plan.tagline[locale]}
              </p>

              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {fmt(plan.setupFee)}
                  </span>
                  <span className="text-sm text-muted">EGP</span>
                </div>
                <p className="mt-1 text-xs text-muted">{t.plans.setupFee}</p>
              </div>

              <div className="mt-4 px-4 py-3 rounded-xl border border-app flex items-center justify-between">
                <span className="text-xs text-muted">{t.plans.monthly}</span>
                <span className="font-semibold">
                  {fmt(plan.monthlyFee)} EGP {t.plans.perMonth}
                </span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features[locale].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/onboarding?plan=${plan.id}`}
                className={`mt-7 ${featured ? "btn-primary" : "btn-outline"} w-full`}
              >
                {t.plans.choose}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#6BA0AC]/20 grid place-items-center text-[#2A6072]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
