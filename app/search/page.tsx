"use client";

import { useState, useMemo } from "react";
import { companies, categories } from "@/lib/companies";

function mynaviUrl(name: string) {
  return `https://job.mynavi.jp/28/pc/corpinfo/searchCorpListByGenCond/index/?cond=FW:${encodeURIComponent(name)}/func=PCTopQuickSearch/FWTGT:1`;
}

function rikunaviUrl(name: string) {
  return `https://job.rikunabi.com/2028/company/search/?free=${encodeURIComponent(name)}&searchType=1`;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("すべて");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchCat = category === "すべて" || c.category === category;
      const matchQ =
        !query.trim() ||
        c.name.includes(query) ||
        c.industry.includes(query) ||
        c.note.includes(query);
      return matchCat && matchQ;
    });
  }, [query, category]);

  const selectedCompany = companies.find((c) => c.name === selected);

  return (
    <main className="min-h-screen bg-[#F2F4F8]">
      {/* ヘッダー・検索 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 pt-10 pb-3">
          <h1 className="text-lg font-bold text-gray-800 mb-3">企業検索</h1>
          <div className="relative mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="企業名・業界・キーワード"
              className="w-full bg-[#F2F4F8] rounded text-sm text-gray-700 pl-9 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-[#C8102E] placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">×</button>
            )}
          </div>
          {/* カテゴリタブ */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  category === cat
                    ? "bg-[#1A1A2E] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 企業一覧 */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <p className="text-xs text-gray-500 mb-3"><span className="font-bold text-gray-700">{filtered.length}</span> 社</p>
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
          {filtered.map((company) => (
            <button
              key={company.name}
              onClick={() => setSelected(company.name)}
              className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-gray-800">{company.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{company.industry}／{company.note}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-300">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 企業詳細モーダル */}
      {selected && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-white w-full max-w-2xl px-6 pt-6 pb-10 rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <p className="text-xs text-gray-500 mb-1">{selectedCompany.industry}</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedCompany.name}</h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">{selectedCompany.note}</p>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 bg-[#C8102E]" />
              <p className="text-[13px] font-bold text-gray-700">求人サイトで詳細を見る</p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={mynaviUrl(selectedCompany.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#E60012] text-white px-5 py-4"
              >
                <span className="text-sm font-medium">マイナビ2028で見る</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={rikunaviUrl(selectedCompany.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#0066CC] text-white px-5 py-4"
              >
                <span className="text-sm font-medium">リクナビ2028で見る</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full text-xs text-gray-400 py-2">
              閉じる
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
