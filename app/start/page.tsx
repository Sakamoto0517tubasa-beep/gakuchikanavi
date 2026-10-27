"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const doors = [
  {
    step: "01",
    title: "強みを診断",
    sub: "得意・好きを10問で分析",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "志望を入力",
    sub: "業界と職種を選択",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 14h12M10 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 6V4M22 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "AIが提案",
    sub: "ガクチカをTOP3で提案",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2.8 8.6H28l-7.4 5.4 2.8 8.6L16 21.2 8.6 26.6l2.8-8.6L4 12.6h9.2L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function StartPage() {
  const router = useRouter();
  const [opened, setOpened] = useState<number[]>([]);
  const [leaving, setLeaving] = useState(false);

  function handleDoor(i: number) {
    setOpened((prev) => {
      if (prev.includes(i)) return prev;
      const next = [...prev, i];
      if (next.length === 3) {
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => router.push("/quiz"), 600);
        }, 500);
      }
      return next;
    });
  }

  return (
    <main
      className={`min-h-screen bg-[#F2F4F8] flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ fontFamily: "'Helvetica Neue', Arial, 'Hiragino Sans', 'Yu Gothic', sans-serif" }}
    >
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">3つの扉を開いてください</h2>
        <p className="text-sm text-gray-500">診断・志望入力・AI提案の3ステップで進みます</p>
      </div>

      {/* 3つの扉 */}
      <div className="flex gap-5 mb-10">
        {doors.map((door, i) => {
          const isOpen = opened.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleDoor(i)}
              className="relative w-48 h-60 focus:outline-none group"
              style={{ perspective: "1200px" }}
            >
              {/* 扉（閉じた状態） */}
              <div
                className="absolute inset-0 bg-white border border-gray-200 transition-all duration-700 shadow-sm group-hover:shadow-md"
                style={{
                  transformOrigin: "left center",
                  transform: isOpen ? "rotateY(-80deg)" : "rotateY(0deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* パネル線 */}
                <div className="absolute top-5 left-4 right-4 h-px bg-gray-100" />
                <div className="absolute bottom-10 left-4 right-4 h-px bg-gray-100" />

                {/* ステップ番号 */}
                <div className="absolute top-8 left-0 right-0 text-center">
                  <span className="text-xs tracking-[0.2em] text-gray-300">{door.step}</span>
                </div>

                {/* 中身 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-600">
                  {door.icon}
                  <p className="text-sm font-medium text-gray-700">{door.title}</p>
                  <p className="text-xs text-gray-400">{door.sub}</p>
                </div>

                {/* ドアノブ */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300" />
              </div>

              {/* 開いた後 */}
              <div
                className={`absolute inset-0 border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                  isOpen ? "border-[#C8102E] bg-[#1A1A2E] opacity-100" : "opacity-0 border-gray-200"
                }`}
              >
                <div className="text-white">{door.icon}</div>
                <p className="text-sm font-medium text-white">{door.title}</p>
                <p className="text-xs text-gray-400">{door.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ガイドテキスト */}
      <div className="h-5 text-center">
        {opened.length === 0 && (
          <p className="text-xs text-gray-300 tracking-widest">クリックして開く</p>
        )}
        {opened.length > 0 && opened.length < 3 && (
          <p className="text-xs text-gray-400">あと {3 - opened.length} つ</p>
        )}
        {opened.length === 3 && (
          <p className="text-xs text-gray-700 tracking-widest">診断を始めます...</p>
        )}
      </div>

      <button onClick={() => router.back()} className="mt-10 text-xs text-gray-300 hover:text-gray-400 transition-colors">
        ← 戻る
      </button>
    </main>
  );
}
