"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const quickLinks = [
  {
    label: "ガクチカ診断",
    href: "/start",
    bg: "#EA5520",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    label: "企業検索",
    href: "/search",
    bg: "#0068B7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
      </svg>
    ),
  },
  {
    label: "スカウト",
    href: "/scout",
    bg: "#00997A",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: "マイページ",
    href: "/mypage",
    bg: "#7C5CBF",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#EEF1F5]">
      {/* トップバー */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
          <span className="text-[17px] font-bold text-[#0068B7] tracking-tight">ガクチカナビ</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#9aa5b1">
            <path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </div>
      </header>

      {/* ヒーロー */}
      <div className="bg-gradient-to-br from-[#0071c5] to-[#004a84] relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10" />
        <div className="absolute right-16 top-24 w-20 h-20 rounded-full bg-white/10" />
        <div className="max-w-2xl mx-auto px-5 pt-8 pb-8 relative">
          <div className="inline-block bg-[#EA5520] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm mb-3">
            新卒就活生向け・完全無料
          </div>
          <h1 className="text-[25px] leading-snug font-bold text-white mb-2.5">
            何をガクチカにすべきか、<br />AIが3分で教えてくれる。
          </h1>
          <p className="text-blue-100 text-[13px] leading-relaxed mb-5">
            あなたの強みと志望業界・職種から、<br className="hidden sm:block" />
            選考で評価されるガクチカをAIが提案します。
          </p>
          <button
            onClick={() => router.push("/start")}
            className="flex items-center justify-center gap-2 w-full bg-[#EA5520] text-white text-[15px] font-bold py-3.5 rounded-full hover:bg-[#d4491a] transition-colors shadow-md"
          >
            無料で診断を始める
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* クイックアクセス */}
      <div className="max-w-2xl mx-auto px-4 -mt-4 relative">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm grid grid-cols-4 divide-x divide-gray-100">
          {quickLinks.map((q) => (
            <Link key={q.label} href={q.href} className="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 transition-colors">
              <span className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: q.bg }}>
                {q.icon}
              </span>
              <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">{q.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 数字でわかるガクチカナビ */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="bg-[#1A3A5C] rounded-xl px-5 py-4 flex justify-around text-center">
          {[
            { num: "3", unit: "分", label: "で診断完了" },
            { num: "544", unit: "社", label: "の企業を掲載" },
            { num: "0", unit: "円", label: "完全無料" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-white">
                <span className="text-2xl font-bold">{s.num}</span>
                <span className="text-sm font-bold ml-0.5">{s.unit}</span>
              </p>
              <p className="text-[11px] text-blue-200 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* こんな悩み */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <h2 className="text-[15px] font-bold text-gray-800 mb-3">こんな悩み、ありませんか？</h2>
        <div className="flex flex-col gap-2.5">
          {[
            "そもそも何をガクチカにすればいいか分からない",
            "ありきたりなエピソードしか書けない",
            "志望業界に刺さる強みが分からない",
          ].map((t, i) => (
            <div key={i} className="bg-white border-l-4 border-[#EA5520] rounded-r-lg py-3 px-4 flex items-center gap-3 shadow-sm">
              <span className="w-6 h-6 rounded-full bg-[#FDEEE6] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#EA5520">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
              </span>
              <span className="text-[13px] text-gray-700 leading-snug">{t}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-[13px] font-bold text-[#0068B7] mt-4">
          → ガクチカナビが3分で解決します
        </p>
      </div>

      {/* 診断の流れ */}
      <div className="max-w-2xl mx-auto px-4 pt-7 pb-8">
        <h2 className="text-[15px] font-bold text-gray-800 mb-4">カンタン3ステップ</h2>
        <div className="relative pl-3">
          <div className="absolute left-[22px] top-3 bottom-3 w-0.5 bg-[#CFE0EF]" />
          <div className="flex flex-col gap-4">
            {[
              { num: "1", title: "強みを診断", desc: "10問の質問に答えて行動特性を分析", color: "#0068B7" },
              { num: "2", title: "志望を入力", desc: "気になる業界と職種を選ぶだけ", color: "#0068B7" },
              { num: "3", title: "AIが提案", desc: "理由・始め方・面接フレーム付きで3つ提案", color: "#EA5520" },
            ].map((item) => (
              <div key={item.num} className="flex items-center gap-4 relative">
                <span className="w-9 h-9 shrink-0 text-white text-base font-bold flex items-center justify-center rounded-full ring-4 ring-[#EEF1F5] z-10" style={{ backgroundColor: item.color }}>
                  {item.num}
                </span>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-1 shadow-sm">
                  <p className="text-sm font-bold text-gray-800">{item.title}</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push("/start")}
          className="mt-7 w-full bg-[#EA5520] text-white text-[16px] font-bold py-4 rounded-full hover:bg-[#d4491a] transition-colors shadow-md"
        >
          無料で診断を始める
        </button>
        <p className="text-[11px] text-gray-400 text-center mt-3">所要時間 約3分／登録不要</p>
      </div>
    </main>
  );
}
