"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Suggestion = {
  rank: number;
  title: string;
  tagline: string;
  reason: string;
  howToStart: string;
  script: string;
  period: string;
};

const RANK_CONFIG = [
  { label: "イチオシ", bg: "#F08300", text: "white" },
  { label: "2番目", bg: "#0A3059", text: "white" },
  { label: "3番目", bg: "#5b7a9a", text: "white" },
];

export default function ResultPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(0);
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    const answers = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}");
    const ind = sessionStorage.getItem("industry") || "";
    const job = sessionStorage.getItem("jobType") || "";
    const currentGakuchika = sessionStorage.getItem("currentGakuchika") || "";
    setIndustry(ind);
    setJobType(job);

    fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, industry: ind, jobType: job, currentGakuchika }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSuggestions(data.suggestions);
      })
      .catch(() => setError("提案の生成に失敗しました。もう一度お試しください。"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F2F4F8] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#0096DF] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#1A1A2E] font-bold text-lg">AIが分析中</p>
          <p className="text-gray-500 text-sm mt-2">あなたの強みと志望を掛け合わせています...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F2F4F8] flex flex-col items-center justify-center px-4">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-[#1A1A2E] underline text-sm">トップに戻る</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEF1F5] pb-24">
      {/* ヘッダー */}
      <div className="bg-[#0A3059]">
        <div className="max-w-2xl mx-auto px-5 pt-12 pb-7">
          <div className="inline-block bg-[#F08300] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm mb-3">
            AI診断結果
          </div>
          <h1 className="text-xl font-bold text-white mb-1.5">あなたへのおすすめガクチカ</h1>
          <p className="text-blue-100 text-[13px]">{industry}／{jobType} を志望するあなたへ</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        {suggestions.map((s, i) => {
          const cfg = RANK_CONFIG[i];
          const isOpen = expanded === i;
          return (
            <div key={s.rank} className="bg-white border border-gray-200 rounded-md overflow-hidden">
              {/* カードヘッダー */}
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left"
              >
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-xs font-medium px-2.5 py-1 shrink-0 mt-0.5"
                      style={{ backgroundColor: cfg.bg, color: cfg.text }}
                    >
                      {cfg.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-gray-800 leading-snug">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.tagline}</p>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      className={`shrink-0 text-gray-300 transition-transform mt-1 ${isOpen ? "rotate-90" : ""}`}
                    >
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* 展開コンテンツ */}
              {isOpen && (
                <div className="border-t border-gray-100 px-5 pb-6 pt-4 flex flex-col gap-5">
                  <div>
                    <p className="text-[13px] font-bold text-[#0096DF] mb-1.5">なぜあなたに刺さるか</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{s.reason}</p>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0096DF] mb-1.5">今すぐできる第一歩</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{s.howToStart}</p>
                  </div>
                  <div className="bg-[#F2F4F8] border border-gray-100 px-4 py-4 rounded">
                    <p className="text-[13px] font-bold text-gray-700 mb-1.5">面接での話し方（STAR法）</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.script}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#aaa" strokeWidth="1.5" />
                      <path d="M12 7v5l3 3" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs text-gray-400">推奨期間：{s.period}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 再診断 */}
      <div className="max-w-2xl mx-auto px-4 mt-2">
        <Link
          href="/start"
          className="block w-full text-center py-4 border border-gray-300 rounded text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 transition-colors"
        >
          もう一度診断する
        </Link>
      </div>
    </main>
  );
}
