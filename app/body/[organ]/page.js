import { Suspense } from "react";
import { notFound } from "next/navigation";
import OrganInfo from "@/components/body/OrganInfo";
import { getOrgan, organs } from "@/lib/organs";

export function generateStaticParams() {
  return organs.map((o) => ({ organ: o.slug }));
}

export async function generateMetadata({ params }) {
  const organ = getOrgan((await params).organ);
  if (!organ) return {};
  return { title: organ.name, description: organ.intro };
}

export default function OrganPage({ params }) {
  return (
    <Suspense fallback={<div className="h-[60vh] animate-pulse rounded-[2rem] bg-line/60" />}>
      <OrganContent params={params} />
    </Suspense>
  );
}

async function OrganContent({ params }) {
  const organ = getOrgan((await params).organ);
  if (!organ) notFound();
  return <OrganInfo slug={organ.slug} />;
}
