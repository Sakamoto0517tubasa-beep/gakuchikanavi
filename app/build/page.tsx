"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Suggestion = {
  title: string;
  tagline: string;
  reason: string;
  howToStart: string;
  script: string;
  period: string;
};

type Developed = {
  fullText: string;
  structure: { situation: string; task: string; action: string; result: string };
  appealPoints: string[];
  interviewQs: string[];
};

const FIELDS = [
  { key: "situation", label: "取り組む場面・環境", ph: "例：居酒屋のアルバイト先で" },
  { key: "task", label: "目標・解決したい課題", ph: "例：常連客のリピート率を上げたい" },
  { key: "action", label: "工夫すること・したこと", ph: "例：顧客ごとに好みを記録して声かけを変える" },
  { key: "result", label: "出したい成果・数字", ph: "例：3ヶ月でリピート率を15%改善" },
] as const;

export default function BuildPage() {
  const router = useRouter();
  const [gakuchika, setGakuchika] = useState<Suggestion | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Developed | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("selectedGakuchika");
    if (!raw) {
      router.replace("/result");
      return;
    }
    setGakuchika(JSON.parse(raw));
  }, [router]);

  function generate() {
    setLoading(true);
    setError("");
    fetch("/api/develop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gakuchika,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
        grade: sessionStorage.getItem("grade") || "",
        inputs,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setResult(d);
        setTimeout(() => window.scrollTo({ top: 9999, behavior: "smooth" }), 100);
      })
      .catch(() => setError("生成に失敗しました。もう一度お試しください。"))
      .finally(() => setLoading(false));
  }

  function copyText() {
    if (!result) return;
    navigator.clipboard?.writeText(result.fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  if (!gakuchika) return <main className="min-h-screen bg-[#EEF1F5]" />;

  return (
    <main className="min-h-screen bg-[#EEF1F5] pb-16">
      {/* ヘッダー */}
      <div className="bg-[#0A3059]">
        <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
          <button onClick={() => router.back()} className="text-blue-200 text-[13px] mb-3 flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#bcd4ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            提案一覧に戻る
          </button>
          <div className="inline-block bg-[#F08300] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm mb-2">選んだガクチカ</div>
          <h1 className="text-lg font-bold text-white leading-snug">{gakuchika.title}</h1>
          <p className="text-blue-100 text-[13px] mt-1">{gakuchika.tagline}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 入力フォーム */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1 h-4 bg-[#0096DF]" />
          <h2 className="text-[14px] font-medium text-[#0A3059]">中身を具体的にしていこう</h2>
        </div>
        <p className="text-[13px] text-gray-500 mb-4 px-1">
          分かる範囲でOK。空欄はAIが現実的に補ってくれます。
        </p>

        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
          {FIELDS.map((f) => (
            <div key={f.key} className="px-4 py-3.5">
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">{f.label}</label>
              <textarea
                value={inputs[f.key] || ""}
                onChange={(e) => setInputs({ ...inputs, [f.key]: e.target.value })}
                placeholder={f.ph}
                rows={2}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0096DF] resize-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="mt-5 w-full bg-[#F08300] text-white text-[15px] font-medium py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] hover:bg-[#d97600] transition-all"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              AIが作成中...
            </>
          ) : (
            <>ガクチカを完成させる<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></>
          )}
        </button>
        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        {/* 生成結果 */}
        {result && (
          <div className="mt-8 flex flex-col gap-4">
            {/* 完成本文 */}
            <div className="fade-in-up bg-white rounded border border-gray-200 overflow-hidden">
              <div className="bg-[#EAF4FB] px-4 py-2.5 flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#0A3059]">完成したガクチカ（ES用）</span>
                <button onClick={copyText} className="flex items-center gap-1 text-xs font-medium text-[#0096DF] active:scale-95 transition-transform">
                  {copied ? (
                    <><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0096DF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>コピーしました</>
                  ) : (
                    <><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="#0096DF" strokeWidth="1.8" /><path d="M5 15V5a2 2 0 012-2h10" stroke="#0096DF" strokeWidth="1.8" strokeLinecap="round" /></svg>コピー</>
                  )}
                </button>
              </div>
              <p className="px-4 py-4 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result.fullText}</p>
            </div>

            {/* 構成（STAR） */}
            <div className="fade-in-up bg-white rounded border border-gray-200 px-4 py-4" style={{ animationDelay: "0.08s" }}>
              <p className="text-[13px] font-medium text-[#0A3059] mb-3">構成（STAR）</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { k: "状況", v: result.structure?.situation },
                  { k: "課題", v: result.structure?.task },
                  { k: "行動", v: result.structure?.action },
                  { k: "結果", v: result.structure?.result },
                ].map((x) => (
                  <div key={x.k} className="flex gap-3">
                    <span className="text-[11px] font-medium text-white bg-[#0A3059] rounded-sm px-2 py-0.5 h-fit shrink-0">{x.k}</span>
                    <span className="text-[13px] text-gray-700 leading-relaxed">{x.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* アピールポイント */}
            <div className="fade-in-up bg-white rounded border border-gray-200 px-4 py-4" style={{ animationDelay: "0.16s" }}>
              <p className="text-[13px] font-medium text-[#0A3059] mb-2.5">この経験が示す強み</p>
              <div className="flex flex-wrap gap-2">
                {result.appealPoints?.map((p, i) => (
                  <span key={i} className="text-[13px] text-[#0096DF] border border-[#9fd3ef] bg-[#EAF4FB] rounded-full px-3 py-1">{p}</span>
                ))}
              </div>
            </div>

            {/* 想定質問 */}
            <div className="fade-in-up bg-white rounded border border-gray-200 px-4 py-4" style={{ animationDelay: "0.24s" }}>
              <p className="text-[13px] font-medium text-[#0A3059] mb-2.5">面接で聞かれそうな質問</p>
              <div className="flex flex-col gap-2">
                {result.interviewQs?.map((q, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[#0096DF] text-sm shrink-0">Q.</span>
                    <p className="text-[13px] text-gray-700 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={generate}
              className="mt-1 w-full text-center py-3.5 border border-gray-300 rounded text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              別のパターンで作り直す
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
