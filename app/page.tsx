"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const doors = [
  {
    step: "01",
    title: "強みを診断",
    sub: "得意・好きを10問で分析",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="10" r="6" stroke="#1A1A2E" strokeWidth="1.5" />
        <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "志望を入力",
    sub: "業界と職種を選択",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="#1A1A2E" strokeWidth="1.5" />
        <path d="M10 14h12M10 19h8" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 6V4M22 6V4" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "AIが提案",
    sub: "最適なガクチカをTOP3で",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2.8 8.6H28l-7.4 5.4 2.8 8.6L16 21.2 8.6 26.6l2.8-8.6L4 12.6h9.2L16 4z" stroke="#1A1A2E" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Home() {
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
      className={`min-h-screen bg-white flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ fontFamily: "'Helvetica Neue', Arial, 'Hiragino Sans', 'Yu Gothic', sans-serif" }}
    >
      {/* ヘッダー */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 uppercase">AI Career Navigator</p>
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">ガクチカナビ</h1>
        <p className="text-sm text-gray-400 italic">
          「学歴は変えられないけど、ガクチカは変えられる。」
        </p>
      </div>

      {/* 3つの扉 */}
      <div className="flex gap-6 mb-10">
        {doors.map((door, i) => {
          const isOpen = opened.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleDoor(i)}
              className="relative w-52 h-64 focus:outline-none group"
              style={{ perspective: "1200px" }}
            >
              {/* 扉（閉じた状態） */}
              <div
                className="absolute inset-0 bg-gray-50 border border-gray-200 transition-all duration-700"
                style={{
                  transformOrigin: "left center",
                  transform: isOpen ? "rotateY(-80deg)" : "rotateY(0deg)",
                  backfaceVisibility: "hidden",
                  boxShadow: isOpen ? "none" : "2px 0 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* 上部パネル線 */}
                <div className="absolute top-5 left-5 right-5 h-px bg-gray-200" />
                <div className="absolute bottom-12 left-5 right-5 h-px bg-gray-200" />

                {/* ステップ番号 */}
                <div className="absolute top-8 left-0 right-0 text-center">
                  <span className="text-xs tracking-[0.25em] text-gray-300">{door.step}</span>
                </div>

                {/* タイトル */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="text-gray-700">{door.icon}</div>
                  <p className="text-sm font-medium text-gray-700 tracking-wide">{door.title}</p>
                  <p className="text-xs text-gray-400">{door.sub}</p>
                </div>

                {/* ドアノブ */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors" />
              </div>

              {/* 開いた後の内側 */}
              <div
                className={`absolute inset-0 border transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                  isOpen ? "border-gray-900 bg-white opacity-100" : "opacity-0 border-gray-200"
                }`}
              >
                <div className="text-gray-900">{door.icon}</div>
                <p className="text-sm font-medium text-gray-900">{door.title}</p>
                <p className="text-xs text-gray-400">{door.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ガイドテキスト */}
      <div className="h-6 text-center">
        {opened.length === 0 && (
          <p className="text-xs text-gray-300 tracking-widest">3 つの扉をすべて開いてください</p>
        )}
        {opened.length > 0 && opened.length < 3 && (
          <p className="text-xs text-gray-400">あと {3 - opened.length} つ</p>
        )}
        {opened.length === 3 && (
          <p className="text-xs text-gray-900 tracking-widest">診断を始めます</p>
        )}
      </div>
    </main>
  );
}
