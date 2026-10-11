import { Suspense } from "react";
import { notFound } from "next/navigation";
import Quiz from "@/components/Quiz";
import { getAdjacentMonths, getMonth, months, themeStyle } from "@/lib/months";
import { getQuiz } from "@/lib/quizzes";

export function generateStaticParams() {
  return months.map((m) => ({ month: m.slug }));
}

export async function generateMetadata({ params }) {
  const month = getMonth((await params).month);
  if (!month) return {};
  return {
    title: `${month.name} Quiz · ${getQuiz(month.slug).topic}`,
    description: `Five questions on ${month.campaign.title}. How much do you know?`,
  };
}

export default function QuizPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" />}>
      <QuizContent params={params} />
    </Suspense>
  );
}

async function QuizContent({ params }) {
  const month = getMonth((await params).month);
  if (!month) notFound();
  const { next } = getAdjacentMonths(month.index);
  return (
    <div style={themeStyle(month.theme)}>
      <Quiz month={month} quiz={getQuiz(month.slug)} next={next} />
    </div>
  );
}
