export default function ScoutPage() {
  const scouts = [
    { company: "株式会社リクルート", role: "営業職インターン", date: "2日前", unread: true },
    { company: "サイバーエージェント", role: "マーケティング職インターン", date: "5日前", unread: true },
    { company: "楽天グループ", role: "エンジニア職インターン", date: "1週間前", unread: false },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4">
        <h1 className="text-lg font-medium text-gray-800">スカウト</h1>
        <p className="text-xs text-gray-400 mt-1">企業からのオファーが届きます</p>
      </div>

      <div className="px-5 py-4">
        {/* 未読バッジ */}
        <div className="bg-[#1A1A2E] text-white text-xs px-4 py-3 mb-5 flex items-center justify-between">
          <span>未読のスカウト</span>
          <span className="text-lg font-light">2</span>
        </div>

        <div className="flex flex-col gap-3">
          {scouts.map((s, i) => (
            <div key={i} className={`bg-white p-4 ${s.unread ? "border-l-2 border-[#1A1A2E]" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">{s.company}</p>
                  <p className="text-sm font-medium text-gray-800">{s.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-xs text-gray-400">{s.date}</p>
                  {s.unread && <span className="text-xs bg-[#1A1A2E] text-white px-2 py-0.5">NEW</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-300">診断完了でスカウトが届きやすくなります</p>
        </div>
      </div>
    </main>
  );
}
