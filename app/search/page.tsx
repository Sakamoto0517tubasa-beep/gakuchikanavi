"use client";

import { useState } from "react";

const SITES = [
  {
    name: "マイナビ2028",
    desc: "新卒就活の定番",
    tag: "新卒",
    color: "#E60012",
    getUrl: (q: string) =>
      q
        ? `https://job.mynavi.jp/28/pc/corpinfo/searchCorpListByGenCond/index/?cond=FW:${encodeURIComponent(q)}/func=PCTopQuickSearch/FWTGT:1`
        : "https://job.mynavi.jp/28/pc/",
  },
  {
    name: "リクナビ2028",
    desc: "大手・有名企業が充実",
    tag: "新卒",
    color: "#0066CC",
    getUrl: (q: string) =>
      q
        ? `https://job.rikunabi.com/2028/search/company/?keyword=${encodeURIComponent(q)}`
        : "https://job.rikunabi.com/",
  },
  {
    name: "ONE CAREER",
    desc: "選考情報・ES公開",
    tag: "新卒",
    color: "#222222",
    getUrl: (q: string) =>
      q
        ? `https://www.onecareer.jp/companies?keyword=${encodeURIComponent(q)}`
        : "https://www.onecareer.jp/",
  },
  {
    name: "キャリタス就活",
    desc: "中堅・隠れ優良企業",
    tag: "新卒",
    color: "#E87722",
    getUrl: (q: string) =>
      q
        ? `https://job.career-tasu.jp/search/company/?keyword=${encodeURIComponent(q)}`
        : "https://job.career-tasu.jp/",
  },
  {
    name: "あさがくナビ",
    desc: "中小・穴場企業に強い",
    tag: "新卒",
    color: "#5BAD6F",
    getUrl: (q: string) =>
      q
        ? `https://www.asagaku.com/shushoku/kensaku_kekka.html?keyword=${encodeURIComponent(q)}`
        : "https://www.asagaku.com/",
  },
  {
    name: "Wantedly",
    desc: "ベンチャー・インターン",
    tag: "インターン",
    color: "#21BCB4",
    getUrl: (q: string) =>
      q
        ? `https://www.wantedly.com/projects?query=${encodeURIComponent(q)}`
        : "https://www.wantedly.com/",
  },
  {
    name: "就活会議",
    desc: "口コミ・選考体験記",
    tag: "口コミ",
    color: "#FF6B35",
    getUrl: (q: string) =>
      q
        ? `https://syukatsu-kaigi.jp/companies?keyword=${encodeURIComponent(q)}`
        : "https://syukatsu-kaigi.jp/",
  },
  {
    name: "OpenWork",
    desc: "社員口コミ・年収",
    tag: "口コミ",
    color: "#4A90D9",
    getUrl: (q: string) =>
      q
        ? `https://www.openwork.jp/search.php?word=${encodeURIComponent(q)}`
        : "https://www.openwork.jp/",
  },
];

const TAG_COLORS: Record<string, string> = {
  新卒: "bg-[#1A1A2E] text-white",
  インターン: "bg-[#21BCB4] text-white",
  口コミ: "bg-gray-200 text-gray-600",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");

  function handleSearch() {
    setQuery(input.trim());
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 sticky top-0 z-10">
        <h1 className="text-lg font-medium text-gray-800 mb-3">企業検索</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="企業名・業界・職種"
            className="flex-1 bg-[#F5F5F0] text-sm text-gray-700 px-4 py-3 focus:outline-none placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="bg-[#1A1A2E] text-white text-sm px-5 py-3 hover:bg-[#2a2a4e] transition-colors"
          >
            検索
          </button>
        </div>
        {query && (
          <p className="text-xs text-gray-400 mt-2">
            「{query}」で各サイトを検索
          </p>
        )}
      </div>

      <div className="px-5 py-5">
        {!query && (
          <p className="text-xs text-gray-400 mb-4 tracking-widest uppercase">
            新卒向けサイト一覧
          </p>
        )}

        <div className="flex flex-col gap-3">
          {SITES.map((site) => (
            <a
              key={site.name}
              href={site.getUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white flex items-center justify-between px-5 py-4 hover:shadow-sm transition-shadow group"
            >
              <div className="flex items-center gap-4">
                {/* カラーバー */}
                <div
                  className="w-1 h-10 shrink-0"
                  style={{ backgroundColor: site.color }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-800">{site.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${TAG_COLORS[site.tag]}`}>
                      {site.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{site.desc}</p>
                </div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-300 text-center mt-6">
          各サイトが新しいタブで開きます
        </p>
      </div>
    </main>
  );
}
