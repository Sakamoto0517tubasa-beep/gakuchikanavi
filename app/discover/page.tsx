"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postAI } from "@/lib/fetchAI";

type Candidate = {
  source: string;
  title: string;
  strength: string;
  why: string;
  howToDeepen: string;
};

type DigResponse = {
  done: boolean;
  question?: string;
  intro?: string;
  candidates?: Candidate[];
};

const FIRST_Q = "まず教えてください。学生生活で、一番時間やエネルギーを使っていることは何ですか？（アルバイト・サークル・勉強・趣味・習慣など、何でもOK）";
const MAX_TURNS = 6; // だいたいこのくらいで候補出しに入る

export default function DiscoverPage() {
  const router = useRouter();
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [currentQ, setCurrentQ] = useState(FIRST_Q);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ intro: string; candidates: Candidate[] } | null>(null);
  const [error, setError] = useState("");

  function send(nh: { q: string; a: string }[], finish: boolean) {
    setHistory(nh);
    setInput("");
    setError("");
    setLoading(true);
    // 候補生成フェーズ（時間がかかるのでメッセージを変える）
    if (finish || nh.length >= 5) setGenerating(true);

    postAI<DigResponse>(
      "/api/discover",
      {
        history: nh,
        finish,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
      },
      { retries: 4, onRetry: () => setRetrying(true) }
    )
      .then((d) => {
        if (d.done && d.candidates) {
          setResult({ intro: d.intro || "", candidates: d.candidates });
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
        } else if (d.question) {
          setCurrentQ(d.question);
          setGenerating(false);
        } else {
          throw new Error();
        }
      })
      .catch(() => setError("うまく処理できませんでした。もう一度お試しください。"))
      .finally(() => { setLoading(false); setRetrying(false); });
  }

  function submit() {
    if (!input.trim() || loading) return;
    send([...history, { q: currentQ, a: input.trim() }], false);
  }

  function finishNow() {
    if (loading) return;
    const nh = input.trim() ? [...history, { q: currentQ, a: input.trim() }] : history;
    if (nh.length === 0) return;
    send(nh, true);
  }

  function develop(c: Candidate) {
    sessionStorage.setItem("selectedGakuchika", JSON.stringify({
      title: c.title,
      tagline: c.strength,
      reason: c.why,
      howToStart: c.howToDeepen,
      script: "",
      period: "",
    }));
    sessionStorage.setItem("fromDiscover", JSON.stringify({ source: c.source }));
    router.push("/build");
  }

  // ===== 結果 =====
  if (result) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] pb-16">
        <div className="bg-[#0A3059]">
          <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
            <h1 className="text-xl font-bold text-white leading-snug">あなたの話から<br />見つかったガクチカ</h1>
            {result.intro && <p className="text-blue-100 text-[13px] mt-2 leading-relaxed">{result.intro}</p>}
            <p className="text-blue-100 text-[12px] mt-2 leading-relaxed bg-white/10 rounded px-3 py-2">
              気になるものを選ぶと、AIが<span className="text-white font-medium">「なぜ・どんな思いで取り組んだか」</span>まで一緒に深掘りします。
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-3">
            {result.candidates.map((c, i) => (
              <div key={i} className="fade-in-up bg-white border border-gray-200 rounded px-5 py-4" style={{ animationDelay: `${0.06 * (i + 1)}s` }}>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-[#0096DF] bg-[#EAF4FB] border border-[#9fd3ef] rounded-full px-2.5 py-0.5 mb-2">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#0096DF"><path d="M12 2l2.4 7.4H22l-6 4.3 2.3 7.3L12 16.8 5.7 21l2.3-7.3-6-4.3h7.6L12 2z" /></svg>
                  {c.source}
                </div>
                <p className="text-base font-bold text-gray-900 leading-snug">{c.title}</p>
                <p className="text-[13px] text-[#0096DF] font-medium mt-1.5">強み：{c.strength}</p>
                <div className="mt-3">
                  <p className="text-[12px] font-medium text-gray-500 mb-1">なぜガクチカになるのか</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.why}</p>
                </div>
                {c.howToDeepen && (
                  <div className="mt-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">次に掘ると良いこと</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{c.howToDeepen}</p>
                  </div>
                )}
                <button
                  onClick={() => develop(c)}
                  className="mt-4 w-full bg-[#F08300] text-white text-[15px] font-medium py-3 rounded flex items-center justify-center gap-1.5 active:scale-[0.99] hover:bg-[#d97600] transition-all"
                >
                  「なぜ？」から深めてガクチカにする
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setResult(null); setHistory([]); setCurrentQ(FIRST_Q); }}
            className="mt-6 w-full text-[13px] text-gray-500 hover:text-gray-700 py-2"
          >
            ← もう一度、ヒアリングから見つける
          </button>
        </div>
      </main>
    );
  }

  // ===== 候補生成中 =====
  if (generating && loading) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#0096DF] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#0A3059] font-bold text-lg">AIがガクチカを探しています</p>
          <p className="text-sm mt-2" style={{ color: retrying ? "#EA6C00" : "#6b7785" }}>
            {retrying ? "混み合っています。自動で再試行中です…" : "あなたの話の中から、ガクチカの種を見つけています…"}
          </p>
        </div>
      </main>
    );
  }

  // ===== ヒアリング（対話） =====
  const turn = history.length + 1;
  return (
    <main className="min-h-screen bg-[#EEF1F5] pb-16">
      <div className="bg-[#0A3059]">
        <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
          <button onClick={() => router.back()} className="text-blue-200 text-[13px] mb-3 flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#bcd4ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            戻る
          </button>
          <h1 className="text-xl font-bold text-white leading-snug">今ある経験から<br />ガクチカを見つける</h1>
          <p className="text-blue-100 text-[13px] mt-2 leading-relaxed">
            AIがいくつか質問します。思い出しながら、そのまま話すように答えてください。あなたの話の中から、ガクチカの種を見つけます。
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-[12px] text-gray-500 mb-4">ヒアリング {turn} 問目（5〜6問で見つかります）</p>

        {/* これまでのやり取り */}
        {history.length > 0 && (
          <div className="flex flex-col gap-3 mb-5">
            {history.map((h, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" strokeLinejoin="round" /></svg>
                  </span>
                  <p className="text-[13px] text-gray-500 leading-relaxed flex-1">{h.q}</p>
                </div>
                <div className="bg-[#0096DF] text-white text-[13px] rounded-lg rounded-tr-sm px-3.5 py-2 ml-auto max-w-[85%] leading-relaxed whitespace-pre-wrap">{h.a}</div>
              </div>
            ))}
          </div>
        )}

        {/* 現在の質問 */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-5">
          <div className="flex gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.8"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" strokeLinejoin="round" /></svg>
            </span>
            <p className="text-[16px] font-bold text-[#0A3059] leading-snug flex-1 pt-1">{currentQ}</p>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="そのまま話すように書いてください（例：居酒屋のバイトで、新人の教育をよく任される）"
            rows={3}
            disabled={loading}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 leading-relaxed focus:outline-none focus:border-[#0096DF] resize-none disabled:bg-gray-50"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        <button
          onClick={submit}
          disabled={loading || !input.trim()}
          className="mt-4 w-full bg-[#F08300] text-white text-[15px] font-medium py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] hover:bg-[#d97600] transition-all"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{retrying ? "混み合っています。再試行中…" : "考え中..."}</>
          ) : (
            <>答える<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></>
          )}
        </button>
        {history.length >= 3 && !loading && (
          <button
            onClick={finishNow}
            className="mt-2 w-full text-[12px] text-gray-500 hover:text-gray-700 py-1.5"
          >
            もう十分話した → ガクチカを見つけてもらう
          </button>
        )}
      </div>
    </main>
  );
}
