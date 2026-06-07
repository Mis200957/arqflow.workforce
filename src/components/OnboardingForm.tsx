"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./AppProvider";
import { Plan, WEBHOOK_URL, WHATSAPP_NUMBER } from "@/lib/plans";
import { generateClientId } from "@/lib/clientId";
import { extractTextFromFile, ExtractedFile } from "@/lib/fileExtract";

type PaymentMethod =
  | "cash"
  | "visa"
  | "instapay"
  | "fawry"
  | "wallet"
  | "bank";

type Product = { name: string; price: string; description: string };

type FormState = {
  businessName: string;
  businessType: string;
  goal: string;
  workingHours: string;
  location: string;
  paymentMethods: PaymentMethod[];
  knowledge: string;
  policy: string;
  products: Product[];
  tone: "formal" | "friendly" | "egyptian";
  fallback: "handover" | "collect" | "apologize";
  contact: string;
};

const INITIAL: FormState = {
  businessName: "",
  businessType: "",
  goal: "",
  workingHours: "",
  location: "",
  paymentMethods: ["cash"],
  knowledge: "",
  policy: "",
  products: [],
  tone: "egyptian",
  fallback: "handover",
  contact: "",
};

const STEP_KEYS = [
  "business",
  "operations",
  "knowledge",
  "behavior",
  "review",
] as const;

const PAYMENT_OPTS: PaymentMethod[] = [
  "cash",
  "visa",
  "instapay",
  "fawry",
  "wallet",
  "bank",
];

