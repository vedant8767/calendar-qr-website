import { Suspense } from "react";
import { notFound } from "next/navigation";
import MonthExperience from "@/components/MonthExperience";
import { getAdjacentMonths, getMonth, months } from "@/lib/months";
import { getQuiz } from "@/lib/quizzes";

export function generateStaticParams() {
  return months.map((m) => ({ month: m.slug }));
}

export async function generateMetadata({ params }) {
  const month = getMonth((await params).month);
  if (!month) return {};
  return {
    title: month.name,
    description: `${month.campaign.title} and ${month.days.length} health observances in ${month.name} 2027.`,
  };
}

export default function MonthPage({ params }) {
  return (
    <Suspense fallback={<MonthSkeleton />}>
      <MonthContent params={params} />
    </Suspense>
  );
}

async function MonthContent({ params }) {
  const month = getMonth((await params).month);
  if (!month) notFound();
  const { prev, next } = getAdjacentMonths(month.index);
  return (
    <MonthExperience
      month={month}
      prev={prev}
      next={next}
      quizTopic={getQuiz(month.slug).topic}
    />
  );
}

function MonthSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 pt-20 sm:px-6">
      <div className="h-28 w-3/4 rounded-3xl bg-line" />
      <div className="mt-6 h-40 max-w-xl rounded-[2rem] bg-line" />
      <div className="mt-8 aspect-square max-w-xl rounded-[2rem] bg-line/70" />
    </div>
  );
}
