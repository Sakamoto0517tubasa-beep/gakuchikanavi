"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { companies, categories } from "@/lib/companies";
import { useState } from "react";

const tools = [
  { label: "ガクチカ診断", href: "/start", color: "#EA6C00",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> },
  { label: "企業検索", href: "/search", color: "#0068B7",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z"/></svg> },
  { label: "スカウト", href: "/scout", color: "#00997A",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
  { label: "マイページ", href: "/mypage", color: "#7C5CBF",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
];

const CAT_COLORS: Record<string, string> = {
  "メーカー": "#C0652B", "IT": "#0068B7", "商社": "#8A6D3B", "金融": "#2E7D32",
  "コンサル": "#5E35B1", "広告・メディア": "#C2185B", "流通・小売": "#00838F",
  "インフラ": "#455A64", "航空・観光": "#0277BD", "その他": "#607D8B",
};

export default function Home() {
  const router = useRouter();
  const [cat, setCat] = useState("すべて");

  const list = companies.filter((c) => cat === "すべて" || c.category === cat).slice(0, 8);

  return (
    <main className="min-h-screen bg-[#EFEFF2]">
      {/* トップバー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
          <span className="text-[17px] font-bold text-[#0068B7] tracking-tight">ガクチカナビ</span>
          <div className="flex items-center gap-3">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="#8a94a0"><path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#8a94a0"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
          </div>
        </div>
      </header>

      {/* 会員登録 / ログイン */}
      <div className="bg-white px-4 pb-3 pt-1 border-b border-gray-200">
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-2.5">
          <button onClick={() => router.push("/start")} className="bg-[#EA6C00] text-white text-sm font-bold py-2.5 rounded-full flex items-center justify-center gap-1">
            診断を始める<span className="text-[10px] bg-white/25 px-1 py-px rounded-sm">無料</span>
          </button>
          <button onClick={() => router.push("/mypage")} className="bg-[#00438C] text-white text-sm font-bold py-2.5 rounded-full">
            マイページ
          </button>
        </div>
      </div>

      {/* 診断プロモバナー */}
      <div className="max-w-2xl mx-auto px-4 pt-3">
        <button onClick={() => router.push("/start")} className="w-full text-left bg-white rounded-lg border border-gray-200 overflow-hidden flex">
          <div className="bg-gradient-to-br from-[#0071c5] to-[#004a84] w-24 shrink-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z"/></svg>
          </div>
          <div className="px-4 py-3 flex-1">
            <span className="inline-block text-[10px] font-bold text-[#EA6C00] bg-[#FDF0E4] px-1.5 py-0.5 rounded-sm mb-1">AI診断・3分</span>
            <p className="text-sm font-bold text-gray-800 leading-snug">強みに合ったガクチカをAIが提案</p>
            <p className="text-[12px] text-gray-500 mt-0.5">10問に答えるだけ。あなた専用の3案が届く</p>
          </div>
          <div className="flex items-center pr-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#c7cdd4"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z"/></svg>
          </div>
        </button>
      </div>

      {/* ツール */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-lg border border-gray-200 grid grid-cols-4 py-3">
          {tools.map((t) => (
            <Link key={t.label} href={t.href} className="flex flex-col items-center gap-1.5 py-1">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: t.color }}>{t.icon}</span>
              <span className="text-[10.5px] font-bold text-gray-600">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* おすすめ企業 */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-8">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#EA6C00]" />注目の企業
          </h2>
          <Link href="/search" className="text-[12px] text-[#0068B7] font-bold">すべて見る ›</Link>
        </div>

        {/* カテゴリチップ */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${cat === c ? "bg-[#0068B7] text-white border-[#0068B7]" : "bg-white text-gray-600 border-gray-300"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* 企業リスト */}
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 mt-1">
          {list.map((c) => (
            <Link key={c.name} href="/search" className="flex items-center gap-3 px-3.5 py-3 hover:bg-gray-50 transition-colors">
              <span className="w-11 h-11 rounded shrink-0 flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: CAT_COLORS[c.category] ?? "#607D8B" }}>
                {c.name.charAt(0)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{c.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-gray-500 border border-gray-300 rounded-sm px-1 py-px shrink-0 whitespace-nowrap">{c.category}</span>
                  <span className="text-[11px] text-gray-500 truncate">{c.note}</span>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#c7cdd4" className="shrink-0"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z"/></svg>
            </Link>
          ))}
        </div>
        <Link href="/search" className="mt-3 block text-center bg-white border border-gray-300 rounded-full py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          544社をすべて見る
        </Link>
      </div>
    </main>
  );
}
