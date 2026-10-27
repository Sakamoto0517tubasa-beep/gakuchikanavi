import Link from "next/link";

export default function MyPage() {
  const items = [
    {
      label: "診断結果を見る",
      desc: "AIが提案したガクチカを確認",
      href: "/result",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "ガクチカを再診断する",
      desc: "もう一度10問に答える",
      href: "/start",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M23 4v6h-6M1 20v-6h6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "志望設定を変更する",
      desc: "業界・職種を選び直す",
      href: "/target",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="#2563EB" strokeWidth="2" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#F2F4F8]">
      {/* プロフィールヘッダー */}
      <div className="bg-[#1A1A2E] px-5 pt-12 pb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.8" />
              <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white text-lg font-bold">ゲストユーザー</p>
            <p className="text-gray-300 text-sm mt-1">診断を完了しましょう</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 -mt-5">
        {/* 診断ステータスカード */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-800">診断ステータス</p>
            <span className="text-sm font-bold text-[#2563EB]">0%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "0%" }} />
          </div>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            診断を完了すると、あなた専用のガクチカ提案が保存されます。
          </p>
          <Link
            href="/start"
            className="mt-4 block w-full text-center bg-[#2563EB] text-white text-sm font-bold py-3 rounded-full hover:bg-[#1d4ed8] transition-colors"
          >
            診断を始める
          </Link>
        </div>

        {/* メニューリスト */}
        <p className="text-sm font-bold text-gray-500 mb-3 px-1">メニュー</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="w-11 h-11 bg-[#EFF4FF] rounded-xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M9 18l6-6-6-6" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">ガクチカナビ v1.0 · 無料</p>
      </div>
    </main>
  );
}
