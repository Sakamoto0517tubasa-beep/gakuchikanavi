"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { industries, jobTypes } from "@/lib/questions";

export default function TargetPage() {
  const router = useRouter();
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState("");
  const [currentGakuchika, setCurrentGakuchika] = useState("");

  function handleSubmit() {
    if (!industry || !jobType) return;
    sessionStorage.setItem("industry", industry);
    sessionStorage.setItem("jobType", jobType);
    sessionStorage.setItem("currentGakuchika", currentGakuchika);
    router.push("/result");
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">志望を教えてください</h2>
        <p className="text-gray-400 text-sm mb-8">AIがあなたに合ったガクチカを提案します</p>

        {/* 業界 */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1A1A2E] mb-3">志望業界</label>
          <div className="grid grid-cols-2 gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-4 py-3 rounded border text-sm font-medium transition-all ${
                  industry === ind
                    ? "border-[#C8102E] bg-[#FDF0F2] text-[#C8102E]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* 職種 */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1A1A2E] mb-3">志望職種</label>
          <div className="grid grid-cols-2 gap-2">
            {jobTypes.map((job) => (
              <button
                key={job}
                onClick={() => setJobType(job)}
                className={`px-4 py-3 rounded border text-sm font-medium transition-all ${
                  jobType === job
                    ? "border-[#C8102E] bg-[#FDF0F2] text-[#C8102E]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {job}
              </button>
            ))}
          </div>
        </div>

        {/* 現在のガクチカ */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
            現在のガクチカ <span className="text-gray-400 font-normal">（任意）</span>
          </label>
          <textarea
            value={currentGakuchika}
            onChange={(e) => setCurrentGakuchika(e.target.value)}
            placeholder="例：アルバイトでホールスタッフをしています"
            rows={3}
            className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#C8102E] resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!industry || !jobType}
          className="w-full bg-[#C8102E] text-white text-[15px] font-bold py-4 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#a60d26] transition-colors"
        >
          AIに提案してもらう →
        </button>
      </div>
    </main>
  );
}
