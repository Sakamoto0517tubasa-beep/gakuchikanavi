import Link from "next/link";

export default function MyPage() {
  const items = [
    { label: "診断結果を見る", href: "/result" },
    { label: "ガクチカを再診断する", href: "/start" },
    { label: "志望設定を変更する", href: "/target" },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <div className="bg-[#1A1A2E] px-5 pt-10 pb-8">
        <p className="text-xs tracking-[0.2em] text-gray-500 mb-2 uppercase">My Page</p>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#2a2a4e] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#aaa" strokeWidth="1.5" />
              <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium">ゲストユーザー</p>
            <p className="text-gray-500 text-xs mt-0.5">診断未完了</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6">
        {/* 診断ステータス */}
        <div className="bg-white p-5 mb-5">
          <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">診断ステータス</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-gray-100">
              <div className="h-1 bg-[#1A1A2E] w-0" />
            </div>
            <span className="text-xs text-gray-400">0%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">診断を完了するとマイページが充実します</p>
        </div>

        {/* メニュー */}
        <div className="bg-white mb-5">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="text-xs text-gray-300 text-center">ガクチカナビ v1.0 · 無料</p>
      </div>
    </main>
  );
}
