export type PlanId = "starter" | "business" | "enterprise";

export type Plan = {
  id: PlanId;
  name: { ar: string; en: string };
  tagline: { ar: string; en: string };
  setupFee: number;
  monthlyFee: number;
  features: { ar: string[]; en: string[] };
  highlighted?: boolean;
  ctaType: "form" | "contact";
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: { ar: "أساسي", en: "Starter" },
    tagline: {
      ar: "للمحلات والعيادات اللي محتاجة رد تلقائي بسيط ومحترم",
      en: "For shops & clinics needing simple, polite auto-replies",
    },
    setupFee: 2500,
    monthlyFee: 500,
    features: {
      ar: [
        "بوت رد تلقائي على الواتساب",
        "Flow واحد مخصص لنشاطك",
        "تسجيل الطلبات في Google Sheets",
        "رد باللهجة المصرية",
      ],
      en: [
        "Auto-reply bot on WhatsApp",
        "1 custom flow tailored to your business",
        "Order logging in Google Sheets",
        "Egyptian Arabic dialect support",
      ],
    },
    ctaType: "form",
  },
  {
    id: "business",
    name: { ar: "متوسط", en: "Business" },
    tagline: {
      ar: "للمطاعم والمحلات اللي عايزة نظام متكامل بيع ويحجز ويتابع",
      en: "For restaurants & shops needing a full sales/booking system",
    },
    setupFee: 4000,
    monthlyFee: 750,
    features: {
      ar: [
        "كل مميزات Starter",
        "2 flows مخصصين لنشاطك",
        "نظام حجز مواعيد تلقائي",
        "متابعة العملاء تلقائيًا",
        "إشعارات فورية ليك",
        "تقرير شهري بالأداء",
      ],
      en: [
        "Everything in Starter",
        "2 custom flows for your business",
        "Automated booking system",
        "Automated customer follow-up",
        "Instant notifications to you",
        "Monthly performance report",
      ],
    },
    highlighted: true,
    ctaType: "form",
  },
  {
    id: "enterprise",
    name: { ar: "متقدم", en: "Enterprise" },
    tagline: {
      ar: "للشركات اللي محتاجة أتمتة كاملة وتكامل مع أنظمتها الحالية",
      en: "For companies needing full automation & system integration",
    },
    setupFee: 7000,
    monthlyFee: 1200,
    features: {
      ar: [
        "كل مميزات Business",
        "3+ flows متكاملة",
        "تكامل مع CRM / أنظمة خارجية",
        "تقارير أسبوعية تفصيلية",
        "أتمتة كاملة للمبيعات",
        "دعم مباشر أولوية عالية",
      ],
      en: [
        "Everything in Business",
        "3+ integrated flows",
        "CRM / external systems integration",
        "Detailed weekly reports",
        "Full sales automation",
        "High-priority live support",
      ],
    },
    ctaType: "form",
  },
];

export const getPlan = (id: string | null | undefined): Plan | undefined =>
  PLANS.find((p) => p.id === id);

export const WHATSAPP_NUMBER = "201090220773";
export const WEBHOOK_URL =
  "https://bc1b1373.kube-ops.com/webhook/ai_workforce_factory_webhook";
