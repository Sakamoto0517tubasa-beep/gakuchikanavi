"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F2F4F8]">
      {/* ヒーロー */}
      <div className="bg-[#1A1A2E]">
        <div className="max-w-2xl mx-auto px-5 pt-12 pb-10">
          <div className="inline-block bg-[#C8102E] text-white text-[11px] font-bold px-2.5 py-1 mb-4">
            新卒就活生向け・無料
          </div>
          <h1 className="text-[28px] leading-snug font-bold text-white mb-3">
            何をガクチカにすべきか、<br />AIが3分で教えてくれる。
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed mb-7">
            あなたの強みと志望業界・職種を掛け合わせ、<br className="hidden sm:block" />
            選考で評価されるガクチカをAIが提案します。
          </p>
          <button
            onClick={() => router.push("/start")}
            className="inline-flex items-center gap-2 bg-[#C8102E] text-white text-[15px] font-bold px-8 py-3.5 rounded hover:bg-[#a60d26] transition-colors"
          >
            無料で診断を始める
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-gray-500 text-xs mt-3">所要時間 約3分／登録不要</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* こんな悩み */}
        <section className="bg-white border border-gray-200 rounded-md p-5 mb-8">
          <p className="text-sm font-bold text-gray-800 mb-4">こんな悩みはありませんか？</p>
          <ul className="flex flex-col gap-3">
            {[
              "そもそも何をガクチカにすればいいか分からない",
              "ありきたりなエピソードしか書けない",
              "志望業界に刺さる強みが分からない",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" stroke="#C8102E" strokeWidth="1.6" />
                  <path d="M12 8v5M12 16v.5" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-gray-700 leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 使い方 */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="w-1 h-4 bg-[#C8102E]" />
          <h2 className="text-sm font-bold text-gray-800">診断の流れ</h2>
        </div>
        <section className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100 mb-8">
          {[
            { num: "1", title: "強みを診断", desc: "10問の質問に答えて、あなたの行動特性を分析します。" },
            { num: "2", title: "志望を入力", desc: "気になる業界と職種を選ぶだけ。" },
            { num: "3", title: "AIが提案", desc: "理由・始め方・面接フレーム付きで3つ提案します。" },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-4 px-5 py-4">
              <span className="w-7 h-7 shrink-0 bg-[#1A1A2E] text-white text-sm font-bold flex items-center justify-center rounded-full">
                {item.num}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <button
          onClick={() => router.push("/start")}
          className="w-full bg-[#C8102E] text-white text-[15px] font-bold py-4 rounded hover:bg-[#a60d26] transition-colors"
        >
          無料で診断を始める
        </button>
        <p className="text-xs text-gray-400 text-center mt-6">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
