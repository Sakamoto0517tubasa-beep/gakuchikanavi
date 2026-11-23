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

// 日常を聞く質問（本人の実体験を引き出す）
const QUESTIONS = [
  {
    key: "immerse",
    text: "最近、時間を忘れて没頭したことは？",
    hint: "趣味・ゲーム・制作など何でも",
    examples: ["好きなゲームの攻略", "動画・画像の編集", "絵やイラスト", "推しの応援・遠征"],
  },
  {
    key: "thanks",
    text: "人から「ありがとう」「助かった」と言われたことは？",
    hint: "小さなことでOK",
    examples: ["後輩に教えた", "バイトでミスをカバー", "友達の相談に乗った", "イベントを手伝った"],
  },
  {
    key: "relied",
    text: "誰かに頼られたり、相談されたりすることは？",
    hint: "よく任される役回りなど",
    examples: ["恋愛・進路の相談", "勉強を教える", "幹事・まとめ役", "LINEグループの管理"],
  },
  {
    key: "continue",
    text: "めんどくさいけど、なんだかんだ続けていることは？",
    hint: "習慣・ルーティン",
    examples: ["毎日の筋トレ", "ほぼ皆勤", "家計簿・貯金", "SNSの毎日投稿"],
  },
  {
    key: "improve",
    text: "自分なりに工夫して「ちょっと良くした」ことは？",
    hint: "効率化・改善など",
    examples: ["バイトの段取り改善", "勉強法を変えた", "シフト調整の工夫", "持ち物の整理術"],
  },
  {
    key: "proud",
    text: "こだわっていること・ちょっと誇れることは？",
    hint: "マイルール・特技",
    examples: ["節約術", "時間を必ず守る", "整理整頓", "人の名前を覚える"],
  },
  {
    key: "other",
    text: "その他、力を入れていること・ハマっていることは？（任意）",
    hint: "上に当てはまらないこと",
    examples: ["アルバイト", "サークル・部活", "ゼミ・研究", "ボランティア"],
  },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ intro: string; candidates: Candidate[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState("");

  const q = QUESTIONS[step];
  const current = answers[q.key] || "";
  const isLast = step === QUESTIONS.length - 1;
  const progress = Math.round(((step + 1) / QUESTIONS.length) * 100);
  const answeredCount = Object.values(answers).filter((a) => a.trim()).length;

  function setCurrent(v: string) {
    setAnswers((prev) => ({ ...prev, [q.key]: v }));
  }

  function addExample(ex: string) {
    const v = current.trim();
    setCurrent(v ? `${v}、${ex}` : ex);
  }

  function next() {
    if (isLast) {
      discover();
    } else {
      setStep((s) => s + 1);
    }
  }

  function discover() {
    if (answeredCount === 0) {
      setError("1つでも書いてから進んでください");
      return;
    }
    setLoading(true);
    setError("");
    const payload = QUESTIONS.map((qq) => ({ q: qq.text, a: answers[qq.key] || "" }));
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

  // ===== 結果画面 =====
  if (result) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] pb-16">
        <div className="bg-[#0A3059]">
          <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
            <h1 className="text-xl font-bold text-white leading-snug">あなたの経験から<br />見つかったガクチカ</h1>
            {result.intro && <p className="text-blue-100 text-[13px] mt-2 leading-relaxed">{result.intro}</p>}
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
                  このガクチカを深める
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setResult(null); setStep(0); }}
            className="mt-6 w-full text-[13px] text-gray-500 hover:text-gray-700 py-2"
          >
            ← もう一度、質問に答えて見つける
          </button>
        </div>
      </main>
    );
  }

  // ===== 質問画面 =====
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
            いくつかの質問に答えるだけ。些細なことでOK。あなたが書いたことをもとに、AIがガクチカの種を見つけます。
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 進捗 */}
        <div className="mb-5">
          <div className="flex justify-between text-[12px] text-gray-500 mb-1.5">
            <span>質問 {step + 1} / {QUESTIONS.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-[#0096DF] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* 質問 */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-5">
          <h2 className="text-[17px] font-bold text-[#0A3059] leading-snug">{q.text}</h2>
          <p className="text-[12px] text-gray-500 mt-1">{q.hint}</p>

          <textarea
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="思いつくことを書いてみてください（空欄で次へ進んでもOK）"
            rows={3}
            className="mt-3 w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 leading-relaxed focus:outline-none focus:border-[#0096DF] resize-none"
          />

          {/* 例（タップで入力） */}
          <div className="mt-3">
            <p className="text-[11px] text-gray-400 mb-1.5">例（タップで入力）</p>
            <div className="flex flex-wrap gap-1.5">
              {q.examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => addExample(ex)}
                  className="text-[12px] text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 hover:border-[#0096DF] hover:text-[#0096DF] transition-colors"
                >
                  ＋ {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        {/* 操作ボタン */}
        <button
          onClick={next}
          disabled={loading}
          className="mt-5 w-full bg-[#F08300] text-white text-[15px] font-medium py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] hover:bg-[#d97600] transition-all"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{retrying ? "混み合っています。再試行中…" : "AIが発掘中..."}</>
          ) : isLast ? (
            <>ガクチカを見つける<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></>
          ) : (
            <>次へ<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></>
          )}
        </button>

        {!isLast && (
          <button onClick={() => setStep((s) => s + 1)} disabled={loading} className="mt-2 w-full text-[13px] text-gray-500 hover:text-gray-700 py-2">
            この質問はスキップ
          </button>
        )}
        {isLast && (
          <p className="text-[11px] text-gray-400 text-center mt-3">これまでに {answeredCount} 問 記入しました</p>
        )}
      </div>
    </main>
  );
}
