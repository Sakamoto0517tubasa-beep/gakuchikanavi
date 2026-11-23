"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const doors = [
  {
    step: "01",
    title: "強みを診断",
    sub: "得意・好きを質問で分析",
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
    sub: "あなたに合うガクチカを10個提案",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2.8 8.6H28l-7.4 5.4 2.8 8.6L16 21.2 8.6 26.6l2.8-8.6L4 12.6h9.2L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function StartPage() {
  const router = useRouter();
  const [grade, setGrade] = useState("");

  function selectGrade(g: string) {
    sessionStorage.setItem("grade", g);
    setGrade(g);
  }

  if (!grade) {
    return (
      <main className="min-h-screen bg-[#EEF1F5] flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-[#0A3059] mb-2">まず学年を教えてください</h2>
          <p className="text-sm text-gray-500 mb-8">学年に合わせて、質問と提案の内容が変わります</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => selectGrade("1・2年生")}
              className="w-full bg-white border border-gray-300 rounded-lg px-5 py-4 text-left hover:border-[#0096DF] hover:bg-[#EAF4FB] transition-all"
            >
              <span className="block text-base font-medium text-[#0A3059]">1・2年生</span>
              <span className="block text-[13px] text-gray-500 mt-0.5">時間を活かして、じっくり育てるガクチカを提案</span>
            </button>
            <button
              onClick={() => selectGrade("3年生")}
              className="w-full bg-white border border-gray-300 rounded-lg px-5 py-4 text-left hover:border-[#0096DF] hover:bg-[#EAF4FB] transition-all"
            >
              <span className="block text-base font-medium text-[#0A3059]">3年生</span>
              <span className="block text-[13px] text-gray-500 mt-0.5">今から間に合う、短期で語れるガクチカを提案</span>
            </button>
          </div>
          <button onClick={() => router.back()} className="mt-8 text-xs text-gray-400 hover:text-gray-500 transition-colors">
            ← 戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEF1F5] flex flex-col items-center justify-center px-6 py-10">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">3ステップで進みます</h2>
        <p className="text-sm text-gray-500">診断・志望入力・AI提案の3ステップ</p>
      </div>

      {/* 3つのステップ */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-5 mb-8 w-full max-w-md">
        {doors.map((door, i) => (
          <div key={i} className="relative w-full aspect-[4/5] bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* ステップ番号 */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.2em] text-gray-400">{door.step}</span>
            </div>
            {/* 中身 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 px-1.5 text-center text-[#0096DF]">
              {door.icon}
              <p className="text-[13px] sm:text-sm font-medium text-gray-800 leading-tight">{door.title}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{door.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 診断を始めるボタン（赤） */}
      <button
        onClick={() => router.push("/quiz")}
        className="w-full max-w-md bg-[#E60012] text-white text-[16px] font-bold py-4 rounded-lg flex items-center justify-center gap-2 active:scale-[0.99] hover:bg-[#c5000f] transition-all shadow-sm"
      >
        診断を始める
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <button onClick={() => router.back()} className="mt-8 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
        ← 戻る
      </button>
    </main>
  );
}
