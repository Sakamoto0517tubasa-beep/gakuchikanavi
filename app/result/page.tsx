"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Suggestion = {
  rank: number;
  title: string;
  reason: string;
  howToStart: string;
  period: string;
};

export default function ResultPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const answers = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}");
    const industry = sessionStorage.getItem("industry") || "";
    const jobType = sessionStorage.getItem("jobType") || "";
    const currentGakuchika = sessionStorage.getItem("currentGakuchika") || "";

    fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, industry, jobType, currentGakuchika }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSuggestions(data.suggestions);
      })
      .catch(() => setError("提案の生成に失敗しました。もう一度お試しください。"))
      .finally(() => setLoading(false));
  }, []);

  const rankColors = ["#E94560", "#4A90D9", "#2ECC71"];
  const rankLabels = ["1st", "2nd", "3rd"];

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-4xl mb-6 animate-spin">⚙️</div>
          <p className="text-[#1A1A2E] font-bold text-lg">AIが分析中...</p>
          <p className="text-gray-400 text-sm mt-2">あなたに最適なガクチカを考えています</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-[#E94560] underline">トップに戻る</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">あなたへのおすすめガクチカ</h2>
          <p className="text-gray-400 text-sm">AIが得意・好き × 志望業界 × 職種を掛け合わせて提案しました</p>
        </div>

        <div className="flex flex-col gap-6">
          {suggestions.map((s, i) => (
            <div
              key={s.rank}
              className="border-2 rounded-2xl p-6"
              style={{ borderColor: rankColors[i] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-white text-sm font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: rankColors[i] }}
                >
                  {rankLabels[i]}
                </span>
                <h3 className="text-lg font-bold text-[#1A1A2E]">{s.title}</h3>
              </div>

              <div className="mb-3">
                <p className="text-xs font-bold text-gray-400 mb-1">なぜこれが刺さるか</p>
                <p className="text-sm text-gray-700 leading-relaxed">{s.reason}</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-bold text-gray-400 mb-1">今すぐできる始め方</p>
                <p className="text-sm text-gray-700 leading-relaxed">{s.howToStart}</p>
              </div>

              <div className="mt-3 inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                推奨期間：{s.period}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-[#E94560] text-sm underline"
          >
            もう一度診断する
          </Link>
        </div>
      </div>
    </main>
  );
}
