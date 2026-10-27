export type Question = {
  id: number;
  text: string;
  category: string;
  options: { label: string; value: string }[];
};

export const questions: Question[] = [
  // ===== 強み・特性 =====
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
    category: "行動パターン",
    text: "新しいことを始めるとき、あなたは？",
    options: [
      { label: "とにかくやってみて後で修正する", value: "action_first" },
      { label: "しっかり計画を立ててから動く", value: "plan_first" },
      { label: "信頼できる人に相談してから動く", value: "consult_first" },
      { label: "成功例を調べてから真似して始める", value: "benchmark" },
    ],
  },
  {
    id: 6,
    category: "価値観",
    text: "仕事・活動で最も大切にしたいことは？",
    options: [
      { label: "社会や人の役に立つこと", value: "social_impact" },
      { label: "自分の成長・スキルアップ", value: "self_growth" },
      { label: "チームの仲間と達成する喜び", value: "team_achievement" },
      { label: "新しいものを生み出すこと", value: "innovation" },
    ],
  },
  {
    id: 7,
    category: "経験・背景",
    text: "これまでの学生生活で最も時間を使ってきたのは？",
    options: [
      { label: "部活・サークル・スポーツ", value: "club_sports" },
      { label: "アルバイト・仕事経験", value: "part_time" },
      { label: "勉強・研究・資格取得", value: "study" },
      { label: "ボランティア・地域活動・海外経験", value: "social_volunteer" },
    ],
  },
  {
    id: 8,
    category: "課題解決",
    text: "困難な状況にあったとき、どう乗り越えてきた？",
    options: [
      { label: "根性で乗り越えた（量でカバー）", value: "grit" },
      { label: "工夫・改善を繰り返した", value: "kaizen" },
      { label: "仲間や周囲を頼った", value: "rely_on_others" },
      { label: "全く別の視点・方法を試した", value: "reframe" },
    ],
  },
  {
    id: 9,
    category: "数字・分析",
    text: "データや数字を扱うことについては？",
    options: [
      { label: "得意で積極的に使う", value: "data_lover" },
      { label: "必要なら使えるがあまり好きではない", value: "data_neutral" },
      { label: "苦手だが克服しようとしている", value: "data_challenge" },
      { label: "感覚・直感の方が信頼できると思う", value: "intuition" },
    ],
  },
  {
    id: 10,
    category: "将来像",
    text: "10年後、どんな人間になっていたい？",
    options: [
      { label: "多くの人に影響を与えるリーダー", value: "future_leader" },
      { label: "特定分野の第一人者・エキスパート", value: "future_expert" },
      { label: "新しいビジネス・サービスを作った起業家", value: "future_entrepreneur" },
      { label: "社会問題を解決したチェンジメーカー", value: "future_changemaker" },
    ],
  },
];

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
