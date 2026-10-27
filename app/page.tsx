import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-[#1A1A2E] mb-4">ガクチカナビ</h1>
        <p className="text-[#E94560] text-lg italic mb-8">
          「学歴は変えられないけど、ガクチカは変えられる。」
        </p>
        <p className="text-gray-600 text-base mb-12 leading-relaxed">
          得意・好き × 志望業界 × 職種をAIが掛け合わせて、<br />
          あなたに最適なガクチカをTOP3で提案します。
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/quiz"
            className="bg-[#E94560] text-white text-lg font-bold px-10 py-4 rounded-full hover:bg-[#c73550] transition-colors w-full max-w-sm text-center"
          >
            診断スタート →
          </Link>
          <p className="text-gray-400 text-sm">所要時間：約3分　無料</p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-bold text-[#1A1A2E]">得意・好きを診断</p>
            <p className="text-xs text-gray-400 mt-1">10問の選択式</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🏢</div>
            <p className="text-sm font-bold text-[#1A1A2E]">志望を入力</p>
            <p className="text-xs text-gray-400 mt-1">業界×職種を選択</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-sm font-bold text-[#1A1A2E]">AIが提案</p>
            <p className="text-xs text-gray-400 mt-1">理由＋始め方付き</p>
          </div>
        </div>
      </div>
    </main>
  );
}
