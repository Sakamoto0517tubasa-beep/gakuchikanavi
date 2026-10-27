import Link from "next/link";

const menu = [
  { label: "診断結果を見る", desc: "AIが提案したガクチカを確認", href: "/result",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><path d="M9 11l3 3 8-8M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "ガクチカを再診断する", desc: "もう一度10問に答える", href: "/start",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><path d="M21 4v6h-6M3 20v-6h6" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 10a7 7 0 00-13-2M5 14a7 7 0 0013 2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "志望設定を変更する", desc: "業界・職種を選び直す", href: "/target",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M18.4 5.6l-2 2M7.6 16.4l-2 2" strokeLinecap="round"/></svg> },
];

export default function MyPage() {
  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      {/* トップバー */}
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[18px] font-bold text-[#0A3059] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      {/* プロフィール */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round"/></svg>
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#0A3059]">ゲストユーザー</p>
            <span className="inline-block mt-1 text-[11px] font-bold text-[#F08300] border border-[#F08300] px-1.5 py-px rounded-sm">診断未完了</span>
          </div>
        </div>
      </div>

      {/* 診断ステータス */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="bg-white rounded border border-gray-200">
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#0096DF]" />
            <h2 className="text-[13px] font-bold text-[#0A3059]">診断ステータス</h2>
            <span className="ml-auto text-xs font-bold text-gray-500">0 / 10 問</span>
          </div>
          <div className="px-4 py-4">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#0096DF] rounded-full" style={{ width: "0%" }} />
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-3.5">10問の診断に答えると、あなたの強みに合ったガクチカをAIが提案します。</p>
            <Link href="/start" className="flex items-center justify-center gap-1.5 bg-[#F08300] text-white text-[15px] font-bold py-3 rounded hover:bg-[#d97600] transition-colors">
              診断を始める（無料）
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* メニュー */}
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-8">
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="w-1 h-4 bg-[#0096DF]" />
          <h2 className="text-[13px] font-bold text-[#0A3059]">メニュー</h2>
        </div>
        <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
          {menu.map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-3.5 px-4 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#c7cdd4"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z"/></svg>
            </Link>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-8">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
