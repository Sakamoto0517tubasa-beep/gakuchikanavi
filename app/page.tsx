"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const tools = [
  { label: "ガクチカ診断", href: "/start",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><path d="M9 11l3 3 8-8M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "企業検索", href: "/search",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/></svg> },
  { label: "スカウト", href: "/scout",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" strokeLinecap="round"/></svg> },
  { label: "マイページ", href: "/mypage",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round"/></svg> },
];

const steps = [
  { num: "1", title: "強みを診断", desc: "10問の質問に答えて行動特性を分析" },
  { num: "2", title: "志望を入力", desc: "気になる業界と職種を選ぶだけ" },
  { num: "3", title: "AIが提案", desc: "理由・始め方・面接フレーム付きで3つ提案" },
];

const columns = [
  { tag: "コラム", tagColor: "#0096DF", date: "10/24", title: "ガクチカが思いつかない時の3つの視点" },
  { tag: "コラム", tagColor: "#0096DF", date: "10/18", title: "「アルバイト経験」を魅力的に伝える書き方" },
  { tag: "コラム", tagColor: "#0096DF", date: "10/10", title: "業界別・採用担当に刺さるガクチカの特徴" },
  { tag: "お知らせ", tagColor: "#F08300", date: "10/01", title: "AI診断がリニューアルしました" },
];

const faqs = [
  { q: "診断は無料ですか？", a: "はい、登録不要で何度でも無料で利用できます。" },
  { q: "ガクチカがまだ無くても使えますか？", a: "大丈夫です。今から始められる活動を提案します。" },
  { q: "診断にはどれくらい時間がかかりますか？", a: "10問・約3分で完了します。" },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      {/* トップバー */}
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
          <span className="text-[18px] font-medium text-[#0A3059] tracking-tight">ガクチカナビ</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A3059"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
        </div>
      </header>

      {/* 会員登録 / ログイン */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3">
          <button onClick={() => router.push("/start")} className="bg-[#F08300] text-white text-sm font-medium py-3 rounded flex items-center justify-center gap-1.5 hover:bg-[#d97600] transition-colors">
            診断を始める<span className="text-[10px] bg-white/25 px-1.5 py-px rounded-sm">無料</span>
          </button>
          <button onClick={() => router.push("/mypage")} className="bg-white border border-[#0A3059] text-[#0A3059] text-sm font-medium py-3 rounded hover:bg-gray-50 transition-colors">
            マイページ
          </button>
        </div>
      </div>

      {/* ツール */}
      <div className="max-w-2xl mx-auto px-4 pt-3">
        <div className="bg-white rounded border border-gray-200 grid grid-cols-4 divide-x divide-gray-100">
          {tools.map((t) => (
            <Link key={t.label} href={t.href} className="flex flex-col items-center gap-1.5 py-3 hover:bg-gray-50 transition-colors">
              <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center">{t.icon}</span>
              <span className="text-[10.5px] text-[#0A3059]">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 診断の流れ */}
      <div className="max-w-2xl mx-auto px-4 pt-5">
        <h2 className="text-[14px] text-[#0A3059] mb-2.5 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#0096DF]" />ガクチカ診断について
        </h2>
        <div className="bg-white rounded border border-gray-200 px-4 py-4">
          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            あなたの強み・志望業界・職種をもとに、選考で評価されるガクチカをAIが<span className="text-[#0096DF] font-medium">3つ</span>提案します。所要時間は約3分、登録も不要です。
          </p>
          <div className="flex flex-col gap-3">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#0A3059] text-white text-xs flex items-center justify-center">{s.num}</span>
                <div>
                  <p className="text-sm text-gray-800">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 開始ボタン */}
      <div className="max-w-2xl mx-auto px-4 pt-5">
        <button onClick={() => router.push("/start")} className="w-full bg-[#F08300] text-white text-[15px] font-medium py-4 rounded hover:bg-[#d97600] transition-colors">
          診断を始める（無料）
        </button>
      </div>

      {/* コラム・お知らせ */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <h2 className="text-[14px] text-[#0A3059] mb-2.5 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#0096DF]" />就活お役立ちコラム
        </h2>
        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
          {columns.map((c, i) => (
            <Link key={i} href="/start" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <span className="text-[10px] text-white px-1.5 py-0.5 rounded-sm shrink-0" style={{ backgroundColor: c.tagColor }}>{c.tag}</span>
              <span className="text-xs text-gray-400 shrink-0">{c.date}</span>
              <span className="text-[13px] text-gray-700 truncate flex-1">{c.title}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#c7cdd4" className="shrink-0"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z"/></svg>
            </Link>
          ))}
        </div>
      </div>

      {/* よくある質問 */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
        <h2 className="text-[14px] text-[#0A3059] mb-2.5 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#0096DF]" />よくある質問
        </h2>
        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <div key={i} className="px-4 py-3.5">
              <div className="flex gap-2">
                <span className="text-[#0096DF] text-sm shrink-0">Q.</span>
                <p className="text-[13px] text-gray-800">{f.q}</p>
              </div>
              <div className="flex gap-2 mt-1.5">
                <span className="text-gray-400 text-sm shrink-0">A.</span>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-8">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
