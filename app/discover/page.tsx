"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Prompt = {
  category: string;
  title: string;
  question: string;
  strength: string;
};

const EXP_OPTIONS = [
  "アルバイト",
  "サークル・部活",
  "ゼミ・研究・勉強",
  "趣味・ハマっていること",
  "ゲーム・推し活・SNS",
  "毎日続けている習慣",
  "節約・お金のやりくり",
  "友達の相談役・人間関係",
  "家族・家事の手伝い",
  "苦手なことの克服",
  "失敗・挫折からの立ち直り",
  "委員会・学校行事",
  "ボランティア・地域活動",
  "一人旅・旅行",
];

export default function DiscoverPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState("");
  const [result, setResult] = useState<{ intro: string; prompts: Prompt[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggle(opt: string) {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]));
  }

  function discover() {
    if (selected.length === 0 && !detail.trim()) return;
    setLoading(true);
    setError("");
    fetch("/api/discover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experiences: selected,
        detail,
        industry: sessionStorage.getItem("industry") || "",
        jobType: sessionStorage.getItem("jobType") || "",
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.prompts) throw new Error();
        setResult(d);
        setTimeout(() => window.scrollTo({ top: 9999, behavior: "smooth" }), 100);
      })
      .catch(() => setError("発掘に失敗しました。もう一度お試しください。"))
      .finally(() => setLoading(false));
  }

  function develop(p: Prompt) {
    sessionStorage.setItem("selectedGakuchika", JSON.stringify({
      title: p.title,
      tagline: p.strength,
      reason: "",
      howToStart: "",
      script: "",
      period: "",
    }));
    sessionStorage.setItem("fromDiscover", JSON.stringify({ source: p.category }));
    router.push("/build");
  }

  const canSubmit = selected.length > 0 || detail.trim().length > 0;

  return (
    <main className="min-h-screen bg-[#EEF1F5] pb-16">
      {/* ヘッダー */}
      <div className="bg-[#0A3059]">
        <div className="max-w-2xl mx-auto px-5 pt-11 pb-6">
          <button onClick={() => router.back()} className="text-blue-200 text-[13px] mb-3 flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#bcd4ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            戻る
          </button>
          <h1 className="text-xl font-bold text-white leading-snug">今ある経験から<br />ガクチカを見つける</h1>
          <p className="text-blue-100 text-[13px] mt-2 leading-relaxed">
            「こんなの大したことない」と思っている些細な経験こそ、実はあなただけのガクチカになります。毎日の習慣でも、ゲームでも、友達の相談役でも何でもOK。
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 経験の選択 */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1 h-4 bg-[#0096DF]" />
          <h2 className="text-[14px] font-medium text-[#0A3059]">当てはまるものを選ぶ（複数OK）</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {EXP_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-3 py-3 rounded border text-[13px] text-left transition-all ${
                selected.includes(opt)
                  ? "border-[#0096DF] bg-[#EAF4FB] text-[#0A3059]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* 自由記述 */}
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="w-1 h-4 bg-[#0096DF]" />
          <h2 className="text-[14px] font-medium text-[#0A3059]">具体的な内容（任意）</h2>
        </div>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="例：毎朝5時に起きて筋トレしてる／友達の恋愛相談によく乗る／ゲームのギルドをまとめてた／3年間皆勤／節約して毎月1万円貯金してる など、どんな些細なことでもOK"
          rows={4}
          className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0096DF] resize-none bg-white"
        />

        <button
          onClick={discover}
          disabled={loading || !canSubmit}
          className="mt-5 w-full bg-[#F08300] text-white text-[15px] font-medium py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] hover:bg-[#d97600] transition-all"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />AIが発掘中...</>
          ) : (
            <>ガクチカの種を見つける<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></>
          )}
        </button>
        {!canSubmit && <p className="text-[12px] text-gray-400 text-center mt-2.5">1つ以上選ぶか、内容を記入してください</p>}
        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        {/* 結果 */}
        {result && (
          <div className="mt-8">
            {result.intro && (
              <div className="fade-in-up bg-white border border-gray-200 rounded px-5 py-4 mb-4 flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.8"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" strokeLinejoin="round" /></svg>
                </span>
                <p className="text-[15px] font-medium text-gray-900 leading-snug">{result.intro}</p>
              </div>
            )}
            <p className="text-[12px] text-gray-500 mb-3 px-1 leading-relaxed">
              下の中で<span className="font-medium text-[#0A3059]">「あ、それならやってるかも」</span>と思うものを選んでください。その経験の中身はこの後あなた自身が教えてください（AIが勝手に作ったりしません）。
            </p>
            <div className="flex flex-col gap-2.5">
              {result.prompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => develop(p)}
                  className="fade-in-up w-full text-left bg-white border border-gray-200 rounded px-4 py-3.5 active:bg-gray-50 hover:border-[#9fd3ef] transition-all"
                  style={{ animationDelay: `${0.05 * (i + 1)}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-[10px] text-[#0096DF] bg-[#EAF4FB] border border-[#9fd3ef] rounded-full px-2 py-0.5 mb-1.5">{p.category}</span>
                      <p className="text-[14px] font-medium text-gray-900 leading-snug">{p.question}</p>
                      <p className="text-[12px] text-[#0096DF] mt-1.5">→ 表れる強み：{p.strength}</p>
                    </div>
                    <span className="shrink-0 self-center text-[12px] font-medium text-[#F08300] flex items-center gap-0.5">
                      ある<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#F08300" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-4">ピンとくるものが無ければ、上で経験を追加して「もう一度見つける」</p>
          </div>
        )}
      </div>
    </main>
  );
}
