"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const columns = [
  { tag: "コラム", tagColor: "#0096DF", date: "10/24", title: "ガクチカが思いつかない時の3つの視点" },
  { tag: "コラム", tagColor: "#0096DF", date: "10/18", title: "「アルバイト経験」を魅力的に伝える書き方" },
  { tag: "コラム", tagColor: "#0096DF", date: "10/10", title: "業界別・採用担当に刺さるガクチカの特徴" },
  { tag: "お知らせ", tagColor: "#F08300", date: "10/01", title: "AI診断がリニューアルしました" },
];

const faqs = [
  { q: "診断は無料ですか？", a: "はい、登録不要で何度でも無料で利用できます。" },
  { q: "ガクチカがまだ無くても使えますか？", a: "大丈夫です。今から始められる活動を提案します。" },
  { q: "診断にはどれくらい時間がかかりますか？", a: "学年に合わせた質問に約3分で答えられます。" },
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

      {/* ガクチカの見つけ方（2つの同格モード） */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <h2 className="text-[14px] text-[#0A3059] mb-2.5 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#0096DF]" />ガクチカの見つけ方を選ぶ
        </h2>
        <div className="flex flex-col gap-3">
          {/* モードA：強み診断 */}
          <button onClick={() => router.push("/start")} className="w-full text-left bg-white rounded-lg border border-gray-200 px-4 py-4 active:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.8"><path d="M9 11l3 3 8-8M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-medium text-gray-900">強み診断から見つける</p>
                  <span className="text-[10px] font-medium text-white bg-[#F08300] px-1.5 py-px rounded-sm">無料</span>
                </div>
                <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">質問に答えると、AIがあなたに合ったガクチカを<span className="text-[#0096DF] font-medium">10個</span>提案（約3分）</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-[#0096DF]">診断を始める<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#0096DF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </div>
            </div>
          </button>

          {/* モードB：経験から発掘 */}
          <button onClick={() => router.push("/discover")} className="w-full text-left bg-white rounded-lg border border-gray-200 px-4 py-4 active:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 rounded-full bg-[#FDEEE6] flex items-center justify-center shrink-0">
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#F08300" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" strokeLinecap="round" /><path d="M11 8v6M8 11h6" strokeLinecap="round" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-medium text-gray-900">今ある経験から見つける</p>
                  <span className="text-[10px] font-medium text-white bg-[#F08300] px-1.5 py-px rounded-sm">無料</span>
                </div>
                <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">「ガクチカがない」人へ。日常の<span className="text-[#F08300] font-medium">些細な経験</span>に光を当てて発掘</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-[#F08300]">経験から探す<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#F08300" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </div>
            </div>
          </button>
        </div>
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
                <span className="text-[#0096DF] text-sm shrink-0 font-medium">Q.</span>
                <p className="text-[14px] text-gray-900 font-medium">{f.q}</p>
              </div>
              <div className="flex gap-2 mt-1.5">
                <span className="text-gray-400 text-sm shrink-0">A.</span>
                <p className="text-[14px] text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-8">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
