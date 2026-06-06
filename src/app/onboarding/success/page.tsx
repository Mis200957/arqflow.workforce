import Link from "next/link";
import { SuccessView } from "@/components/SuccessView";
import { getPlan } from "@/lib/plans";

type PageProps = {
  searchParams: Promise<{ id?: string; plan?: string }>;
};

export default async function SuccessPage({ searchParams }: PageProps) {
  const { id, plan: planId } = await searchParams;
  const plan = getPlan(planId);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
      <SuccessView clientId={id ?? ""} planLabelAr={plan?.name.ar ?? ""} planLabelEn={plan?.name.en ?? ""} />
      <Link href="/" className="btn-outline mt-8 inline-flex">
        ← Home
      </Link>
    </div>
  );
}
