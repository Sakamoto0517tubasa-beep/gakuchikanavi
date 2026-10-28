"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getDiagnosis, getGakuchikaList, deleteGakuchika, formatDate,
  addPost, getPosts, getScoutInterests,
  type SavedDiagnosis, type SavedGakuchika, type ScoutInterest,
} from "@/lib/storage";

export default function MyPage() {
  const [diagnosis, setDiagnosis] = useState<SavedDiagnosis | null>(null);
  const [gakuchikas, setGakuchikas] = useState<SavedGakuchika[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [postedTitles, setPostedTitles] = useState<string[]>([]);
  const [interests, setInterests] = useState<ScoutInterest[]>([]);

  useEffect(() => {
    setDiagnosis(getDiagnosis());
    setGakuchikas(getGakuchikaList());
    setPostedTitles(getPosts().map((p) => p.title));
    setInterests(getScoutInterests());
  }, []);

  function post(g: SavedGakuchika) {
    addPost({
      id: (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
      date: new Date().toISOString(),
      grade: diagnosis?.grade || "",
      industry: g.industry || diagnosis?.industry || "",
      jobType: g.jobType || diagnosis?.jobType || "",
      category: "",
      title: g.title,
      body: g.fullText,
    });
    setPostedTitles(getPosts().map((p) => p.title));
  }

  const done = !!diagnosis;

  function remove(id: string) {
    deleteGakuchika(id);
    setGakuchikas(getGakuchikaList());
  }

  function copy(g: SavedGakuchika) {
    navigator.clipboard?.writeText(g.fullText).then(() => {
      setCopiedId(g.id);
      setTimeout(() => setCopiedId((c) => (c === g.id ? null : c)), 1800);
    });
  }

  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[18px] font-medium text-[#0A3059] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      {/* プロフィール */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" /></svg>
          </div>
          <div>
            <p className="text-[16px] font-medium text-[#0A3059]">ゲストユーザー</p>
            {done ? (
              <span className="inline-block mt-1 text-[11px] font-medium text-white bg-[#0096DF] px-1.5 py-px rounded-sm">診断完了</span>
            ) : (
              <span className="inline-block mt-1 text-[11px] font-medium text-[#F08300] border border-[#F08300] px-1.5 py-px rounded-sm">診断未完了</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* 診断ステータス */}
        {done ? (
          <div className="bg-white rounded border border-gray-200 mb-5">
            <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-gray-100">
              <span className="w-1 h-4 bg-[#0096DF]" />
              <h2 className="text-[13px] font-medium text-[#0A3059]">あなたの診断結果</h2>
              <span className="ml-auto text-[11px] text-gray-400">{formatDate(diagnosis!.date)}</span>
            </div>
            <div className="px-4 py-4">
              <p className="text-[11px] font-medium text-[#0096DF] mb-0.5">強みタイプ</p>
              <p className="text-[15px] font-medium text-gray-900 mb-3">{diagnosis!.strengthProfile}</p>
              <p className="text-[12px] text-gray-400 mb-1">{diagnosis!.industry}／{diagnosis!.jobType} 志望</p>
              <div className="flex flex-col gap-1.5 mt-2">
                {diagnosis!.suggestions.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] text-white px-1.5 py-0.5 rounded-sm shrink-0" style={{ backgroundColor: i === 0 ? "#F08300" : "#0A3059" }}>{i + 1}</span>
                    <span className="text-[13px] text-gray-700 truncate">{s.title}</span>
                  </div>
                ))}
              </div>
              <Link href="/result" className="mt-4 block w-full text-center bg-[#EAF4FB] border border-[#9fd3ef] text-[#0A3059] text-sm font-medium py-2.5 rounded active:scale-[0.99] transition-transform">
                診断結果をくわしく見る
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded border border-gray-200 px-4 py-5 mb-5 text-center">
            <p className="text-[13px] text-gray-600 mb-4">まだ診断を受けていません。<br />3分であなたに合ったガクチカが分かります。</p>
            <Link href="/start" className="inline-flex items-center gap-1.5 bg-[#F08300] text-white text-[15px] font-medium px-8 py-3 rounded active:scale-[0.99] hover:bg-[#d97600] transition-all">
              診断を始める（無料）
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        )}

        {/* 保存したガクチカ */}
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="w-1 h-4 bg-[#0096DF]" />
          <h2 className="text-[13px] font-medium text-[#0A3059]">保存したガクチカ</h2>
          {gakuchikas.length > 0 && <span className="text-[11px] text-gray-400">{gakuchikas.length}件</span>}
        </div>

        {gakuchikas.length === 0 ? (
          <div className="bg-white rounded border border-gray-200 px-4 py-6 text-center mb-5">
            <p className="text-[13px] text-gray-500">診断結果から「このガクチカを深める」で<br />完成させると、ここに保存されます。</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 mb-5">
            {gakuchikas.map((g) => {
              const open = openId === g.id;
              return (
                <div key={g.id} className="bg-white rounded border border-gray-200 overflow-hidden">
                  <button onClick={() => setOpenId(open ? null : g.id)} className="w-full text-left px-4 py-3.5 flex items-center gap-2 active:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{g.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{formatDate(g.date)}</p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`shrink-0 text-gray-300 transition-transform duration-300 ${open ? "rotate-90" : ""}`}><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="border-t border-gray-100 px-4 py-4">
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{g.fullText}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {g.appealPoints?.map((p, i) => (
                            <span key={i} className="text-[12px] text-[#0096DF] border border-[#9fd3ef] bg-[#EAF4FB] rounded-full px-2.5 py-0.5">{p}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button onClick={() => copy(g)} className="flex items-center gap-1.5 text-xs font-medium text-[#0096DF] border border-[#9fd3ef] bg-[#EAF4FB] rounded px-3 py-1.5 active:scale-95 transition-transform">
                            {copiedId === g.id ? "コピーしました" : "本文をコピー"}
                          </button>
                          <button
                            onClick={() => post(g)}
                            disabled={postedTitles.includes(g.title)}
                            className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#0096DF] rounded px-3 py-1.5 active:scale-95 transition-transform disabled:bg-gray-300"
                          >
                            {postedTitles.includes(g.title) ? "投稿済み" : "みんなに投稿"}
                          </button>
                          <button onClick={() => remove(g.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-auto">削除</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 気になる企業 */}
        {interests.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="w-1 h-4 bg-[#0096DF]" />
              <h2 className="text-[13px] font-medium text-[#0A3059]">気になる企業</h2>
              <span className="text-[11px] text-gray-400">{interests.length}社</span>
            </div>
            <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100 mb-5">
              {interests.map((it, i) => (
                <div key={it.company + i} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-800">{it.company}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{it.role}</p>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#F08300"><path d="M12 21C5.5 14.5 3 11.5 3 8.5A4.5 4.5 0 0112 6a4.5 4.5 0 019 2.5c0 3-2.5 6-9 12.5z" /></svg>
                </div>
              ))}
            </div>
          </>
        )}

        {/* メニュー */}
        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
          {[
            { label: "ガクチカを再診断する", href: "/start" },
            { label: "志望設定を変更する", href: "/target" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center justify-between px-4 py-3.5 active:bg-gray-50 transition-colors">
              <span className="text-sm text-gray-800">{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#c7cdd4"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z" /></svg>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Link href="/terms" className="text-[11px] text-gray-400 hover:text-gray-600">利用規約</Link>
          <span className="text-gray-300 text-[11px]">·</span>
          <Link href="/privacy" className="text-[11px] text-gray-400 hover:text-gray-600">プライバシーポリシー</Link>
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-2">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
