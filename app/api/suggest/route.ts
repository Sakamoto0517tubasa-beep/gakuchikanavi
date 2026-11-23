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
    const { answers, industry, jobType, grade, currentGakuchika, gakuchikaTypes } = await req.json();

    // 探したいガクチカの種類（指定があればその種類に絞る）
    const typeInstruction = (gakuchikaTypes && String(gakuchikaTypes).trim())
      ? `【最重要：探したいガクチカの種類】
この学生は「${gakuchikaTypes}」の種類のガクチカを探しています。10個すべてを、この指定された種類の中で提案してください。指定が複数ある場合は、その複数の種類にばらけさせて提案します。指定外の種類（例：指定が「アルバイト」なら留学やサークル）は提案しないこと。ただし種類の枠内で、切り口・テーマ・成果の出し方は10個が重複しないよう多様にすること。`
      : `【ガクチカの種類：指定なし（おまかせ）】
種類の指定はないので、下記の幅広いカテゴリを横断して多様な種類で提案すること。`;

    const isThirdYear = grade === "3年生";
    const gradeInstruction = isThirdYear
      ? `【学年：3年生（就活直前）】
この学生は今から就活本番です。重要：過去の経験を棚卸しするのではなく、「今日からこの人が始めて、短期間で新しく作れるガクチカ」を設計・提案してください。必ず以下を守ってください：
- 3案とも「今日〜今週に始めて、1〜3ヶ月で面接で語れる成果になる」短期集中で設計する。
- 推奨期間(period)は原則「1ヶ月〜3ヶ月」。半年以上かかる案は出さない。
- 「活かせる基盤（今のバイト・サークル・ゼミ等）がある」と回答していればそれを土台に“今から一工夫して成果を出す”案を、「特にない」なら今から始められる個人活動・短期の取り組みを提案する。
- howToStartは「今日・今週に踏み出す最初の1アクション」から書き、その後1〜3ヶ月でどう成果（数字）まで持っていくかの道筋も簡潔に示す。
- 「すでにやったこと」を語らせる案（＝ただのES）にはしない。あくまで"これから作る"案にする。`
      : `【学年：1・2年生（時間に余裕あり）】
この学生はまだ時間があります。腰を据えて取り組める活動を提案してください：
- 半年〜2年かけてじっくり育て、深いエピソードと大きな成果になる活動を含める。
- 新しく始める挑戦（長期インターン、留学、学生団体の立ち上げ、継続的な個人活動など）も積極的に提案してよい。
- 推奨期間(period)は「半年〜2年」を目安に、活動に応じて設定する。`;

    const industryUndecided = !industry || industry === "まだ決めていない";
    const jobUndecided = !jobType || jobType === "まだ決めていない";
    const targetInstruction = (industryUndecided || jobUndecided)
      ? `【志望が未定の項目について】
${industryUndecided ? "志望業界：まだ決めていない" : `志望業界：${industry}`}／${jobUndecided ? "志望職種：まだ決めていない" : `志望職種：${jobType}`}
未定の項目は特定の業界・職種に無理に寄せないこと。代わりに、どの進路でも通用する汎用性が高く、かつ「自分の興味・適性・向いている方向性を見つけるきっかけにもなる」ガクチカを提案する。reasonでは志望の評価ポイントにこじつけず、この人の強みが活きることを軸に説明する。`
      : `志望業界：${industry}／志望職種：${jobType}`;

    const answerList: { q: string; a: string }[] = Array.isArray(answers)
      ? answers
      : Object.entries(answers as Record<string, string>).map(([id, val]) => ({
          q: QUESTION_LABELS[Number(id)] ?? id,
          a: ANSWER_LABELS[val] ?? val,
        }));
    const answerSummary = answerList.map((x) => `・${x.q}: ${x.a}`).join("\n");

    // 共通のコンテキスト（分析方針・プロフィール・診断回答・ルール）
    const baseContext = `あなたは新卒就活のトップコーチです。以下の大学生のプロフィールと診断結果を深く分析し、その人だけに刺さるガクチカ（学生時代に力を入れたこと）を提案してください。

【強みの構造分析】
診断回答を1つずつ結びつけ、この人の「①強み（得意な動き）②価値観（何を大切にするか）③原動力（何に心が動くか）④行動のクセ」を内部で立体的に分析してください。単一の回答で決めつけず、複数の回答を統合して一貫する核を捉えます。

${typeInstruction}

種類の指定がない場合は、以下の幅広いカテゴリを横断して、できるだけ多様な種類で提案してください。似た切り口を重ねず、カテゴリをばらけさせること。

【カテゴリの幅（この中から多様に）】
- アルバイト（居酒屋・塾講師・カフェ・アパレル販売 など）での工夫や改善
- サークル・部活動（イベント企画・チーム運営・大会・幹部役 など）
- ゼミ・研究・学業（研究・発表・論文・勉強法の確立）
- 資格・語学・検定への挑戦（TOEIC・簿記・プログラミング資格 など）
- 長期インターン／短期インターン
- ボランティア・地域活動・社会課題への取り組み
- 留学・海外経験・国際交流
- 個人活動：SNS発信・ブログ・YouTube・Podcast・同人・創作
- ものづくり：プログラミング・アプリ開発・ハッカソン・作品制作
- 副業・お金を稼ぐ経験（ハンドメイド販売・せどり・Webライティング など）
- 学生団体の立ち上げ・コミュニティ運営・イベント主催
- 起業・ビジネスコンテスト・アイデアコンテスト
- スポーツ・音楽・芸術など趣味や特技を極める
- 大会・コンテスト・大舞台への出場
- 日常の習慣化・自己鍛錬（早起き・筋トレ・読書100冊・毎日投稿 など）
- 委員会・学校行事・ゼミ長などの役割、家業・家族の手伝い

【禁止事項（重要）】
- 「既存店の売上向上プロジェクト」「業務フロー構築」のような"社会人の仕事・企業の業務"は絶対に提案しない。あくまで一人の大学生が放課後や休日にできる活動。
- 「コミュニケーション能力」「リーダーシップ」のような誰でも言える抽象ワードを結論にしない。必ず具体的な行動と結果で語る。

【良い例 / 悪い例】
× 悪い例：「サークルでリーダーをしてコミュ力を発揮した」（抽象的で誰でも言える）
○ 良い例：「30人のテニスサークルで参加率が5割を切っていた練習に、LINEでの前日リマインドと初心者向け練習日の新設を提案・実行し、半年で参加率を8割に改善した」（具体的な課題・行動・数字）

${gradeInstruction}

【学生プロフィール】
${targetInstruction}
${currentGakuchika ? `現在のガクチカ: ${currentGakuchika}（これを深掘り・発展させる案も含める）` : ""}

【診断回答（この人の強み・性格）】
${answerSummary}

【各案のルール】
- 各案は、診断回答から読み取れる「この人固有の強み」が主役になるよう設計し、reasonでどの回答に基づくか具体的に触れる。
- 志望業界・職種が決まっている場合は、その選考で評価されるポイントに接続させる。未定ならどこでも通用する強みと、興味・適性を見つけるきっかけになる点を軸にする。
- howToStartは、今日〜今週に実際に踏み出せる超具体的な第一歩（相手・サービス名・最初のアクション）を書く。
- scriptはSTAR（状況・課題・行動・結果）が伝わる面接用の骨子にし、数字を1つ入れる。
- 「誰にでも当てはまる」案を避け、具体的な課題・行動・数字がイメージできる固有の内容にする。`;

    // 高速化のため出力を簡潔にし、生成トークン数を抑える
    const prompt = `${baseContext}

【出力：ガクチカを10個提案】
rank 1〜3 はこの人に特に向く「イチオシ」順、4〜10 は別角度で多様に（カテゴリ・切り口を重複させない）。各項目は簡潔に、字数上限を必ず守ること。

以下のJSON形式のみで回答（前後に余分なテキストや\`\`\`は不要）:
{
  "strengthProfile": "この人の強みタイプを一言で（40字以内・例：周囲を巻き込んで前進させる推進力タイプ）",
  "suggestions": [
    {
      "rank": 1,
      "title": "タイトル（学生活動として・22字以内）",
      "tagline": "核心を一言で（30字以内）",
      "reason": "なぜ向くか。診断回答の具体的な強みに触れて（70字以内）",
      "howToStart": "今日〜今週の超具体的な第一歩（70字以内）",
      "script": "面接用STAR骨子。数字を1つ入れる（70字以内）",
      "period": "推奨活動期間"
    }
    // ↑ rank 1〜10 まで、合計10個を配列に入れる
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 4000,
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
