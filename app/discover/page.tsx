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

// 実体験を問う20問（具体的な行動ベース）。頻度4択で答える
const QUESTIONS = [
  "人に何かを教えたり、やり方を説明したりすることは？",
  "友達や周りの人から、相談を受けることは？",
  "グループやイベントで、まとめ役・幹事をやることは？",
  "めんどくさいことでも、コツコツ続けていることは？",
  "自分なりに工夫して、作業や生活を効率化することは？",
  "お金のやりくり・節約・貯金を意識してやることは？",
  "SNS・動画・ブログなどで発信・投稿することは？",
  "何かを自分でゼロから作ること（制作・開発・企画）は？",
  "新しいことに、自分から挑戦することは？",
  "苦手なことを克服しようと努力することは？",
  "アルバイトで、言われた以上のことをやる・改善を提案することは？",
  "目標を決めて、計画的に取り組むことは？",
  "困っている人を手助けすることは？",
  "細かい作業を、正確に・丁寧にやりきることは？",
  "人を巻き込んで、何かを一緒に進めることは？",
  "調べ物やデータ整理など、情報を集めてまとめることは？",
  "大会・コンテスト・発表など、人前で成果を出す場に挑むことは？",
  "家族の手伝い・家事・家業を担うことは？",
  "趣味や特技を、本気で極めようとすることは？",
  "失敗しても、原因を考えて立て直すことは？",
];

const CHOICES = [
  { label: "よくある", color: "#0096DF", bg: "#EAF4FB", border: "#9fd3ef" },
  { label: "たまにある", color: "#0A3059", bg: "#F2F6FA", border: "#c7d6e6" },
  { label: "あまりない", color: "#6b7785", bg: "#F5F6F8", border: "#d8dde3" },
  { label: "まったくない", color: "#9aa5b1", bg: "#F7F8FA", border: "#e2e6ea" },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ intro: string; candidates: Candidate[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState("");

  const progress = Math.round((step / QUESTIONS.length) * 100);

  function select(label: string) {
    const nextAnswers = { ...answers, [step]: label };
    setAnswers(nextAnswers);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      discover(nextAnswers);
    }
  }

  function discover(all: Record<number, string>) {
    setLoading(true);
    setError("");
    const payload = QUESTIONS.map((q, i) => ({ q, a: all[i] || "まったくない" }));
    postAI<{ intro: string; candidates: Candidate[] }>(
      "/api/discover",
      {
        answers: payload,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
      },
      { retries: 4, onRetry: () => setRetrying(true) }
    )
      .then((d) => {
        if (!d.candidates) throw new Error();
        setResult(d);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      })
      .catch(() => setError("発掘に失敗しました。もう一度お試しください。"))
      .finally(() => { setLoading(false); setRetrying(false); });
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

  // ===== ローディング =====
  if (loading) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#0096DF] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#0A3059] font-bold text-lg">AIが発掘中</p>
          <p className="text-sm mt-2" style={{ color: retrying ? "#EA6C00" : "#6b7785" }}>
            {retrying ? "混み合っています。自動で再試行中です…" : "あなたの経験からガクチカを探しています…"}
          </p>
        </div>
      </main>
    );
  }

  // ===== 結果 =====
  if (result) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] pb-16">
        <div className="bg-[#0A3059]">
          <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
            <h1 className="text-xl font-bold text-white leading-snug">あなたの経験から<br />見つかったガクチカ</h1>
            {result.intro && <p className="text-blue-100 text-[13px] mt-2 leading-relaxed">{result.intro}</p>}
            <p className="text-blue-100 text-[12px] mt-2 leading-relaxed bg-white/10 rounded px-3 py-2">
              気になるものを選ぶと、AIが<span className="text-white font-medium">「なぜ取り組んでいるのか」</span>を一緒に深掘りします。ガクチカは“何をしたか”より“なぜ”が大事です。
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
            onClick={() => { setResult(null); setStep(0); setAnswers({}); }}
            className="mt-6 w-full text-[13px] text-gray-500 hover:text-gray-700 py-2"
          >
            ← もう一度、質問に答えて見つける
          </button>
        </div>
      </main>
    );
  }

  // ===== 質問 =====
  return (
    <main className="min-h-screen bg-[#EEF1F5] pb-16">
      <div className="bg-[#0A3059]">
        <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
          <button onClick={() => (step === 0 ? router.back() : setStep((s) => s - 1))} className="text-blue-200 text-[13px] mb-3 flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#bcd4ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            戻る
          </button>
          <h1 className="text-xl font-bold text-white leading-snug">今ある経験から<br />ガクチカを見つける</h1>
          <p className="text-blue-100 text-[13px] mt-2 leading-relaxed">
            日常の「やってること」に答えるだけ。些細なことでOK。よくやっていることほど、あなただけのガクチカになります。
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 進捗 */}
        <div className="mb-6">
          <div className="flex justify-between text-[12px] text-gray-500 mb-1.5">
            <span>質問 {step + 1} / {QUESTIONS.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-[#0096DF] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* 質問 */}
        <p className="text-[12px] tracking-widest text-gray-500 mb-2">こんなこと、どれくらいある？</p>
        <h2 className="text-[19px] font-bold text-[#0A3059] mb-6 leading-relaxed">{QUESTIONS[step]}</h2>

        {/* 頻度4択 */}
        <div className="flex flex-col gap-2.5">
          {CHOICES.map((c) => (
            <button
              key={c.label}
              onClick={() => select(c.label)}
              className="w-full text-left px-5 py-4 rounded border font-medium transition-all active:scale-[0.99]"
              style={{
                color: answers[step] === c.label ? "#fff" : c.color,
                backgroundColor: answers[step] === c.label ? c.color : c.bg,
                borderColor: answers[step] === c.label ? c.color : c.border,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </main>
  );
}
