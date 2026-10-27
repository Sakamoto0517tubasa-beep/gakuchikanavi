export default function ScoutPage() {
  const scouts = [
    { company: "株式会社リクルート", role: "営業職インターン", date: "2日前", unread: true },
    { company: "サイバーエージェント", role: "マーケティング職インターン", date: "5日前", unread: true },
    { company: "楽天グループ", role: "エンジニア職インターン", date: "1週間前", unread: false },
  ];

  return (
    <main className="min-h-screen bg-[#EEF1F5]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[17px] font-bold text-[#0068B7] tracking-tight">ガクチカナビ</span>
        </div>
      </header>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-4">
          <h1 className="text-lg font-bold text-gray-800">スカウト</h1>
          <p className="text-[13px] text-gray-500 mt-1">企業からのオファーが届きます</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5">
        {/* 未読サマリ */}
        <div className="bg-[#0068B7] text-white px-4 py-3.5 rounded-lg mb-5 flex items-center justify-between">
          <span className="text-sm font-medium">未読のスカウト</span>
          <span className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">2</span>
            <span className="text-xs text-blue-100">件</span>
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
          {scouts.map((s, i) => (
            <div key={i} className="px-4 py-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                {s.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#EA5520] mt-2 shrink-0" />}
                <div className={s.unread ? "" : "pl-[18px]"}>
                  <p className="text-xs text-gray-500 mb-0.5">{s.company}</p>
                  <p className="text-sm font-bold text-gray-800">{s.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <p className="text-xs text-gray-400">{s.date}</p>
                {s.unread && <span className="text-[10px] font-bold bg-[#EA5520] text-white px-1.5 py-0.5 rounded-sm">NEW</span>}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">診断を完了すると、スカウトが届きやすくなります。</p>
      </div>
    </main>
  );
}
