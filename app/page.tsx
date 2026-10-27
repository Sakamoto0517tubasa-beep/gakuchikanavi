"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const doors = [
  { icon: "🎯", title: "得意・好きを診断", sub: "10問の選択式" },
  { icon: "🏢", title: "志望を入力", sub: "業界×職種を選択" },
  { icon: "✨", title: "AIが提案", sub: "理由＋始め方付き" },
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
        }, 600);
      }
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className={`w-full max-w-2xl text-center transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}>
        <p className="text-[#E94560] text-xs tracking-widest mb-3 uppercase">AI Career Navigator</p>
        <h1 className="text-5xl font-bold text-white mb-3">ガクチカナビ</h1>
        <p className="text-[#E94560] text-sm italic mb-10">
          「学歴は変えられないけど、ガクチカは変えられる。」
        </p>

        {/* 3枚の扉 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {doors.map((door, i) => {
            const isOpen = opened.includes(i);
            return (
              <button
                key={i}
                onClick={() => handleDoor(i)}
                className="relative h-52 perspective-1000 focus:outline-none"
                style={{ perspective: "1000px" }}
              >
                {/* 扉の外側（閉じた状態） */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center border-2 border-gray-600 bg-[#0F3460] transition-all duration-700"
                  style={{
                    transformOrigin: "left center",
                    transform: isOpen ? "rotateY(-75deg)" : "rotateY(0deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="text-[#E94560] text-xs font-bold mb-2 tracking-widest">STEP {i + 1}</span>
                  <span className="text-3xl mb-3">{door.icon}</span>
                  <p className="text-white text-sm font-bold mb-1">{door.title}</p>
                  <p className="text-gray-500 text-xs">{door.sub}</p>
                  <span className="text-gray-600 text-xs mt-4">クリックして開く</span>
                </div>

                {/* 扉の内側（開いた状態） */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center border-2 transition-all duration-500 ${
                    isOpen ? "border-[#E94560] bg-[#1A1A2E] opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-4xl mb-3">{door.icon}</span>
                  <p className="text-white text-sm font-bold">{door.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{door.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {opened.length === 0 && (
          <p className="text-gray-600 text-xs">3つの扉をすべて開くと診断スタート</p>
        )}
        {opened.length > 0 && opened.length < 3 && (
          <p className="text-gray-500 text-xs">あと{3 - opened.length}つ開けてください</p>
        )}
        {opened.length === 3 && (
          <p className="text-[#E94560] text-sm font-bold animate-pulse">診断を始めます...</p>
        )}
      </div>
    </main>
  );
}
