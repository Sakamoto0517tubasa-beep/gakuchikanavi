import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { industry, jobType } = await req.json();

  // MVP用ダミーデータ（APIキー取得後にClaude APIに差し替え）
  const suggestions = [
    {
      rank: 1,
      title: `${industry}系${jobType}インターンでの新規提案経験`,
      reason: `${industry}の${jobType}職では、主体的に動いて成果を出した経験が高く評価されます。インターンで実際のビジネス課題に取り組んだ経験は、即戦力として期待されるアピールになります。`,
      howToStart: `Wantedly・Offerboxで「${industry}」「${jobType}」で検索し、1ヶ月以内に応募する。まず1社でも経験を積むことが大事です。`,
      period: "3ヶ月〜半年",
    },
    {
      rank: 2,
      title: "学園祭・サークルでのリーダー・企画経験",
      reason: `チームをまとめてゼロから何かを作り上げた経験は、${jobType}として必要なプロジェクト推進力の証明になります。規模より「何を考えて動いたか」が重要です。`,
      howToStart: "所属しているサークルや学内イベントで幹部・企画担当に立候補する。なければ学内の公募プロジェクトを探す。",
      period: "半年〜1年",
    },
    {
      rank: 3,
      title: "個人での発信・制作活動（SNS・ブログ・作品）",
      reason: `自分で考えて継続的に発信・制作した経験は、自律性と行動力の証明になります。${industry}業界では個人の発信力が評価される場面も多いです。`,
      howToStart: "今日からXやnoteで業界に関連するテーマで発信を始める。週1投稿を3ヶ月続けるだけで十分なガクチカになります。",
      period: "3ヶ月〜",
    },
  ];

  // 擬似的なAI処理感を演出
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json({ suggestions });
}
