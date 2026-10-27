"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    setOpening(true);
    setTimeout(() => router.push("/quiz"), 800);
  }

  return (
    <main className="min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* 扉アニメーション */}
      <div className={`fixed inset-0 z-50 flex pointer-events-none transition-all duration-700 ${opening ? "opacity-0" : "opacity-0"}`}>
        <div className={`w-1/2 h-full bg-[#1A1A2E] transition-transform duration-700 ${opening ? "-translate-x-full" : "translate-x-0"}`} />
        <div className={`w-1/2 h-full bg-[#1A1A2E] transition-transform duration-700 ${opening ? "translate-x-full" : "translate-x-0"}`} />
      </div>

      <div className={`max-w-2xl w-full text-center transition-opacity duration-300 ${opening ? "opacity-0" : "opacity-100"}`}>
        {/* ロゴ */}
        <p className="text-[#E94560] text-sm tracking-widest mb-4 uppercase">AI Career Navigator</p>
        <h1 className="text-6xl font-bold text-white mb-6">ガクチカナビ</h1>
        <p className="text-[#E94560] text-lg italic mb-10">
          「学歴は変えられないけど、ガクチカは変えられる。」
        </p>
        <p className="text-gray-400 text-sm mb-14 leading-relaxed">
          得意・好き × 志望業界 × 職種をAIが掛け合わせて<br />
          あなたに最適なガクチカをTOP3で提案します
        </p>

        {/* 扉ボタン */}
        <button
          onClick={handleOpen}
          className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-[#E94560] text-white text-lg font-bold px-12 py-5 rounded-none hover:bg-[#E94560] transition-all duration-300"
        >
          <span className="text-[#E94560] group-hover:text-white transition-colors">扉を開く</span>
          <span className="text-[#E94560] group-hover:text-white transition-colors text-2xl">→</span>
        </button>

        <p className="text-gray-600 text-xs mt-6">所要時間：約3分　無料</p>

        {/* ステップ */}
        <div className="mt-16 grid grid-cols-3 gap-6 text-center border-t border-gray-800 pt-10">
          <div>
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs font-bold text-gray-300">得意・好きを診断</p>
            <p className="text-xs text-gray-600 mt-1">10問の選択式</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🏢</div>
            <p className="text-xs font-bold text-gray-300">志望を入力</p>
            <p className="text-xs text-gray-600 mt-1">業界×職種を選択</p>
          </div>
          <div>
            <div className="text-2xl mb-2">✨</div>
            <p className="text-xs font-bold text-gray-300">AIが提案</p>
            <p className="text-xs text-gray-600 mt-1">理由＋始め方付き</p>
          </div>
        </div>
      </div>
    </main>
  );
}
