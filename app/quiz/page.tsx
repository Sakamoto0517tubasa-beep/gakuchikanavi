"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = questions[current];
  const progress = Math.round(((current) / questions.length) * 100);

  function handleSelect(value: string) {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      sessionStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
      router.push("/target");
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>質問 {current + 1} / {questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#0068B7] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">{question.category}</p>
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-8 leading-relaxed">
          {question.text}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="w-full text-left px-6 py-4 rounded border border-gray-200 text-[#1A1A2E] font-medium hover:border-[#0068B7] hover:bg-[#EAF3FB] transition-all duration-150"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
