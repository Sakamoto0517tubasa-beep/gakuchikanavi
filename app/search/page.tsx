export default function SearchPage() {
  const companies = [
    { name: "株式会社リクルート", industry: "人材・メディア", match: 92 },
    { name: "サイバーエージェント", industry: "IT・広告", match: 87 },
    { name: "電通グループ", industry: "広告・マーケティング", match: 81 },
    { name: "楽天グループ", industry: "EC・フィンテック", match: 78 },
    { name: "DeNA", industry: "ゲーム・モバイル", match: 74 },
    { name: "メルカリ", industry: "EC・スタートアップ", match: 71 },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 sticky top-0 z-10">
        <h1 className="text-lg font-medium text-gray-800 mb-3">企業検索</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="企業名・業界で検索"
            className="w-full bg-[#F5F5F0] text-sm text-gray-700 px-4 py-3 pr-10 focus:outline-none placeholder-gray-400"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-xs text-gray-400 mb-4">あなたの診断結果に基づくおすすめ企業</p>
        <div className="flex flex-col gap-3">
          {companies.map((c) => (
            <div key={c.name} className="bg-white p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.industry}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-light text-[#1A1A2E]">{c.match}<span className="text-xs text-gray-400">%</span></p>
                <p className="text-xs text-gray-400">マッチ度</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-300 text-center mt-6">※ 診断完了後にマッチ度が更新されます</p>
      </div>
    </main>
  );
}
