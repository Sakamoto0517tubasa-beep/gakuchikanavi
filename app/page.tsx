"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F5F5F0]" style={{ fontFamily: "'Helvetica Neue', Arial, 'Hiragino Sans', 'Yu Gothic', sans-serif" }}>
      {/* ヒーローセクション */}
      <div className="bg-[#1A1A2E] px-6 pt-16 pb-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-6 uppercase">AI Career Navigator</p>
          <h1 className="text-5xl font-light text-white mb-5 tracking-tight">ガクチカナビ</h1>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            得意・好き × 志望業界 × 職種を掛け合わせて<br />
            あなたに最適なガクチカをAIが提案します
          </p>
          <button
            onClick={() => router.push("/start")}
            className="bg-white text-[#1A1A2E] text-sm font-medium px-10 py-3 hover:bg-gray-100 transition-colors"
          >
            診断を始める
          </button>
          <p className="text-gray-600 text-xs mt-4">所要時間 約3分 · 無料</p>
        </div>
      </div>

      {/* サービス説明 */}
      <div className="max-w-xl mx-auto px-6 py-14">
        <p className="text-xs tracking-[0.2em] text-gray-400 mb-8 uppercase">How it works</p>
        <div className="flex flex-col gap-6">
          {[
            { num: "01", title: "強みを診断", desc: "10問の選択式で得意・好きを分析" },
            { num: "02", title: "志望を入力", desc: "業界と職種を選択するだけ" },
            { num: "03", title: "AIが提案", desc: "理由と始め方つきでガクチカをTOP3提案" },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-5 pb-6 border-b border-gray-200 last:border-0">
              <span className="text-xs text-gray-300 tracking-widest pt-1 w-6 shrink-0">{item.num}</span>
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/start")}
          className="mt-12 w-full bg-[#1A1A2E] text-white text-sm font-medium py-4 hover:bg-[#2a2a4e] transition-colors"
        >
          今すぐ診断する
        </button>
      </div>
    </main>
  );
}
