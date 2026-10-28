import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    { h: "取得する情報", b: "本サービスは会員登録不要で利用でき、氏名・メールアドレス等の個人を特定する情報は取得しません。診断の回答や作成したガクチカは、お使いの端末（ブラウザのローカルストレージ）にのみ保存され、サーバーには保存されません。" },
    { h: "AI処理について", b: "診断・ガクチカ生成のため、入力内容（回答・志望業界・職種など）は外部のAIサービスに送信され処理されます。個人を特定する情報は送信しないようご注意ください。" },
    { h: "データの管理", b: "端末に保存されたデータは、ブラウザの履歴・データ削除を行うことでいつでも消去できます。マイページの各項目からも削除できます。" },
    { h: "Cookie・アクセス解析", b: "本サービスはサービス改善のため、匿名のアクセス情報を利用する場合があります。個人を特定する目的では利用しません。" },
    { h: "お問い合わせ", b: "本ポリシーに関するお問い合わせは、サービス運営者までご連絡ください。" },
  ];
  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <Link href="/mypage" className="text-[#0A3059] text-[13px] flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#0A3059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            戻る
          </Link>
          <span className="ml-3 text-[15px] font-medium text-[#0A3059]">プライバシーポリシー</span>
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
