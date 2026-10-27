export default function ScoutPage() {
  const scouts = [
    { company: "株式会社リクルート", role: "営業職インターン", date: "2日前", unread: true },
    { company: "サイバーエージェント", role: "マーケティング職インターン", date: "5日前", unread: true },
    { company: "楽天グループ", role: "エンジニア職インターン", date: "1週間前", unread: false },
  ];

  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      {/* トップバー */}
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[18px] font-bold text-[#0A3059] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <h1 className="text-[16px] font-bold text-[#0A3059]">スカウト</h1>
          <span className="text-xs font-bold text-white bg-[#F08300] px-2 py-0.5 rounded-full">未読 2件</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
          {scouts.map((s, i) => (
            <div key={i} className="px-4 py-3.5 flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                {s.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#F08300] mt-1.5 shrink-0" />}
                <div className={s.unread ? "" : "pl-4"}>
                  <p className="text-xs text-gray-500 mb-0.5">{s.company}</p>
                  <p className="text-sm font-bold text-gray-800">{s.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <p className="text-xs text-gray-400">{s.date}</p>
                {s.unread && <span className="text-[10px] font-bold bg-[#F08300] text-white px-1.5 py-0.5 rounded-sm">NEW</span>}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-8">診断を完了すると、スカウトが届きやすくなります。</p>
      </div>
    </main>
  );
}
