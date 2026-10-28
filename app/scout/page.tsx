"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { companies } from "@/lib/companies";
import CompanyLogo from "@/components/CompanyLogo";
import { getDiagnosis, type SavedDiagnosis } from "@/lib/storage";

// 志望業界 → 企業カテゴリ
const INDUSTRY_TO_CAT: Record<string, string> = {
  "IT・通信": "IT",
  "金融・保険": "金融",
  "コンサルティング": "コンサル",
  "メーカー（製造業）": "メーカー",
  "商社": "商社",
  "広告・マーケティング": "広告・メディア",
  "医療・福祉": "その他",
  "教育": "その他",
  "小売・流通": "流通・小売",
  "建設・不動産": "インフラ",
  "エンタメ・メディア": "広告・メディア",
  "公務員・非営利": "その他",
};

const DATES = ["1日前", "2日前", "4日前", "1週間前", "2週間前"];

export default function ScoutPage() {
  const [diag, setDiag] = useState<SavedDiagnosis | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDiag(getDiagnosis());
    setLoaded(true);
  }, []);

  const cat = diag ? INDUSTRY_TO_CAT[diag.industry] ?? "その他" : "";
  const matched = diag ? companies.filter((c) => c.category === cat).slice(0, 5) : [];
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
                  <CompanyLogo name={c.name} category={c.category} size={42} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {unread && <span className="w-1.5 h-1.5 rounded-full bg-[#F08300] shrink-0" />}
                      <p className="text-[13px] text-gray-500 truncate">{c.name}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{diag.jobType}職インターンのご案内</p>
                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                      あなたの「{diag.strengthProfile}」という強みに注目しました。ぜひ一度お話ししませんか？
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[11px] text-gray-400">{DATES[i]}</span>
                    {unread && <span className="text-[10px] font-medium bg-[#F08300] text-white px-1.5 py-0.5 rounded-sm">NEW</span>}
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
