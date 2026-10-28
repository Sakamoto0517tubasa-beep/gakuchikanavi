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
  { label: "イチオシ", bg: "#F08300" },
  { label: "2番目", bg: "#0A3059" },
  { label: "3番目", bg: "#5b7a9a" },
];

const LOADING_MSGS = [
  "回答から強みを分析しています...",
  "志望業界・職種と掛け合わせています...",
  "あなたに刺さるガクチカを選んでいます...",
];

export default function ResultPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [strengthProfile, setStrengthProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(0);
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const answers = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}");
    const ind = sessionStorage.getItem("industry") || "";
    const job = sessionStorage.getItem("jobType") || "";
    const grade = sessionStorage.getItem("grade") || "";
    const currentGakuchika = sessionStorage.getItem("currentGakuchika") || "";
    setIndustry(ind);
    setJobType(job);

    fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, industry: ind, jobType: job, grade, currentGakuchika }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSuggestions(data.suggestions);
        setStrengthProfile(data.strengthProfile || "");
      })
      .catch(() => setError("提案の生成に失敗しました。もう一度お試しください。"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % LOADING_MSGS.length), 1800);
    return () => clearInterval(t);
  }, [loading]);

  function copySuggestion(s: Suggestion, i: number) {
    const text = `【${s.title}】\n${s.tagline}\n\n■なぜ刺さるか\n${s.reason}\n\n■今すぐできる第一歩\n${s.howToStart}\n\n■面接での話し方（STAR法）\n${s.script}`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1800);
    });
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#0096DF] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#0A3059] font-bold text-lg">AIが分析中</p>
          <p key={msgIdx} className="fade-in-up text-gray-500 text-sm mt-2">{LOADING_MSGS[msgIdx]}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] flex flex-col items-center justify-center px-4">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-[#0A3059] underline text-sm">トップに戻る</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEF1F5] pb-24">
      {/* ヘッダー */}
      <div className="bg-[#0A3059]">
        <div className="max-w-2xl mx-auto px-5 pt-12 pb-7">
          <div className="inline-block bg-[#F08300] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm mb-3">
            AI診断結果
          </div>
          <h1 className="text-xl font-bold text-white mb-1.5">あなたへのおすすめガクチカ</h1>
          <p className="text-blue-100 text-[13px]">{industry}／{jobType} を志望するあなたへ</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        {strengthProfile && (
          <div className="fade-in-up bg-white border border-gray-200 rounded-md px-5 py-4 flex items-start gap-3">
            <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.8">
                <path d="M13 2L3 14h7l-1 8 11-13h-7l1-7z" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-medium text-[#0096DF] mb-0.5">あなたの強みタイプ</p>
              <p className="text-[15px] font-medium text-gray-900 leading-snug">{strengthProfile}</p>
            </div>
          </div>
        )}

        {suggestions.map((s, i) => {
          const cfg = RANK_CONFIG[i] ?? RANK_CONFIG[2];
          const isOpen = expanded === i;
          return (
            <div
              key={s.rank}
              className="fade-in-up bg-white border border-gray-200 rounded-md overflow-hidden"
              style={{ animationDelay: `${0.08 * (i + 1)}s` }}
            >
              {/* カードヘッダー */}
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left active:bg-gray-50 transition-colors"
              >
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-xs font-medium px-2.5 py-1 shrink-0 mt-0.5 rounded-sm"
                      style={{ backgroundColor: cfg.bg, color: "#fff" }}
                    >
                      {cfg.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-gray-800 leading-snug">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.tagline}</p>
                    </div>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      className={`shrink-0 text-gray-300 transition-transform duration-300 mt-1 ${isOpen ? "rotate-90" : ""}`}
                    >
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* 展開コンテンツ（滑らかに開閉） */}
              <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-5 pb-5 pt-4 flex flex-col gap-5">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="#aaa" strokeWidth="1.6" />
                          <path d="M12 7v5l3 3" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <span className="text-xs text-gray-400">推奨期間：{s.period}</span>
                      </div>
                      <button
                        onClick={() => copySuggestion(s, i)}
                        className="flex items-center gap-1.5 text-xs font-medium text-[#0096DF] border border-[#9fd3ef] bg-[#EAF4FB] rounded px-3 py-1.5 active:scale-95 transition-transform"
                      >
                        {copied === i ? (
                          <>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0096DF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            コピーしました
                          </>
                        ) : (
                          <>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="#0096DF" strokeWidth="1.8" /><path d="M5 15V5a2 2 0 012-2h10" stroke="#0096DF" strokeWidth="1.8" strokeLinecap="round" /></svg>
                            ESに使う文をコピー
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 再診断 */}
      <div className="max-w-2xl mx-auto px-4 mt-2">
        <Link
          href="/start"
          className="block w-full text-center py-4 border border-gray-300 rounded text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all"
        >
          もう一度診断する
        </Link>
      </div>
    </main>
  );
}
