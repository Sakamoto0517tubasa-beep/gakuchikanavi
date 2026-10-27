export type Question = {
  id: number;
  category: string;
  text: string;
  options: { label: string; value: string }[];
};

// ===== 1・2年生向け：じっくり育てる前提。強み・価値観・将来像を探る =====
export const questions12: Question[] = [
  {
    id: 1,
    category: "行動スタイル",
    text: "問題が起きたとき、あなたが自然にとる行動は？",
    options: [
      { label: "すぐに人を集めて話し合う", value: "gather_people" },
      { label: "まず自分でデータや情報を調べる", value: "research_first" },
      { label: "過去の経験から解決策を考える", value: "use_experience" },
      { label: "新しいアプローチを試してみる", value: "try_new" },
    ],
  },
  {
    id: 2,
    category: "得意なこと",
    text: "「これだけは負けない」と思えることは？",
    options: [
      { label: "人を動かす・巻き込む力", value: "influence" },
      { label: "細かいことを正確にやり切る力", value: "accuracy" },
      { label: "アイデアを次々と出す力", value: "creativity" },
      { label: "最後まで諦めずやり続ける力", value: "persistence" },
    ],
  },
  {
    id: 3,
    category: "モチベーション",
    text: "いちばんやる気が上がる瞬間は？",
    options: [
      { label: "誰かに「ありがとう」と言われたとき", value: "gratitude" },
      { label: "目標を達成して数字で成果が出たとき", value: "achievement" },
      { label: "ゼロから作ったものが完成したとき", value: "creation" },
      { label: "チームが一体となって盛り上がったとき", value: "teamwork" },
    ],
  },
  {
    id: 4,
    category: "コミュニケーション",
    text: "グループで活動するとき、自然になるポジションは？",
    options: [
      { label: "全体を引っ張るリーダー", value: "leader" },
      { label: "アイデアを出す参謀・企画役", value: "planner" },
      { label: "チームをまとめる調整役", value: "coordinator" },
      { label: "専門分野で貢献するスペシャリスト", value: "specialist" },
    ],
  },
  {
    id: 5,
    category: "挑戦志向",
    text: "この先、どんな経験に時間を使ってみたい？",
    options: [
      { label: "新しいコミュニティで人をまとめる", value: "lead_new" },
      { label: "専門スキルや資格を深く極める", value: "deepen_skill" },
      { label: "自分で何かをゼロから立ち上げる", value: "build_zero" },
      { label: "海外・社会課題など未知の世界へ飛び込む", value: "explore" },
    ],
  },
  {
    id: 6,
    category: "価値観",
    text: "活動で最も大切にしたいことは？",
    options: [
      { label: "社会や人の役に立つこと", value: "social_impact" },
      { label: "自分の成長・スキルアップ", value: "self_growth" },
      { label: "チームの仲間と達成する喜び", value: "team_achievement" },
      { label: "新しいものを生み出すこと", value: "innovation" },
    ],
  },
  {
    id: 7,
    category: "課題解決",
    text: "困難な状況を、どう乗り越えるタイプ？",
    options: [
      { label: "根性で乗り越える（量でカバー）", value: "grit" },
      { label: "工夫・改善を繰り返す", value: "kaizen" },
      { label: "仲間や周囲を頼る", value: "rely_on_others" },
      { label: "全く別の視点・方法を試す", value: "reframe" },
    ],
  },
  {
    id: 8,
    category: "数字・分析",
    text: "データや数字を扱うことについては？",
    options: [
      { label: "得意で積極的に使う", value: "data_lover" },
      { label: "必要なら使える", value: "data_neutral" },
      { label: "苦手だが克服したい", value: "data_challenge" },
      { label: "感覚・直感の方を信頼する", value: "intuition" },
    ],
  },
  {
    id: 9,
    category: "将来像",
    text: "10年後、どんな人間になっていたい？",
    options: [
      { label: "多くの人に影響を与えるリーダー", value: "future_leader" },
      { label: "特定分野の第一人者・エキスパート", value: "future_expert" },
      { label: "新しいビジネスを作った起業家", value: "future_entrepreneur" },
      { label: "社会問題を解決したチェンジメーカー", value: "future_changemaker" },
    ],
  },
  {
    id: 10,
    category: "興味関心",
    text: "今、いちばん関心があるテーマは？",
    options: [
      { label: "人・組織・チームづくり", value: "interest_people" },
      { label: "テクノロジー・ものづくり", value: "interest_tech" },
      { label: "ビジネス・お金の流れ", value: "interest_business" },
      { label: "社会・文化・クリエイティブ", value: "interest_society" },
    ],
  },
  {
    id: 11,
    category: "プレッシャー耐性",
    text: "プレッシャーのかかる場面で、あなたは？",
    options: [
      { label: "燃えて力を発揮する", value: "pressure_thrive" },
      { label: "冷静に淡々と対処する", value: "pressure_calm" },
      { label: "準備を重ねて不安を消す", value: "pressure_prepare" },
      { label: "周りに相談して乗り切る", value: "pressure_rely" },
    ],
  },
  {
    id: 12,
    category: "対人関係",
    text: "初対面の人と関わるのは？",
    options: [
      { label: "得意。すぐ打ち解けられる", value: "social_easy" },
      { label: "少人数なら得意", value: "social_small" },
      { label: "時間をかけて深く仲良くなる", value: "social_deep" },
      { label: "やや苦手だが必要なら頑張る", value: "social_effort" },
    ],
  },
  {
    id: 13,
    category: "興味の持ち方",
    text: "物事への興味の持ち方は？",
    options: [
      { label: "一つのことを深く掘り下げる", value: "interest_deep" },
      { label: "幅広く色々なことに手を出す", value: "interest_wide" },
      { label: "役に立ちそうなものを選んで学ぶ", value: "interest_useful" },
      { label: "流行や新しいものに敏感", value: "interest_trend" },
    ],
  },
  {
    id: 14,
    category: "理想の環境",
    text: "どんな環境で力を発揮しやすい？",
    options: [
      { label: "裁量が大きく自由に動ける", value: "env_autonomy" },
      { label: "仲間と協力し合える", value: "env_team" },
      { label: "明確な目標と評価がある", value: "env_goal" },
      { label: "安定して腰を据えられる", value: "env_stable" },
    ],
  },
  {
    id: 15,
    category: "こだわり",
    text: "成果を出すうえで一番大事にするのは？",
    options: [
      { label: "スピード・行動量", value: "value_speed" },
      { label: "質・完成度", value: "value_quality" },
      { label: "独自性・新しさ", value: "value_unique" },
      { label: "確実性・ミスの無さ", value: "value_reliable" },
    ],
  },
];

