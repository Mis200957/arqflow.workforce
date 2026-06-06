import { redirect } from "next/navigation";
import { getPlan, PlanId } from "@/lib/plans";
import { OnboardingForm } from "@/components/OnboardingForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function OnboardingPage({ searchParams }: PageProps) {
  const { plan: planId } = await searchParams;
  const plan = getPlan(planId as PlanId | undefined);
  if (!plan) redirect("/#plans");
  return <OnboardingForm plan={plan} />;
}
