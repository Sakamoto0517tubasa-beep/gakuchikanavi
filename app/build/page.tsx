"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { saveGakuchika } from "@/lib/storage";
import { postAI } from "@/lib/fetchAI";

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
  structure: { motivation: string; situation: string; task: string; action: string; result: string };
  appealPoints: string[];
  interviewQs: string[];
};

type QualityAxis = { key: string; name: string; score: number; comment: string };
type Quality = { total: number; summary: string; axes: QualityAxis[] };

const AXIS_FIX: Record<string, string> = {
  motivation: "なぜ取り組んだのか（動機・原体験・価値観）をさらに深く掘り下げ、冒頭と締めに反映して書き直して",
  concreteness: "具体的な行動の中身と、成果を示す数字をもっと加えて書き直して",
  learning: "この経験から得た学びと、それが今後どう活きるかを具体的に加えて書き直して",
  coherence: "動機から状況・行動・結果・学びまでが一本の筋で通るように整えて書き直して",
  originality: "ありきたりな表現を避け、自分らしさ・個性が伝わる具体的なエピソードを加えて書き直して",
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
  const [refineReq, setRefineReq] = useState("");
  const [refining, setRefining] = useState(false);
  const [quality, setQuality] = useState<Quality | null>(null);
  const [qLoading, setQLoading] = useState(false);
  const [digHistory, setDigHistory] = useState<{ q: string; a: string }[]>([]);
  const [digQ, setDigQ] = useState<string | null>(null);
  const [digInput, setDigInput] = useState("");
  const [digLoading, setDigLoading] = useState(false);
  const [digStarted, setDigStarted] = useState(false);
  const [digDone, setDigDone] = useState(false);
  const [fromDiscover, setFromDiscover] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("selectedGakuchika");
    if (!raw) {
      router.replace("/result");
      return;
    }
    const parsed = JSON.parse(raw) as Suggestion;
    setGakuchika(parsed);
    // 発掘から来た場合は、まず「なぜ？」のヒアリング（壁打ち）を自動で始める
    if (sessionStorage.getItem("fromDiscover")) {
      sessionStorage.removeItem("fromDiscover");
      setFromDiscover(true);
      startDig(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function generate() {
    setLoading(true);
    setError("");
    setQuality(null);
    postAI<Developed>(
      "/api/develop",
      {
        gakuchika,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
        grade: sessionStorage.getItem("grade") || "",
        inputs,
        dialogue: digHistory,
      },
      { retries: 4 }
    )
      .then((d) => {
        setResult(d);
        if (gakuchika) {
          saveGakuchika({
            id: (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
            date: new Date().toISOString(),
            title: gakuchika.title,
            fullText: d.fullText,
            structure: d.structure,
            appealPoints: d.appealPoints,
            interviewQs: d.interviewQs,
            industry: sessionStorage.getItem("industry") || "",
            jobType: sessionStorage.getItem("jobType") || "",
          });
        }
        setTimeout(() => window.scrollTo({ top: 9999, behavior: "smooth" }), 100);
      })
      .catch(() => setError("生成に失敗しました。もう一度お試しください。"))
      .finally(() => setLoading(false));
  }

  function refine(req: string) {
    if (!result || !req.trim() || refining) return;
    setRefining(true);
    fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullText: result.fullText,
        request: req,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.fullText) throw new Error();
        setResult({ ...result, fullText: d.fullText });
        setRefineReq("");
      })
      .catch(() => setError("書き直しに失敗しました。もう一度お試しください。"))
      .finally(() => setRefining(false));
  }

  function runQuality(text?: string) {
    const target = text ?? result?.fullText;
    if (!target) return Promise.resolve();
    setError("");
    setQLoading(true);
    return fetch("/api/quality", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullText: target,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
      }),
    })
      .then((r) => r.json())
      .then((d) => { if (d.error || !d.axes) throw new Error(); setQuality(d); })
      .catch(() => setError("品質診断に失敗しました。もう一度お試しください。"))
      .finally(() => setQLoading(false));
  }

  function strengthenAxis(key: string) {
    if (!result || refining) return;
    setError("");
    setRefining(true);
    fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullText: result.fullText,
        request: AXIS_FIX[key] ?? "もっと良くして",
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.fullText) throw new Error();
        const nf = d.fullText as string;
        setResult((r) => (r ? { ...r, fullText: nf } : r));
        return runQuality(nf);
      })
      .catch(() => setError("強化に失敗しました。もう一度お試しください。"))
      .finally(() => setRefining(false));
  }

  function fetchDig(history: { q: string; a: string }[], gk: Suggestion | null = gakuchika) {
    setDigLoading(true);
    setError("");
    return fetch("/api/dig", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gakuchika: gk, history }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.question) throw new Error();
        if (d.done) { setDigDone(true); setDigQ(null); }
        else setDigQ(d.question);
      })
      .catch(() => setError("壁打ちの質問取得に失敗しました。もう一度お試しください。"))
      .finally(() => setDigLoading(false));
  }

  function startDig(gk: Suggestion | null = gakuchika) {
    setDigStarted(true);
    setDigHistory([]);
    setDigDone(false);
    fetchDig([], gk);
  }

  function submitDig() {
    if (!digInput.trim() || !digQ || digLoading) return;
    const nh = [...digHistory, { q: digQ, a: digInput.trim() }];
    setDigHistory(nh);
    setDigInput("");
    fetchDig(nh);
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
        {fromDiscover && (
          <div className="fade-in-up bg-[#EAF4FB] border border-[#9fd3ef] rounded px-4 py-3 mb-5 flex items-start gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.8" className="shrink-0 mt-0.5"><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" strokeLinejoin="round" /><path d="M9 21h6M10 17v4M14 17v4" strokeLinecap="round" /></svg>
            <p className="text-[13px] text-[#0A3059] leading-relaxed">
              見つけた経験を本物のガクチカにするために、まず<span className="font-medium">「なぜそれに取り組んだ(続けている)のか」</span>をAIと一緒に深掘りしましょう。
            </p>
          </div>
        )}
        {/* なぜ取り組むのか（動機・原体験）= 最重要 */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1 h-4 bg-[#F08300]" />
          <h2 className="text-[14px] font-medium text-[#0A3059]">まず「なぜ」から考えよう</h2>
        </div>
        <div className="bg-white rounded border border-[#F3C48A] overflow-hidden mb-6">
          <div className="bg-[#FDF3E7] px-4 py-2.5">
            <p className="text-[12px] text-[#9A5A17] leading-relaxed">
              面接官が本当に知りたいのは「何をしたか」より<span className="font-bold">「なぜそれに取り組んだのか」</span>。ここが深いほど、あなただけのガクチカになります。
            </p>
          </div>
          <div className="px-4 py-3.5">
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              なぜこの活動に取り組むのか（きっかけ・原体験）
            </label>
            <textarea
              value={inputs.motivation || ""}
              onChange={(e) => setInputs({ ...inputs, motivation: e.target.value })}
              placeholder="例：高校時代に自分が人見知りで損をした経験から、同じ思いをする人を減らしたいと思った"
              rows={3}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#F08300] resize-none"
            />
            <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
              うまく言葉にできなくてもOK。断片的なきっかけを書けば、AIが一緒に深掘りします。
            </p>
          </div>
        </div>

        {/* AI壁打ち */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1 h-4 bg-[#F08300]" />
          <h2 className="text-[14px] font-medium text-[#0A3059]">AIと壁打ちして深める（おすすめ）</h2>
        </div>
        <div className="bg-white rounded border border-gray-200 overflow-hidden mb-6">
          {!digStarted ? (
            <div className="px-4 py-4 text-center">
              <p className="text-[13px] text-gray-600 mb-3 leading-relaxed">
                AIが1問ずつ質問します。答えるうちに、自分でも気づいていなかった<span className="font-medium text-[#0A3059]">動機やエピソード</span>が引き出され、ガクチカが一気に深まります。
              </p>
              <button onClick={() => startDig()} disabled={digLoading}
                className="inline-flex items-center justify-center gap-2 bg-[#0096DF] text-white text-sm font-medium px-6 py-2.5 rounded active:scale-95 transition-transform disabled:opacity-50">
                {digLoading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />準備中...</> : "壁打ちを始める"}
              </button>
            </div>
          ) : (
            <div className="px-4 py-4">
              {/* これまでのやり取り */}
              {digHistory.length > 0 && (
                <div className="flex flex-col gap-3 mb-4">
                  {digHistory.map((h, i) => (
                    <div key={i}>
                      <div className="flex gap-2 mb-1">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-[#EAF4FB] flex items-center justify-center text-[11px] font-medium text-[#0096DF]">Q</span>
                        <p className="text-[13px] text-gray-700 pt-0.5">{h.q}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-[#FDF3E7] flex items-center justify-center text-[11px] font-medium text-[#EA6C00]">A</span>
                        <p className="text-[13px] text-gray-500 pt-0.5 whitespace-pre-wrap">{h.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {digDone ? (
                <div className="bg-[#EAF4FB] rounded px-3 py-3 text-center">
                  <p className="text-[13px] font-medium text-[#0A3059]">壁打ちで{digHistory.length}つの材料が集まりました</p>
                  <p className="text-[12px] text-gray-500 mt-1">この内容を反映してガクチカを作成します。下の「ガクチカを完成させる」へ。</p>
                </div>
              ) : digLoading && !digQ ? (
                <div className="flex items-center gap-2 text-gray-400 text-[13px] py-2">
                  <span className="w-4 h-4 border-2 border-[#0096DF] border-t-transparent rounded-full animate-spin" />AIが次の質問を考えています...
                </div>
              ) : digQ ? (
                <div>
                  <div className="bg-[#F7F9FB] border border-gray-100 rounded px-3 py-2.5 mb-2.5">
                    <p className="text-[14px] text-[#0A3059] font-medium leading-relaxed">{digQ}</p>
                  </div>
                  <textarea
                    value={digInput}
                    onChange={(e) => setDigInput(e.target.value)}
                    placeholder="思いつくまま書いてOK。短くても大丈夫です。"
                    rows={2}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0096DF] resize-none"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={submitDig} disabled={digLoading || !digInput.trim()}
                      className="bg-[#0096DF] text-white text-sm font-medium px-5 py-2 rounded active:scale-95 transition-transform disabled:bg-gray-300">
                      {digLoading ? "…" : "答える"}
                    </button>
                    <button onClick={() => { setDigDone(true); setDigQ(null); }}
                      className="text-xs text-gray-400 hover:text-gray-600 ml-auto">もう十分・終える</button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* 入力フォーム */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1 h-4 bg-[#0096DF]" />
          <h2 className="text-[14px] font-medium text-[#0A3059]">中身を具体的にしていこう<span className="text-[12px] text-gray-400 font-normal">（壁打ちをしない場合はこちら）</span></h2>
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
              {/* AIに相談（深掘り） */}
              <div className="border-t border-gray-100 px-4 py-3.5 bg-[#F7F9FB]">
                <p className="text-[12px] font-medium text-[#0A3059] mb-2">AIに相談して書き直す</p>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {["もっと具体的に", "数字を強調して", "短く300字に", "結果をもっと詳しく", "別の言い回しで"].map((chip) => (
                    <button key={chip} onClick={() => refine(chip)} disabled={refining}
                      className="text-[12px] text-[#0096DF] border border-[#9fd3ef] bg-white rounded-full px-3 py-1 active:scale-95 transition-transform disabled:opacity-50">
                      {chip}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={refineReq}
                    onChange={(e) => setRefineReq(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") refine(refineReq); }}
                    placeholder="例：リーダーシップを前面に出して"
                    className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0096DF]"
                  />
                  <button onClick={() => refine(refineReq)} disabled={refining || !refineReq.trim()}
                    className="shrink-0 bg-[#0096DF] text-white text-sm font-medium px-4 rounded active:scale-95 transition-transform disabled:bg-gray-300">
                    {refining ? "…" : "相談"}
                  </button>
                </div>
                {refining && <p className="text-[12px] text-gray-400 mt-2">AIが書き直しています...</p>}
              </div>
            </div>

            {/* ガクチカ品質診断 */}
            <div className="fade-in-up bg-white rounded border border-gray-200 overflow-hidden" style={{ animationDelay: "0.04s" }}>
              <div className="bg-[#0A3059] px-4 py-2.5 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M3 13a9 9 0 1118 0" /><path d="M12 13l4-3" strokeLinecap="round" /></svg>
                <span className="text-[13px] font-medium text-white">ガクチカ品質診断</span>
              </div>
              {!quality ? (
                <div className="px-4 py-5 text-center">
                  <p className="text-[13px] text-gray-500 mb-3">このガクチカの強さを5つの観点でAIが採点します。</p>
                  <button onClick={() => runQuality()} disabled={qLoading}
                    className="inline-flex items-center justify-center gap-2 bg-[#0096DF] text-white text-sm font-medium px-6 py-2.5 rounded active:scale-95 transition-transform disabled:opacity-50">
                    {qLoading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />採点中...</> : "品質を診断する"}
                  </button>
                </div>
              ) : (
                <div className="px-4 py-4">
                  <div className="flex items-end gap-3 mb-1">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-bold text-[#0A3059] tabular-nums">{quality.total}</span>
                      <span className="text-sm text-gray-400 font-medium">/ 100点</span>
                    </div>
                    {qLoading && <span className="w-4 h-4 border-2 border-[#0096DF] border-t-transparent rounded-full animate-spin mb-1.5" />}
                  </div>
                  <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">{quality.summary}</p>
                  <div className="flex flex-col gap-3">
                    {quality.axes?.map((a) => {
                      const col = a.score >= 16 ? "#2E9E6B" : a.score >= 12 ? "#0096DF" : "#EA6C00";
                      return (
                        <div key={a.key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[13px] font-medium text-gray-800">{a.name}</span>
                            <span className="text-[12px] font-medium tabular-nums" style={{ color: col }}>{a.score}/20</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                            <div className="h-full rounded-full" style={{ width: `${(a.score / 20) * 100}%`, backgroundColor: col }} />
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[12px] text-gray-500 leading-relaxed flex-1">{a.comment}</p>
                            {a.score < 16 && (
                              <button onClick={() => strengthenAxis(a.key)} disabled={refining}
                                className="shrink-0 text-[11px] font-medium text-[#EA6C00] border border-[#F3C48A] bg-[#FDF3E7] rounded px-2 py-1 active:scale-95 transition-transform disabled:opacity-50">
                                この軸を強化
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {refining && <p className="text-[12px] text-gray-400 mt-3">AIが本文を強化しています...</p>}
                  <button onClick={() => runQuality()} disabled={qLoading || refining}
                    className="mt-4 w-full text-center py-2.5 border border-gray-300 rounded text-[13px] font-medium text-gray-600 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all disabled:opacity-50">
                    もう一度採点する
                  </button>
                </div>
              )}
            </div>

            {/* 構成（動機＋STAR） */}
            <div className="fade-in-up bg-white rounded border border-gray-200 px-4 py-4" style={{ animationDelay: "0.08s" }}>
              <p className="text-[13px] font-medium text-[#0A3059] mb-3">構成（動機 ＋ STAR）</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { k: "動機", v: result.structure?.motivation, hl: true },
                  { k: "状況", v: result.structure?.situation },
                  { k: "課題", v: result.structure?.task },
                  { k: "行動", v: result.structure?.action },
                  { k: "結果", v: result.structure?.result },
                ].map((x) => (
                  <div key={x.k} className="flex gap-3">
                    <span className={`text-[11px] font-medium text-white rounded-sm px-2 py-0.5 h-fit shrink-0 ${x.hl ? "bg-[#F08300]" : "bg-[#0A3059]"}`}>{x.k}</span>
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
