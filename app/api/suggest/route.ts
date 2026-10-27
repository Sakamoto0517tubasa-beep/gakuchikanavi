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

    const prompt = `あなたは新卒就活のトップコーチです。数千人のESを添削し、内定を勝ち取らせてきました。以下の大学生のプロフィールと診断結果を深く分析し、その人だけに刺さるガクチカ（学生時代に力を入れたこと）を提案してください。

【ステップ1：強みの分析】
まず診断回答を読み込み、この人の「強みタイプ」を一言で言語化してください（例：「周囲を巻き込んで前進させる推進力タイプ」「地道な改善を積み重ねる職人タイプ」）。これを strengthProfile に入れます。

【ステップ2：ガクチカを3つ提案】
ガクチカは、大学生が学生生活で主体的に取り組む課外活動です。以下の各カテゴリから、できるだけ異なる種類で3つ提案してください（3つとも同じカテゴリにしない）：
アルバイトでの工夫／サークル・部活／ゼミ・研究・資格／長期インターン／ボランティア・地域・留学／個人活動（SNS・制作・学生団体）

【ガクチカとは】
大学生が学生生活の中で主体的に取り組む課外活動のことです。必ず以下のいずれかのカテゴリの、一人の学生が実際に始められる活動にしてください：
- アルバイト（居酒屋・塾講師・カフェ・アパレル販売 など）での工夫や改善
- サークル・部活動（イベント企画・チーム運営・大会 など）
- ゼミ・研究・勉強・資格取得
- 長期インターン（学生がインターン生として参加するもの）
- ボランティア・地域活動・国際交流・留学
- 個人活動（SNS発信・ブログ・プログラミング・作品制作・副業・学生団体の立ち上げ など）

【禁止事項（重要）】
- 「既存店の売上向上プロジェクト」「業務フロー構築」のような"社会人の仕事・企業の業務"は絶対に提案しない。あくまで一人の大学生が放課後や休日にできる活動。
- 「コミュニケーション能力」「リーダーシップ」「協調性」のような誰でも言える抽象ワードを結論にしない。必ず具体的な行動と結果で語る。
- 3案が似通わないようにする。

【良い例 / 悪い例】
× 悪い例：「サークルでリーダーをしてコミュ力を発揮した」（抽象的で誰でも言える）
○ 良い例：「30人のテニスサークルで参加率が5割を切っていた練習に、LINEでの前日リマインドと初心者向け練習日の新設を提案・実行し、半年で参加率を8割に改善した」（具体的な課題・行動・数字）

【学生プロフィール】
志望業界: ${industry}
志望職種: ${jobType}
${currentGakuchika ? `現在のガクチカ: ${currentGakuchika}（これを深掘り・発展させる案も1つ含める）` : ""}

【診断回答（この人の強み・性格）】
${answerSummary}

【提案のルール】
- 各案は、診断回答から読み取れる「この人固有の強み」が主役になるように設計する。reasonで必ずどの回答に基づくか具体的に触れる。
- ${industry}の${jobType}の選考で評価されるポイント（例：営業なら相手に合わせた提案力と行動量、エンジニアなら課題を技術で解決する姿勢、企画なら0→1の構想力など）に接続させる。ただし活動自体は学生がやること。
- howToStartは、今日〜今週に大学生が実際に踏み出せる超具体的な第一歩（声をかける相手・使うサービス名・最初の1アクション）を書く。
- scriptはSTAR（状況・課題・行動・結果）が伝わる、面接でそのまま使える話し方の骨子にする。数字を1つ入れる。

以下のJSON形式のみで回答してください（前後に余分なテキストや\`\`\`は不要）:
{
  "strengthProfile": "この人の強みタイプを一言で（40字以内）",
  "suggestions": [
    {
      "rank": 1,
      "title": "ガクチカのタイトル（学生活動として・25字以内）",
      "tagline": "このガクチカの核心を一言で（35字以内）",
      "reason": "なぜこの人にこの活動が向いているか。診断回答の具体的な強みに触れて説明（130字以内）",
      "howToStart": "今日〜今週に踏み出せる超具体的な第一歩。相手・サービス名・最初のアクションを明記（130字以内）",
      "script": "面接でそのまま使えるSTAR形式の話し方の骨子。数字を1つ入れる（120字以内）",
      "period": "推奨活動期間"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
      max_tokens: 2800,
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
