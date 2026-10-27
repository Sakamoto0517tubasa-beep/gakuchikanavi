import Link from "next/link";

export default function MyPage() {
  const items = [
    { label: "診断結果を見る", desc: "AIが提案したガクチカを確認", href: "/result" },
    { label: "ガクチカを再診断する", desc: "もう一度10問に答える", href: "/start" },
    { label: "志望設定を変更する", desc: "業界・職種を選び直す", href: "/target" },
  ];

  return (
    <main className="min-h-screen bg-[#F2F4F8]">
      {/* プロフィール */}
      <div className="bg-[#1A1A2E] px-5 pt-11 pb-7">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="#fff" strokeWidth="1.6" />
              <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white text-base font-bold tracking-wide">ゲストユーザー</p>
            <p className="text-gray-400 text-[13px] mt-0.5">診断未完了</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        {/* 診断ステータス */}
        <section className="bg-white border border-gray-200 rounded-md">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-gray-700">診断ステータス</h2>
            <span className="text-[13px] font-bold text-[#C8102E]">未完了</span>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-1.5 bg-gray-100 overflow-hidden">
                <div className="h-full bg-[#1A1A2E]" style={{ width: "0%" }} />
              </div>
              <span className="text-xs font-bold text-gray-500 tabular-nums">0 / 10</span>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              10問の診断に答えると、あなたの強みに合ったガクチカをAIが提案します。
            </p>
            <Link
              href="/start"
              className="mt-4 inline-flex items-center gap-1.5 bg-[#C8102E] text-white text-sm font-bold px-6 py-2.5 rounded hover:bg-[#a60d26] transition-colors"
            >
              診断を始める
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        {/* メニュー */}
        <div className="mt-6 mb-2 flex items-center gap-2 px-1">
          <span className="w-1 h-3.5 bg-[#1A1A2E]" />
          <h2 className="text-[13px] font-bold text-gray-700">メニュー</h2>
        </div>
        <section className="bg-white border border-gray-200 rounded-md overflow-hidden">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-300">
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
