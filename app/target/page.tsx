"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { industries, jobTypes } from "@/lib/questions";

const UNDECIDED = "まだ決めていない";

export default function TargetPage() {
  const router = useRouter();
  const [industry, setIndustry] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [currentGakuchika, setCurrentGakuchika] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("quizAnswers")) router.replace("/start");
  }, [router]);

  // 複数選択トグル。「まだ決めていない」は他の選択肢と排他にする
  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    if (value === UNDECIDED) {
      setList(list.includes(UNDECIDED) ? [] : [UNDECIDED]);
      return;
    }
    const base = list.filter((x) => x !== UNDECIDED);
    setList(base.includes(value) ? base.filter((x) => x !== value) : [...base, value]);
  }

  function handleSubmit() {
    if (industry.length === 0 || jobType.length === 0) return;
    sessionStorage.setItem("industry", industry.join("、"));
    sessionStorage.setItem("jobType", jobType.join("、"));
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
          <label className="block text-sm font-bold text-[#1A1A2E] mb-1">志望業界 <span className="text-gray-400 font-normal text-xs">（複数選択OK）</span></label>
          <p className="text-[12px] text-gray-400 mb-3">当てはまるものをすべて選んでください</p>
          <div className="grid grid-cols-2 gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => toggle(industry, setIndustry, ind)}
                className={`px-4 py-3 rounded border text-sm font-medium transition-all ${
                  industry.includes(ind)
                    ? "border-[#0096DF] bg-[#EAF4FB] text-[#0A3059]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
          <button
            onClick={() => toggle(industry, setIndustry, UNDECIDED)}
            className={`mt-2 w-full px-4 py-3 rounded border text-sm font-medium transition-all ${
              industry.includes(UNDECIDED)
                ? "border-[#0096DF] bg-[#EAF4FB] text-[#0A3059]"
                : "border-dashed border-gray-300 text-gray-500 hover:border-gray-400"
            }`}
          >
            まだ決めていない
          </button>
        </div>

        {/* 職種 */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1A1A2E] mb-1">志望職種 <span className="text-gray-400 font-normal text-xs">（複数選択OK）</span></label>
          <p className="text-[12px] text-gray-400 mb-3">当てはまるものをすべて選んでください</p>
          <div className="grid grid-cols-2 gap-2">
            {jobTypes.map((job) => (
              <button
                key={job}
                onClick={() => toggle(jobType, setJobType, job)}
                className={`px-4 py-3 rounded border text-sm font-medium transition-all ${
                  jobType.includes(job)
                    ? "border-[#0096DF] bg-[#EAF4FB] text-[#0A3059]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {job}
              </button>
            ))}
          </div>
          <button
            onClick={() => toggle(jobType, setJobType, UNDECIDED)}
            className={`mt-2 w-full px-4 py-3 rounded border text-sm font-medium transition-all ${
              jobType.includes(UNDECIDED)
                ? "border-[#0096DF] bg-[#EAF4FB] text-[#0A3059]"
                : "border-dashed border-gray-300 text-gray-500 hover:border-gray-400"
            }`}
          >
            まだ決めていない
          </button>
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
            className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0096DF] resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={industry.length === 0 || jobType.length === 0}
          className="w-full bg-[#F08300] text-white text-[15px] font-bold py-4 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d97600] transition-colors"
        >
          AIに提案してもらう →
        </button>
        {(industry.length === 0 || jobType.length === 0) && (
          <p className="text-[12px] text-gray-400 text-center mt-2.5">志望業界と志望職種をそれぞれ1つ以上選択してください</p>
        )}
      </div>
    </main>
  );
}
