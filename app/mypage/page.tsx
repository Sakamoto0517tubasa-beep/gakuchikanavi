import Link from "next/link";

export default function MyPage() {
  const items = [
    {
      label: "診断結果を見る",
      desc: "AIが提案したガクチカを確認",
      href: "/result",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0068B7" strokeWidth="1.8" />
          <path d="M8 12l3 3 5-6" stroke="#0068B7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "ガクチカを再診断する",
      desc: "もう一度10問に答える",
      href: "/start",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M21 4v6h-6M3 20v-6h6" stroke="#0068B7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 10a7 7 0 00-13-2M5 14a7 7 0 0013 2" stroke="#0068B7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "志望設定を変更する",
      desc: "業界・職種を選び直す",
      href: "/target",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="#0068B7" strokeWidth="1.8" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="#0068B7" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#EEF1F5]">
      {/* トップバー */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[17px] font-bold text-[#0068B7] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* プロフィールカード */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#EEF1F5] border border-gray-200 flex items-center justify-center shrink-0">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3.5" stroke="#9aa5b1" strokeWidth="1.6" />
                <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#9aa5b1" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-gray-800">ゲストユーザー</p>
              <span className="inline-block mt-1 text-[11px] font-bold text-[#EA5520] bg-[#FDEEE6] px-2 py-0.5 rounded-sm">
                診断未完了
              </span>
            </div>
          </div>
        </section>

        {/* 診断ステータス */}
        <section className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-5">
          <div className="bg-[#0068B7] px-4 py-2.5">
            <h2 className="text-[13px] font-bold text-white">診断ステータス</h2>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0068B7] rounded-full" style={{ width: "0%" }} />
              </div>
              <span className="text-xs font-bold text-gray-600 tabular-nums shrink-0">0 / 10 問</span>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              10問の診断に答えると、あなたの強みに合ったガクチカをAIが提案します。
            </p>
            <Link
              href="/start"
              className="mt-4 flex items-center justify-center gap-1.5 bg-[#EA5520] text-white text-[15px] font-bold py-3.5 rounded-full hover:bg-[#d4491a] transition-colors"
            >
              診断を始める（無料）
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        {/* メニュー */}
        <h2 className="text-[13px] font-bold text-gray-500 mb-2 px-1">メニュー</h2>
        <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-3.5 px-4 py-4 border-b border-gray-100 last:border-0 hover:bg-[#F7F9FB] transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-[#EAF3FB] flex items-center justify-center shrink-0">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-300">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </section>

        <p className="text-[11px] text-gray-400 text-center mt-8">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
