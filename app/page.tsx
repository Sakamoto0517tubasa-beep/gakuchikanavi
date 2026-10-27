"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#EEF1F5]">
      {/* トップバー */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[17px] font-bold text-[#0068B7] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      {/* ヒーロー */}
      <div className="bg-gradient-to-b from-[#0068B7] to-[#004f8c]">
        <div className="max-w-2xl mx-auto px-5 pt-9 pb-9">
          <div className="inline-block bg-[#EA5520] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm mb-4">
            新卒就活生向け・完全無料
          </div>
          <h1 className="text-[26px] leading-snug font-bold text-white mb-3">
            何をガクチカにすべきか、<br />AIが3分で教えてくれる。
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            あなたの強みと志望業界・職種を掛け合わせ、<br className="hidden sm:block" />
            選考で評価されるガクチカをAIが提案します。
          </p>
          <button
            onClick={() => router.push("/start")}
            className="flex items-center justify-center gap-2 w-full bg-[#EA5520] text-white text-[15px] font-bold py-3.5 rounded-full hover:bg-[#d4491a] transition-colors shadow-sm"
          >
            無料で診断を始める
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-blue-200 text-xs mt-3 text-center">所要時間 約3分／登録不要</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* こんな悩み */}
        <section className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <p className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#0068B7]" />
            こんな悩みはありませんか？
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "そもそも何をガクチカにすればいいか分からない",
              "ありきたりなエピソードしか書けない",
              "志望業界に刺さる強みが分からない",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                  <path d="M12 2l10 18H2L12 2z" stroke="#EA5520" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M12 9v4M12 16v.5" stroke="#EA5520" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-gray-700 leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 使い方 */}
        <h2 className="text-sm font-bold text-gray-800 mb-3 px-1 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#0068B7]" />
          診断の流れ
        </h2>
        <section className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 mb-6">
          {[
            { num: "1", title: "強みを診断", desc: "10問の質問に答えて、あなたの行動特性を分析します。" },
            { num: "2", title: "志望を入力", desc: "気になる業界と職種を選ぶだけ。" },
            { num: "3", title: "AIが提案", desc: "理由・始め方・面接フレーム付きで3つ提案します。" },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-4 px-5 py-4">
              <span className="w-7 h-7 shrink-0 bg-[#0068B7] text-white text-sm font-bold flex items-center justify-center rounded-full">
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
          className="w-full bg-[#EA5520] text-white text-[15px] font-bold py-4 rounded-full hover:bg-[#d4491a] transition-colors shadow-sm"
        >
          無料で診断を始める
        </button>
        <p className="text-xs text-gray-400 text-center mt-6">ガクチカナビ v1.0</p>
      </div>
    </main>
  );
}
