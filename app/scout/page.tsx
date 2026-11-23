"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDiagnosis, getScoutInterests, toggleScoutInterest, type SavedDiagnosis } from "@/lib/storage";

const DATES = ["1日前", "2日前", "4日前", "1週間前", "2週間前"];
// 匿名化した企業名（実在企業名は表示しない）
const ANON = ["A社", "B社", "C社", "D社", "E社"];

export default function ScoutPage() {
  const [diag, setDiag] = useState<SavedDiagnosis | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [interested, setInterested] = useState<string[]>([]);

  useEffect(() => {
    setDiag(getDiagnosis());
    setInterested(getScoutInterests().map((s) => s.company));
    setLoaded(true);
  }, []);

  function onInterest(company: string, role: string) {
    toggleScoutInterest(company, role);
    setInterested(getScoutInterests().map((s) => s.company));
  }

  // 実在企業は使わず、匿名企業からのオファーとして表示する
  const matched = diag ? ANON.map((name) => ({ name })) : [];
  const unreadCount = Math.min(2, matched.length);

  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[18px] font-medium text-[#0A3059] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <h1 className="text-[16px] font-medium text-[#0A3059]">スカウト</h1>
          {diag && unreadCount > 0 && (
            <span className="text-xs font-medium text-white bg-[#F08300] px-2 py-0.5 rounded-full">未読 {unreadCount}件</span>
          )}
        </div>
      </div>

      {!loaded ? (
        <div className="max-w-2xl mx-auto px-4 py-6" />
      ) : !diag ? (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded border border-gray-200 px-5 py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EAF4FB] flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" strokeLinecap="round" /></svg>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-1">診断するとスカウトが届きます</p>
            <p className="text-[13px] text-gray-500 mb-5">あなたの志望業界・強みに合った企業からのオファーが表示されます。</p>
            <Link href="/start" className="inline-flex items-center gap-1.5 bg-[#F08300] text-white text-[15px] font-medium px-8 py-3 rounded active:scale-[0.99] hover:bg-[#d97600] transition-all">
              診断を始める（無料）
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-4">
          <p className="text-[13px] text-gray-500 mb-3 px-1">
            <span className="text-[#0A3059] font-medium">{diag.industry}</span>の企業から、あなたの強みに注目したオファーが届いています。
          </p>
          <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
            {matched.map((c, i) => {
              const unread = i < unreadCount;
              return (
                <div key={c.name + i} className="px-4 py-3.5 flex items-start gap-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.6"><path d="M3 21h18M5 21V5a1 1 0 011-1h7a1 1 0 011 1v16M14 21V9h4a1 1 0 011 1v11" strokeLinejoin="round" /><path d="M8 7h2M8 11h2M8 15h2" strokeLinecap="round" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {unread && <span className="w-1.5 h-1.5 rounded-full bg-[#F08300] shrink-0" />}
                        <p className="text-[13px] text-gray-500 truncate">{diag.industry}の企業（{c.name}）</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] text-gray-400">{DATES[i]}</span>
                        {unread && <span className="text-[10px] font-medium bg-[#F08300] text-white px-1.5 py-0.5 rounded-sm">NEW</span>}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{diag.jobType}職インターンのご案内</p>
                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                      あなたの「{diag.strengthProfile}」という強みに注目しました。ぜひ一度お話ししませんか？
                    </p>
                    <button
                      onClick={() => onInterest(c.name, `${diag.jobType}職インターン`)}
                      className={`mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border active:scale-95 transition-all ${
                        interested.includes(c.name)
                          ? "bg-[#FDEEE6] border-[#F08300] text-[#F08300]"
                          : "bg-white border-gray-300 text-gray-600"
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={interested.includes(c.name) ? "#F08300" : "none"} stroke="#F08300" strokeWidth="1.8">
                        <path d="M12 21C5.5 14.5 3 11.5 3 8.5A4.5 4.5 0 0112 6a4.5 4.5 0 019 2.5c0 3-2.5 6-9 12.5z" strokeLinejoin="round" />
                      </svg>
                      {interested.includes(c.name) ? "興味ありに登録済み" : "興味あり"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-400 text-center mt-6">
            ※スカウトはデモ表示です。実際の企業からのオファーではありません。
          </p>
        </div>
      )}
    </main>
  );
}
