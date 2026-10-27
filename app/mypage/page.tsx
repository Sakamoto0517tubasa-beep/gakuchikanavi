import Link from "next/link";

const menu = [
  {
    label: "診断結果を見る",
    desc: "AIが提案したガクチカを確認",
    href: "/result",
    bg: "#0068B7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-4-4 1.4-1.4L10 14.2l6.6-6.6L18 9l-8 8z" />
      </svg>
    ),
  },
  {
    label: "ガクチカを再診断する",
    desc: "もう一度10問に答える",
    href: "/start",
    bg: "#00997A",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.65 6.35A7.95 7.95 0 0012 4a8 8 0 100 16 8 8 0 007.74-6h-2.08A6 6 0 0112 18 6 6 0 1112 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
      </svg>
    ),
  },
  {
    label: "志望設定を変更する",
    desc: "業界・職種を選び直す",
    href: "/target",
    bg: "#7C5CBF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 00-.48-.41h-3.84a.48.48 0 00-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 00-.59.22L2.74 8.87a.48.48 0 00.12.61l2.03 1.58c-.05.3-.07.62-.07.94 0 .32.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.3.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.03-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z" />
      </svg>
    ),
  },
];

export default function MyPage() {
  return (
    <main className="min-h-screen bg-[#EEF1F5]">
      {/* トップバー */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[17px] font-bold text-[#0068B7] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      {/* プロフィール */}
      <div className="bg-gradient-to-br from-[#0071c5] to-[#004a84] relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="max-w-2xl mx-auto px-5 py-6 relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#0068B7">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-[17px] font-bold">ゲストユーザー</p>
            <span className="inline-block mt-1.5 text-[11px] font-bold text-white bg-[#EA5520] px-2 py-0.5 rounded-sm">
              診断未完了
            </span>
          </div>
        </div>
      </div>

      {/* 診断CTAバナー */}
      <div className="max-w-2xl mx-auto px-4 -mt-3 relative">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-gray-800">診断の進捗</p>
              <span className="text-xs font-bold text-gray-500 tabular-nums">0 / 10 問</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-[#0068B7] to-[#EA5520] rounded-full" style={{ width: "4%" }} />
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
              あと<span className="font-bold text-[#EA5520]">10問</span>の診断で、あなたの強みに合ったガクチカをAIが提案します。
            </p>
            <Link
              href="/start"
              className="flex items-center justify-center gap-1.5 bg-[#EA5520] text-white text-[15px] font-bold py-3.5 rounded-full hover:bg-[#d4491a] transition-colors shadow-md"
            >
              診断を始める（無料）
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* メニュー */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
        <h2 className="text-[13px] font-bold text-gray-500 mb-2.5 px-1">メニュー</h2>
        <div className="flex flex-col gap-2.5">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-3.5 px-4 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: item.bg }}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#c7cdd4">
                <path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.41l4.58-4.58a1 1 0 000-1.41L10.71 6.7a1 1 0 00-1.42.01z" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 text-center mt-8">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
