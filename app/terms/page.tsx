import Link from "next/link";

export default function TermsPage() {
  const sections = [
    { h: "第1条（本サービスについて）", b: "ガクチカナビ（以下「本サービス」）は、AIを用いて学生のガクチカ（学生時代に力を入れたこと）づくりを支援する情報提供サービスです。" },
    { h: "第2条（利用料金）", b: "本サービスは無料でご利用いただけます。会員登録は不要です。" },
    { h: "第3条（AI提案の位置づけ）", b: "本サービスがAIにより生成する提案・文章はあくまで参考情報です。内容の正確性・有用性・選考での効果を保証するものではありません。最終的な判断はご自身の責任で行ってください。" },
    { h: "第4条（企業情報・ロゴ）", b: "本サービスに掲載する企業情報は一般に公開された情報をもとにしています。企業ロゴは各社に帰属し、本サービスとの提携・推薦関係を示すものではありません。スカウト機能はデモ表示であり、実際の企業からのオファーではありません。" },
    { h: "第5条（禁止事項）", b: "法令または公序良俗に違反する行為、本サービスの運営を妨げる行為、第三者の権利を侵害する行為を禁止します。" },
    { h: "第6条（免責）", b: "本サービスの利用により生じたいかなる損害についても、運営者は責任を負いません。本サービスは予告なく内容の変更・停止を行うことがあります。" },
    { h: "第7条（規約の変更）", b: "本規約は必要に応じて変更されることがあります。変更後の規約は本ページに掲示した時点で効力を生じます。" },
  ];
  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <Link href="/mypage" className="text-[#0A3059] text-[13px] flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#0A3059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            戻る
          </Link>
          <span className="ml-3 text-[15px] font-medium text-[#0A3059]">利用規約</span>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded border border-gray-200 px-5 py-5 flex flex-col gap-5">
          {sections.map((s, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-[#0A3059] mb-1.5">{s.h}</p>
              <p className="text-[13px] text-gray-600 leading-relaxed">{s.b}</p>
            </div>
          ))}
          <p className="text-[11px] text-gray-400 pt-2">制定日：2026年10月</p>
        </div>
      </div>
    </main>
  );
}
