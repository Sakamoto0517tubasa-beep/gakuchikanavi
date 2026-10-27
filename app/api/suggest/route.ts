import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// 環境変数にBOMや不可視文字が混入しても動くよう、ASCII印字可能文字だけに浄化する
const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

const ANSWER_LABELS: Record<string, string> = {
  gather_people: "すぐに人を集めて話し合う",
  research_first: "まず自分でデータや情報を調べる",
  use_experience: "過去の経験から解決策を考える",
  try_new: "新しいアプローチを試してみる",
  influence: "人を動かす・巻き込む力",
  accuracy: "細かいことを正確にやり切る力",
  creativity: "アイデアを次々と出す力",
  persistence: "最後まで諦めずやり続ける力",
  gratitude: "誰かに「ありがとう」と言われたとき",
  achievement: "目標を達成して数字で成果が出たとき",
  creation: "ゼロから作ったものが完成したとき",
  teamwork: "チームが一体となって盛り上がったとき",
  leader: "全体を引っ張るリーダー",
  planner: "アイデアを出す参謀・企画役",
  coordinator: "チームをまとめる調整役",
  specialist: "専門分野で貢献するスペシャリスト",
  action_first: "とにかくやってみて後で修正する",
  plan_first: "しっかり計画を立ててから動く",
  consult_first: "信頼できる人に相談してから動く",
  benchmark: "成功例を調べてから真似して始める",
  social_impact: "社会や人の役に立つこと",
  self_growth: "自分の成長・スキルアップ",
  team_achievement: "チームの仲間と達成する喜び",
  innovation: "新しいものを生み出すこと",
  club_sports: "部活・サークル・スポーツ",
  part_time: "アルバイト・仕事経験",
  study: "勉強・研究・資格取得",
  social_volunteer: "ボランティア・地域活動・海外経験",
  grit: "根性で乗り越えた（量でカバー）",
  kaizen: "工夫・改善を繰り返した",
  rely_on_others: "仲間や周囲を頼った",
  reframe: "全く別の視点・方法を試した",
  data_lover: "得意で積極的に使う",
  data_neutral: "必要なら使えるがあまり好きではない",
  data_challenge: "苦手だが克服しようとしている",
  intuition: "感覚・直感の方が信頼できると思う",
  future_leader: "多くの人に影響を与えるリーダー",
  future_expert: "特定分野の第一人者・エキスパート",
  future_entrepreneur: "新しいビジネス・サービスを作った起業家",
  future_changemaker: "社会問題を解決したチェンジメーカー",
};

const QUESTION_LABELS: Record<number, string> = {
  1: "問題が起きたときの行動",
  2: "得意なこと・強み",
  3: "やる気が上がる瞬間",
  4: "グループでの自然なポジション",
  5: "新しいことを始めるときのスタイル",
  6: "仕事・活動で最も大切にしたいこと",
  7: "学生生活で最も時間を使ってきたこと",
  8: "困難な状況での乗り越え方",
  9: "データ・数字との向き合い方",
  10: "10年後になりたい姿",
};

export async function POST(req: NextRequest) {
  try {
    const { answers, industry, jobType, currentGakuchika } = await req.json();

    const answerSummary = Object.entries(answers as Record<string, string>)
      .map(([id, val]) => `・${QUESTION_LABELS[Number(id)]}: ${ANSWER_LABELS[val] ?? val}`)
      .join("\n");

    const prompt = `あなたは就活のプロコーチです。以下の学生プロフィールを読み、その人だけに合ったガクチカ（学生時代に力を入れたこと）を3つ提案してください。

【学生プロフィール】
志望業界: ${industry}
志望職種: ${jobType}
${currentGakuchika ? `現在のガクチカ: ${currentGakuchika}` : ""}

【診断回答】
${answerSummary}

【提案のルール】
- 回答パターンをしっかり分析し、その人の強みと行動特性に完全に合致したガクチカを提案する
- 「誰でも言える汎用的なガクチカ」ではなく、この人のプロフィールにしか当てはまらない具体的なものを提案する
- ${industry}の${jobType}として内定を勝ち取るために、採用担当者が「ぜひ会いたい」と思う内容にする
- 今すぐ始められる現実的な行動を提案する
- 現在のガクチカがある場合は、それを改善・発展させる提案も含める

以下のJSON形式のみで回答してください（前後に余分なテキストや\`\`\`は不要）:
{
  "suggestions": [
    {
      "rank": 1,
      "title": "ガクチカのタイトル（20字以内）",
      "tagline": "このガクチカの核心を一言で（30字以内）",
      "reason": "なぜこの人にこのガクチカが刺さるか。診断回答の具体的な内容に言及しながら説明（100字以内）",
      "howToStart": "今日からできる具体的な第一歩。サービス名・場所・方法を明記（100字以内）",
      "script": "面接でこのガクチカをどう話すかのフレーム例（STAR形式で80字以内）",
      "period": "推奨活動期間"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found in response");

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "提案の生成に失敗しました" }, { status: 500 });
  }
}