// ===== 3年生向け：就活直前。「今から作れるガクチカ」を設計するための質問 =====
export const questions3: Question[] = [
  {
    id: 1,
    category: "使える時間",
    text: "就活本番まで、ガクチカづくりに使えそうな時間は？",
    options: [
      { label: "まとまった時間を集中して使える", value: "time_lots" },
      { label: "週に数時間なら作れる", value: "time_some" },
      { label: "ほぼ無い（今ある活動を活かしたい）", value: "time_none" },
    ],
  },
  {
    id: 2,
    category: "活かせる基盤",
    text: "今も続けている活動はある？（それを土台にできます）",
    options: [
      { label: "続けているアルバイトがある", value: "base_parttime" },
      { label: "サークル・部活がある", value: "base_club" },
      { label: "ゼミ・研究がある", value: "base_study" },
      { label: "特にない（新しく始めたい）", value: "base_none" },
    ],
  },
  {
    id: 3,
    category: "始めやすさ",
    text: "今から始めるなら、どれが一番ハードルが低い？",
    options: [
      { label: "今の環境で一工夫して成果を出す", value: "start_improve" },
      { label: "短期で新しいことに挑戦する", value: "start_challenge" },
      { label: "個人で完結する活動（SNS・制作等）", value: "start_solo" },
      { label: "資格・勉強で成果を出す", value: "start_study" },
    ],
  },
  {
    id: 4,
    category: "活かしたい強み",
    text: "新しい活動で活かしたい自分の強みは？",
    options: [
      { label: "人を巻き込む力", value: "strength_influence" },
      { label: "地道にやり切る力", value: "strength_persist" },
      { label: "アイデア・発想力", value: "strength_idea" },
      { label: "気配り・サポート力", value: "strength_support" },
    ],
  },
  {
    id: 5,
    category: "出したい成果",
    text: "どんな成果を出せたら「ガクチカになった」と感じる？",
    options: [
      { label: "数字で改善した", value: "goal_number" },
      { label: "ゼロから何かを立ち上げた", value: "goal_zero" },
      { label: "続けて形にした", value: "goal_continue" },
      { label: "誰かの役に立った", value: "goal_help" },
    ],
  },
  {
    id: 6,
    category: "モチベーション",
    text: "頑張れるのはどんなとき？",
    options: [
      { label: "誰かに感謝されたとき", value: "gratitude" },
      { label: "数字で成果が出たとき", value: "achievement" },
      { label: "新しいものを生んだとき", value: "creation" },
      { label: "仲間と達成したとき", value: "teamwork" },
    ],
  },
  {
    id: 7,
    category: "進め方の好み",
    text: "続けやすいのはどっち？",
    options: [
      { label: "人と関わりながら進める", value: "style_people" },
      { label: "一人でコツコツ進める", value: "style_solo" },
      { label: "どちらでも対応できる", value: "style_both" },
    ],
  },
  {
    id: 8,
    category: "挑戦度",
    text: "今から挑戦するなら、どちらが近い？",
    options: [
      { label: "慣れた環境で確実に成果を出す", value: "risk_safe" },
      { label: "少し背伸びして新しい挑戦をする", value: "risk_stretch" },
    ],
  },
  {
    id: 9,
    category: "行動の早さ",
    text: "新しいことを始めるとき、あなたは？",
    options: [
      { label: "今日からすぐ動ける", value: "speed_now" },
      { label: "計画を立ててから動く", value: "speed_plan" },
      { label: "きっかけがあれば動ける", value: "speed_trigger" },
    ],
  },
  {
    id: 10,
    category: "アピール軸",
    text: "面接で一番伝えたい強みは？",
    options: [
      { label: "行動力・主体性", value: "appeal_action" },
      { label: "継続力・粘り強さ", value: "appeal_persist" },
      { label: "課題解決力", value: "appeal_solve" },
      { label: "協調性・巻き込み力", value: "appeal_team" },
    ],
  },
];

export function getQuestions(grade: string): Question[] {
  return grade === "3年生" ? questions3 : questions12;
}

export const industries = [
  "IT・通信",
  "金融・保険",
  "コンサルティング",
  "メーカー（製造業）",
  "商社",
  "広告・マーケティング",
  "医療・福祉",
  "教育",
  "小売・流通",
  "建設・不動産",
  "エンタメ・メディア",
  "公務員・非営利",
];

export const jobTypes = [
  "営業",
  "マーケティング",
  "エンジニア",
  "企画・事業開発",
  "コンサルタント",
  "人事・総務",
  "経理・財務",
  "研究・開発",
  "デザイナー",
  "カスタマーサポート",
];
