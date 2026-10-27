export type Question = {
  id: number;
  text: string;
  options: { label: string; value: string }[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: "人と関わる仕事と、モノや数字を扱う仕事、どちらが好きですか？",
    options: [
      { label: "人と関わる仕事", value: "people" },
      { label: "モノや数字を扱う仕事", value: "things" },
      { label: "どちらも好き", value: "both" },
    ],
  },
  {
    id: 2,
    text: "チームで動くことと、一人で集中して取り組むこと、どちらが得意ですか？",
    options: [
      { label: "チームで動く", value: "team" },
      { label: "一人で集中", value: "solo" },
      { label: "どちらも得意", value: "both" },
    ],
  },
  {
    id: 3,
    text: "新しいことに挑戦するのと、得意なことを極めるのはどちらが好きですか？",
    options: [
      { label: "新しいことに挑戦", value: "challenge" },
      { label: "得意なことを極める", value: "deepen" },
      { label: "どちらも好き", value: "both" },
    ],
  },
  {
    id: 4,
    text: "人を説得・提案することは得意ですか？",
    options: [
      { label: "得意", value: "yes" },
      { label: "苦手", value: "no" },
      { label: "どちらでもない", value: "neutral" },
    ],
  },
  {
    id: 5,
    text: "数字や分析を使って物事を考えるのは好きですか？",
    options: [
      { label: "好き", value: "yes" },
      { label: "苦手", value: "no" },
      { label: "どちらでもない", value: "neutral" },
    ],
  },
  {
    id: 6,
    text: "アイデアを形にしたり、ゼロから何かを作るのは好きですか？",
    options: [
      { label: "好き", value: "yes" },
      { label: "苦手", value: "no" },
      { label: "どちらでもない", value: "neutral" },
    ],
  },
  {
    id: 7,
    text: "人の役に立っていると感じることにやりがいを感じますか？",
    options: [
      { label: "感じる", value: "yes" },
      { label: "あまり感じない", value: "no" },
      { label: "どちらでもない", value: "neutral" },
    ],
  },
  {
    id: 8,
    text: "リーダーとして引っ張るより、サポート役として支えるのが好きですか？",
    options: [
      { label: "リーダーが好き", value: "leader" },
      { label: "サポートが好き", value: "support" },
      { label: "どちらも好き", value: "both" },
    ],
  },
  {
    id: 9,
    text: "長期間コツコツ続けることと、短期間で成果を出すことはどちらが得意ですか？",
    options: [
      { label: "長期間コツコツ", value: "long" },
      { label: "短期間で成果", value: "short" },
      { label: "どちらも得意", value: "both" },
    ],
  },
  {
    id: 10,
    text: "将来お金を稼ぐことと、社会に貢献することはどちらを重視しますか？",
    options: [
      { label: "お金を稼ぐこと", value: "money" },
      { label: "社会に貢献すること", value: "social" },
      { label: "どちらも同じくらい", value: "both" },
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