export function OnboardingForm({ plan }: { plan: Plan }) {
  const { t, locale } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>(INITIAL);
  const [files, setFiles] = useState<ExtractedFile[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = STEP_KEYS.length;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setState((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const togglePayment = (m: PaymentMethod) => {
    setState((s) => ({
      ...s,
      paymentMethods: s.paymentMethods.includes(m)
        ? s.paymentMethods.filter((x) => x !== m)
        : [...s.paymentMethods, m],
    }));
  };

  const addProduct = () =>
    setState((s) => ({
      ...s,
      products: [...s.products, { name: "", price: "", description: "" }],
    }));

  const updateProduct = (i: number, patch: Partial<Product>) =>
    setState((s) => ({
      ...s,
      products: s.products.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    }));

  const removeProduct = (i: number) =>
    setState((s) => ({
      ...s,
      products: s.products.filter((_, idx) => idx !== i),
    }));

  const validateStep = (i: number): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (i === 0) {
      if (!state.businessName.trim()) e.businessName = t.form.errors.required;
      if (!state.businessType.trim()) e.businessType = t.form.errors.required;
      if (!state.goal.trim()) e.goal = t.form.errors.required;
    } else if (i === 1) {
      if (!state.workingHours.trim())
        e.workingHours = t.form.errors.required;
      if (state.paymentMethods.length === 0)
        e.paymentMethods = t.form.errors.required;
    } else if (i === 2) {
      if (
        !state.knowledge.trim() &&
        files.length === 0 &&
        state.products.length === 0
      )
        e.knowledge = t.form.errors.required;
    } else if (i === 3) {
      if (!state.contact.trim()) e.contact = t.form.errors.required;
      else if (!/^[+\d][\d\s\-()]{6,}$/.test(state.contact.trim()))
        e.contact = t.form.errors.invalidPhone;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, totalSteps - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onFiles = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setExtracting(true);
    setExtractError(null);
    const next: ExtractedFile[] = [];
    for (const f of Array.from(list)) {
      try {
        const out = await extractTextFromFile(f);
        next.push(out);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Extraction error";
        setExtractError(msg);
      }
    }
    setFiles((prev) => [...prev, ...next]);
    setExtracting(false);
  };

  const removeFile = (name: string) =>
    setFiles((prev) => prev.filter((f) => f.name !== name));

  const submit = async () => {
    if (!validateStep(3)) {
      setStep(3);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    const clientId = generateClientId();
    const planName = plan.name[locale];

    const filesKnowledge = files
      .map((f) => `--- ${f.name} ---\n${f.text}`)
      .join("\n\n");
    const combinedKnowledge = [state.knowledge.trim(), filesKnowledge]
      .filter(Boolean)
      .join("\n\n");

    const cleanProducts = state.products
      .map((p) => ({
        name: p.name.trim(),
        price: p.price.trim(),
        description: p.description.trim(),
      }))
      .filter((p) => p.name || p.price || p.description);

    const payload = {
      client_id: clientId,
      submitted_at: new Date().toISOString(),
      locale,
      plan_id: plan.id,
      business_name: state.businessName.trim(),
      business_type: state.businessType.trim(),
      primary_goal: state.goal.trim(),
      knowledge_base: combinedKnowledge,
      tone_of_voice: state.tone,
      fallback_behavior: state.fallback,
      contact_number: state.contact.trim(),
      working_hours: state.workingHours.trim(),
      location: state.location.trim(),
      payment_methods: state.paymentMethods,
      policy: state.policy.trim(),
      products_services: cleanProducts,
      uploaded_files: files.map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
        text: f.text,
      })),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const waMsg = encodeURIComponent(t.form.whatsapp(planName, clientId));
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
      router.replace(`/onboarding/success?id=${clientId}&plan=${plan.id}`);
      setTimeout(() => {
        window.location.href = waUrl;
      }, 200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "submit failed";
      setSubmitError(`${t.form.errors.submitFailed} (${msg})`);
      setSubmitting(false);
    }
  };

  const progress = useMemo(
    () => Math.round(((step + 1) / totalSteps) * 100),
    [step, totalSteps],
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elev border border-app text-xs">
            <span className="text-muted">{t.form.planLabel}:</span>
            <strong>{plan.name[locale]}</strong>
          </span>
          <span className="text-sm text-muted">
            {t.form.stepLabel} {step + 1} {t.form.of} {totalSteps}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.form.heading}
        </h1>
        <p className="mt-2 text-muted">{t.form.sub}</p>

        <div className="mt-6 h-2 rounded-full bg-elev border border-app overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2A6072] to-[#6BA0AC] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
          {STEP_KEYS.map((k, i) => (
            <div
              key={k}
              className={`text-center px-1 py-1 rounded-md transition ${
                i <= step ? "text-app font-semibold" : "text-muted"
              }`}
            >
              {t.form.steps[k]}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 md:p-8">
        {step === 0 && <Step1 state={state} update={update} errors={errors} t={t} />}
        {step === 1 && (
          <Step2Operations
            state={state}
            update={update}
            togglePayment={togglePayment}
            errors={errors}
            t={t}
          />
        )}
        {step === 2 && (
          <Step3Knowledge
            state={state}
            update={update}
            errors={errors}
            files={files}
            onFiles={onFiles}
            removeFile={removeFile}
            extracting={extracting}
            extractError={extractError}
            addProduct={addProduct}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
            t={t}
          />
        )}
        {step === 3 && (
          <Step4Behavior state={state} update={update} errors={errors} t={t} />
        )}
        {step === 4 && (
          <Step5Review
            state={state}
            files={files}
            plan={plan}
            locale={locale}
            t={t}
          />
        )}

        {submitError && (
          <p className="mt-4 text-sm text-red-500">{submitError}</p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0 || submitting}
            className="btn-outline disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t.form.previous}
          </button>
          {step < totalSteps - 1 ? (
            <button type="button" onClick={next} className="btn-primary">
              {t.form.next}
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? t.form.submitting : t.form.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Steps -------------------- */

type StepCommonProps = {
  state: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  errors: Partial<Record<keyof FormState, string>>;
  t: ReturnType<typeof useApp>["t"];
};

function Step1({ state, update, errors, t }: StepCommonProps) {
  return (
    <div className="space-y-5">
      <Field label={t.form.fields.businessName} error={errors.businessName}>
        <input
          className="input-base"
          placeholder={t.form.fields.businessNamePh}
          value={state.businessName}
          onChange={(e) => update("businessName", e.target.value)}
        />
      </Field>
      <Field label={t.form.fields.businessType} error={errors.businessType}>
        <input
          className="input-base"
          placeholder={t.form.fields.businessTypePh}
          value={state.businessType}
          onChange={(e) => update("businessType", e.target.value)}
        />
      </Field>
      <Field label={t.form.fields.goal} error={errors.goal}>
        <input
          className="input-base"
          placeholder={t.form.fields.goalPh}
          value={state.goal}
          onChange={(e) => update("goal", e.target.value)}
        />
      </Field>
    </div>
  );
}

function Step2Operations({
  state,
  update,
  togglePayment,
  errors,
  t,
}: StepCommonProps & { togglePayment: (m: PaymentMethod) => void }) {
  return (
    <div className="space-y-5">
      <Field label={t.form.fields.workingHours} error={errors.workingHours}>
        <input
          className="input-base"
          placeholder={t.form.fields.workingHoursPh}
          value={state.workingHours}
          onChange={(e) => update("workingHours", e.target.value)}
        />
      </Field>

      <Field label={t.form.fields.location} error={errors.location}>
        <input
          className="input-base"
          placeholder={t.form.fields.locationPh}
          value={state.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </Field>

      <div>
        <label className="text-sm font-medium block">
          {t.form.fields.paymentMethods}
        </label>
        <p className="text-xs text-muted mt-1 mb-3">
          {t.form.fields.paymentMethodsHint}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PAYMENT_OPTS.map((m) => {
            const selected = state.paymentMethods.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => togglePayment(m)}
                className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition ${
                  selected
                    ? "border-[#6BA0AC] bg-[#6BA0AC]/15 text-app"
                    : "border-app text-muted hover:bg-elev"
                }`}
              >
                {t.form.fields.paymentOptions[m]}
              </button>
            );
          })}
        </div>
        {errors.paymentMethods && (
          <p className="mt-2 text-xs text-red-500">{errors.paymentMethods}</p>
        )}
      </div>
    </div>
  );
}

function Step3Knowledge({
  state,
  update,
  errors,
  files,
  onFiles,
  removeFile,
  extracting,
  extractError,
  addProduct,
  updateProduct,
  removeProduct,
  t,
}: StepCommonProps & {
  files: ExtractedFile[];
  onFiles: (l: FileList | null) => void;
  removeFile: (name: string) => void;
  extracting: boolean;
  extractError: string | null;
  addProduct: () => void;
  updateProduct: (i: number, patch: Partial<Product>) => void;
  removeProduct: (i: number) => void;
}) {
  return (
    <div className="space-y-6">
      <Field label={t.form.fields.knowledge} error={errors.knowledge}>
        <textarea
          className="input-base min-h-[140px] resize-y"
          placeholder={t.form.fields.knowledgePh}
          value={state.knowledge}
          onChange={(e) => update("knowledge", e.target.value)}
        />
      </Field>

      <Field label={t.form.fields.policy}>
        <textarea
          className="input-base min-h-[90px] resize-y"
          placeholder={t.form.fields.policyPh}
          value={state.policy}
          onChange={(e) => update("policy", e.target.value)}
        />
      </Field>

      <div>
        <label className="text-sm font-medium block">
          {t.form.fields.productsServices}
        </label>
        <p className="text-xs text-muted mt-1">
          {t.form.fields.productsServicesHint}
        </p>

        <div className="mt-3 space-y-3">
          {state.products.map((p, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-app bg-elev space-y-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  className="input-base"
                  placeholder={t.form.fields.productNamePh}
                  aria-label={t.form.fields.productName}
                  value={p.name}
                  onChange={(e) => updateProduct(i, { name: e.target.value })}
                />
                <input
                  className="input-base"
                  placeholder={t.form.fields.productPricePh}
                  aria-label={t.form.fields.productPrice}
                  value={p.price}
                  onChange={(e) => updateProduct(i, { price: e.target.value })}
                />
              </div>
              <input
                className="input-base"
                placeholder={t.form.fields.productDescPh}
                aria-label={t.form.fields.productDesc}
                value={p.description}
                onChange={(e) =>
                  updateProduct(i, { description: e.target.value })
                }
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeProduct(i)}
                  className="text-xs text-muted hover:text-red-500"
                >
                  ✕ {t.form.fields.remove}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addProduct}
          className="mt-3 btn-outline w-full"
        >
          {t.form.fields.productAdd}
        </button>
      </div>

      <div>
        <label className="text-sm font-medium">{t.form.fields.files}</label>
        <p className="text-xs text-muted mt-1">{t.form.fields.filesHint}</p>

        <label className="mt-3 block cursor-pointer">
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            className="sr-only"
            onChange={(e) => onFiles(e.target.files)}
          />
          <div className="border-2 border-dashed border-app rounded-xl p-6 text-center hover:bg-elev transition">
            <UploadIcon />
            <p className="mt-2 text-sm font-medium">PDF, DOCX, TXT</p>
            <p className="text-xs text-muted mt-1">
              {extracting ? t.form.fields.extracting : "click to choose files"}
            </p>
          </div>
        </label>

        {extractError && (
          <p className="mt-2 text-sm text-red-500">{extractError}</p>
        )}

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f) => (
              <li
                key={f.name}
                className="flex items-center justify-between gap-3 p-3 rounded-lg bg-elev border border-app text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{f.name}</p>
                  <p className="text-xs text-muted">
                    {(f.size / 1024).toFixed(1)} KB · {f.text.length} chars ·{" "}
                    <span className="text-[#2A6072] dark:text-[#6BA0AC]">
                      ✓ {t.form.fields.extracted}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(f.name)}
                  className="text-muted hover:text-red-500 text-xs"
                  aria-label="remove"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Step4Behavior({ state, update, errors, t }: StepCommonProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium block mb-2">
          {t.form.fields.tone}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["formal", "friendly", "egyptian"] as const).map((opt) => (
            <Chip
              key={opt}
              selected={state.tone === opt}
              onClick={() => update("tone", opt)}
            >
              {t.form.fields.toneOptions[opt]}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-2">
          {t.form.fields.fallback}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(["handover", "collect", "apologize"] as const).map((opt) => (
            <Chip
              key={opt}
              selected={state.fallback === opt}
              onClick={() => update("fallback", opt)}
            >
              {t.form.fields.fallbackOptions[opt]}
            </Chip>
          ))}
        </div>
      </div>

      <Field label={t.form.fields.contact} error={errors.contact}>
        <input
          className="input-base"
          dir="ltr"
          placeholder={t.form.fields.contactPh}
          value={state.contact}
          onChange={(e) => update("contact", e.target.value)}
        />
      </Field>

      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#2A6072]/10 to-[#6BA0AC]/10 border border-app">
        <p className="text-xs text-muted mb-2 font-medium">
          {t.form.preview.heading}
        </p>
        <div className="p-3 rounded-lg bg-elev border border-app text-sm">
          {t.form.preview.msg(state.businessName)}
        </div>
      </div>
    </div>
  );
}

function Step5Review({
  state,
  files,
  plan,
  locale,
  t,
}: {
  state: FormState;
  files: ExtractedFile[];
  plan: Plan;
  locale: "ar" | "en";
  t: ReturnType<typeof useApp>["t"];
}) {
  const paymentLabels = state.paymentMethods
    .map((m) => t.form.fields.paymentOptions[m])
    .join(" · ");

  const rows: Array<[string, string]> = [
    [t.form.planLabel, plan.name[locale]],
    [t.form.fields.businessName, state.businessName],
    [t.form.fields.businessType, state.businessType],
    [t.form.fields.goal, state.goal],
    [t.form.fields.workingHours, state.workingHours],
    [t.form.fields.location, state.location],
    [t.form.fields.paymentMethods, paymentLabels],
    [t.form.fields.tone, t.form.fields.toneOptions[state.tone]],
    [t.form.fields.fallback, t.form.fields.fallbackOptions[state.fallback]],
    [t.form.fields.contact, state.contact],
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-app divide-y divide-[var(--border)]">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex items-start justify-between gap-4 p-3 text-sm"
          >
            <span className="text-muted shrink-0">{k}</span>
            <span className="font-medium text-right rtl:text-left break-words">
              {v || "—"}
            </span>
          </div>
        ))}
      </div>

      {state.policy.trim() && (
        <details className="card p-4">
          <summary className="cursor-pointer text-sm font-medium">
            {t.form.fields.policy}
          </summary>
          <p className="mt-2 text-sm text-muted whitespace-pre-wrap">
            {state.policy}
          </p>
        </details>
      )}

      {state.products.length > 0 && (
        <details className="card p-4" open>
          <summary className="cursor-pointer text-sm font-medium">
            {t.form.fields.productsServices}{" "}
            <span className="text-muted">({state.products.length})</span>
          </summary>
          <ul className="mt-3 space-y-2 text-sm">
            {state.products.map((p, i) => (
              <li
                key={i}
                className="p-2 rounded-lg border border-app flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{p.name || "—"}</p>
                  {p.description && (
                    <p className="text-xs text-muted">{p.description}</p>
                  )}
                </div>
                <span className="shrink-0 text-[#2A6072] dark:text-[#6BA0AC] font-semibold">
                  {p.price || "—"}
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <details className="card p-4">
        <summary className="cursor-pointer text-sm font-medium">
          {t.form.fields.knowledge}{" "}
          <span className="text-muted">
            (
            {state.knowledge.length +
              files.reduce((a, f) => a + f.text.length, 0)}{" "}
            chars)
          </span>
        </summary>
        <pre className="mt-3 text-xs whitespace-pre-wrap text-muted max-h-64 overflow-auto">
          {state.knowledge}
          {files.map((f) => `\n\n--- ${f.name} ---\n${f.text}`).join("")}
        </pre>
      </details>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition ${
        selected
          ? "border-[#6BA0AC] bg-[#6BA0AC]/15 text-app"
          : "border-app text-muted hover:bg-elev"
      }`}
    >
      {children}
    </button>
  );
}

function UploadIcon() {
  return (
    <svg
      className="mx-auto"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
