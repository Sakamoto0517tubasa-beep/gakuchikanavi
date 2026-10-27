"use client";

import { useState } from "react";

type Job = {
  title: string;
  company: string;
  location: string;
  salary: string;
  link: string;
  updated: string;
  snippet: string;
};

const EXTERNAL_SITES = [
  {
    name: "マイナビ",
    color: "#e60012",
    getUrl: (q: string) =>
      `https://job.mynavi.jp/25/pc/search/corp/index.html?keyword=${encodeURIComponent(q)}`,
  },
  {
    name: "リクナビ",
    color: "#0066cc",
    getUrl: (q: string) =>
      `https://job.rikunabi.com/2025/search/company/?keyword=${encodeURIComponent(q)}`,
  },
  {
    name: "doda",
    color: "#ff6600",
    getUrl: (q: string) =>
      `https://doda.jp/DodaFront/View/JobSearchTop/j_searchword__${encodeURIComponent(q)}/`,
  },
  {
    name: "Wantedly",
    color: "#21bcb4",
    getUrl: (q: string) =>
      `https://www.wantedly.com/projects?occupation_types=&hiring=true&query=${encodeURIComponent(q)}`,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: query }),
      });
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* ヘッダー・検索バー */}
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 sticky top-0 z-10">
        <h1 className="text-lg font-medium text-gray-800 mb-3">企業検索</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="企業名・業界・職種で検索"
              className="w-full bg-[#F5F5F0] text-sm text-gray-700 px-4 py-3 focus:outline-none placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#1A1A2E] text-white text-sm px-5 py-3 hover:bg-[#2a2a4e] transition-colors"
          >
            検索
          </button>
        </div>
      </div>

      <div className="px-5 py-5">
        {/* 外部サイトで検索 */}
        {query.trim() && (
          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">外部サイトで検索</p>
            <div className="grid grid-cols-2 gap-2">
              {EXTERNAL_SITES.map((site) => (
                <a
                  key={site.name}
                  href={site.getUrl(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white px-4 py-3 border border-gray-100 hover:border-gray-300 transition-colors"
                >
                  <span className="text-sm font-medium" style={{ color: site.color }}>
                    {site.name}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Jooble求人結果 */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">検索中...</p>
          </div>
        )}

        {!loading && searched && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">結果が見つかりませんでした</p>
            <p className="text-xs text-gray-300 mt-2">上の外部サイトで検索してみてください</p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">
              求人情報 · {jobs.length}件
            </p>
            <div className="flex flex-col gap-3">
              {jobs.map((job, i) => (
                <a
                  key={i}
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 block hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-1">{job.company}</p>
                      <p className="text-sm font-medium text-gray-800 mb-1 leading-snug">{job.title}</p>
                      <p className="text-xs text-gray-400 truncate">{job.snippet}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-1">
                      <path d="M9 18l6-6-6-6" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  {job.salary && (
                    <p className="text-xs text-[#1A1A2E] mt-2 font-medium">{job.salary}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    {job.location && (
                      <span className="text-xs text-gray-400">{job.location}</span>
                    )}
                    {job.updated && (
                      <span className="text-xs text-gray-300">{job.updated}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 初期状態 */}
        {!searched && (
          <div>
            <p className="text-xs text-gray-400 mb-4 tracking-widest uppercase">おすすめ企業</p>
            {[
              { name: "株式会社リクルート", industry: "人材・メディア", match: 92 },
              { name: "サイバーエージェント", industry: "IT・広告", match: 87 },
              { name: "電通グループ", industry: "広告・マーケティング", match: 81 },
              { name: "楽天グループ", industry: "EC・フィンテック", match: 78 },
              { name: "DeNA", industry: "ゲーム・モバイル", match: 74 },
              { name: "メルカリ", industry: "EC・スタートアップ", match: 71 },
            ].map((c) => (
              <button
                key={c.name}
                onClick={() => { setQuery(c.name); }}
                className="w-full bg-white p-4 flex items-center justify-between mb-2 text-left hover:shadow-sm transition-shadow"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.industry}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light text-[#1A1A2E]">
                    {c.match}<span className="text-xs text-gray-400">%</span>
                  </p>
                  <p className="text-xs text-gray-400">マッチ度</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
