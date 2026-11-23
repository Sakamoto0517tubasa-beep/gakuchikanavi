export type Question = {
  id: number;
  category: string;
  text: string;
  options: { label: string; value: string }[];
};

// ===== 全学年共通：20問。強み・価値観・原動力を多面的に診断する =====
export const questions: Question[] = [
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
  {
    id: 16,
    category: "原動力",
    text: "そもそも、あなたが何かに本気になる「きっかけ」は？",
    options: [
      { label: "悔しさ・見返したい気持ち", value: "drive_frustration" },
      { label: "好き・楽しいという純粋な興味", value: "drive_passion" },
      { label: "誰かの期待に応えたい気持ち", value: "drive_expectation" },
      { label: "理想の自分に近づきたい気持ち", value: "drive_ideal" },
    ],
  },
  {
    id: 17,
    category: "継続力",
    text: "一度始めたことを、あなたはどう続ける？",
    options: [
      { label: "目標を決めて計画的に続ける", value: "cont_plan" },
      { label: "習慣にして淡々と続ける", value: "cont_habit" },
      { label: "仲間や環境の力を借りて続ける", value: "cont_social" },
      { label: "飽きないよう形を変えて続ける", value: "cont_adapt" },
    ],
  },
  {
    id: 18,
    category: "影響の与え方",
    text: "周りに良い影響を与えるとき、あなたの持ち味は？",
    options: [
      { label: "言葉で人を鼓舞する", value: "infl_words" },
      { label: "行動で示す（背中で見せる）", value: "infl_action" },
      { label: "一人ひとりに寄り添う", value: "infl_care" },
      { label: "仕組みや環境を整える", value: "infl_system" },
    ],
  },
  {
    id: 19,
    category: "失敗との向き合い方",
    text: "失敗したとき、あなたが最初にすることは？",
    options: [
      { label: "原因を分析して次に活かす", value: "fail_analyze" },
      { label: "すぐ切り替えて再挑戦する", value: "fail_retry" },
      { label: "人に相談してヒントを得る", value: "fail_consult" },
      { label: "やり方を根本から見直す", value: "fail_rethink" },
    ],
  },
  {
    id: 20,
    category: "大切にしたい相手",
    text: "「この人たちのために頑張れる」と思うのは？",
    options: [
      { label: "身近な仲間・チーム", value: "for_team" },
      { label: "困っている人・社会", value: "for_society" },
      { label: "お客さん・相手一人ひとり", value: "for_customer" },
      { label: "自分自身の成長・目標", value: "for_self" },
    ],
  },
];

// 学年に関係なく、全員に同じ20問を出す
export function getQuestions(_grade?: string): Question[] {
  return questions;
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
