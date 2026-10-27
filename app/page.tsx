"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { companies, categories } from "@/lib/companies";
import CompanyLogo from "@/components/CompanyLogo";
import { useState } from "react";

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

export default function Home() {
  const router = useRouter();
  const [cat, setCat] = useState("すべて");
  const list = companies.filter((c) => cat === "すべて" || c.category === cat).slice(0, 10);

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
            診断を始める<span className="text-[10px] font-medium bg-white/25 px-1.5 py-px rounded-sm">無料</span>
          </button>
          <button onClick={() => router.push("/mypage")} className="bg-white border border-[#0A3059] text-[#0A3059] text-sm font-medium py-3 rounded hover:bg-gray-50 transition-colors">
            マイページ
          </button>
        </div>
      </div>

      {/* 診断バナー */}
      <div className="max-w-2xl mx-auto px-4 pt-3">
        <button onClick={() => router.push("/start")} className="w-full text-left bg-[#0A3059] rounded flex items-center gap-3 px-4 py-3.5 hover:bg-[#0c3a6e] transition-colors">
          <span className="shrink-0 w-10 h-10 rounded bg-[#0096DF] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 3l1.9 3.8 4.1.6-3 2.9.7 4.1-3.7-2-3.7 2 .7-4.1-3-2.9 4.1-.6L12 6z"/></svg>
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">AIが3分であなたのガクチカを提案</p>
            <p className="text-[12px] text-blue-200 mt-0.5">10問に答えるだけ・無料</p>
          </div>
          <span className="text-[#0096DF] text-xs font-medium shrink-0">診断 ›</span>
        </button>
      </div>

      {/* ツール */}
      <div className="max-w-2xl mx-auto px-4 pt-3">
        <div className="bg-white rounded border border-gray-200 grid grid-cols-4 divide-x divide-gray-100">
          {tools.map((t) => (
            <Link key={t.label} href={t.href} className="flex flex-col items-center gap-1.5 py-3 hover:bg-gray-50 transition-colors">
              <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center">{t.icon}</span>
              <span className="text-[10.5px] font-medium text-[#0A3059]">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 注目の企業 */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-8">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[15px] font-medium text-[#0A3059] flex items-center gap-2">
            <span className="w-1 h-4 bg-[#0096DF]" />注目の企業
          </h2>
          <Link href="/search" className="text-[12px] text-[#0096DF] font-medium">すべて見る ›</Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${cat === c ? "bg-[#0A3059] text-white border-[#0A3059]" : "bg-white text-gray-600 border-gray-300"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100 mt-1">
          {list.map((c) => (
            <Link key={c.name} href="/search" className="flex items-center gap-3 px-3.5 py-3 hover:bg-gray-50 transition-colors">
              <CompanyLogo name={c.name} category={c.category} size={42} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-[#0096DF] border border-[#9fd3ef] bg-[#EAF4FB] rounded-sm px-1 py-px shrink-0 whitespace-nowrap">{c.category}</span>
                  <span className="text-[11px] text-gray-500 truncate">{c.note}</span>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#c7cdd4" className="shrink-0"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z"/></svg>
            </Link>
          ))}
        </div>
        <Link href="/search" className="mt-3 block text-center bg-white border border-[#0A3059] rounded py-3 text-sm font-medium text-[#0A3059] hover:bg-gray-50 transition-colors">
          544社をすべて見る ›
        </Link>
      </div>
    </main>
  );
}
