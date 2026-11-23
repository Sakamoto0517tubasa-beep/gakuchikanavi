export type Question = {
  id: number;
  category: string;
  text: string;
  options: { label: string; value: string }[];
};

// ===== 1・2年生向け：20問。実体験と行動を引き出し、強み・価値観・原動力を立体的に捉える =====
export const questions12: Question[] = [
  {
    id: 1,
    category: "困難への対処",
    text: "チームや身の回りで問題が起きたとき、あなたが実際にとった行動に一番近いのは？",
    options: [
      { label: "自分から声をかけて、みんなで話し合う場を作った", value: "q1_gather" },
      { label: "まず一人で原因や情報を調べて整理した", value: "q1_research" },
      { label: "過去の似た経験を思い出して対処した", value: "q1_experience" },
      { label: "とりあえず新しいやり方を試してみた", value: "q1_try" },
    ],
  },
  {
    id: 2,
    category: "発揮した強み",
    text: "これまでに「自分がいたから上手くいった」と感じた場面は、どんなとき？",
    options: [
      { label: "人をまとめて動かしたとき", value: "q2_lead" },
      { label: "細かい作業を正確にやり切ったとき", value: "q2_accuracy" },
      { label: "新しいアイデアを出したとき", value: "q2_idea" },
      { label: "諦めずに最後までやり抜いたとき", value: "q2_persist" },
    ],
  },
  {
    id: 3,
    category: "熱中体験",
    text: "時間を忘れて没頭した経験があるのは、どんなこと？",
    options: [
      { label: "仲間と一つの目標に向かうこと", value: "q3_team" },
      { label: "一つのことを極める・上達させること", value: "q3_master" },
      { label: "ゼロから何かを作ること", value: "q3_create" },
      { label: "人に教える・サポートすること", value: "q3_support" },
    ],
  },
  {
    id: 4,
    category: "担った役割",
    text: "グループ活動で、気づくと自分が担っていた役割は？",
    options: [
      { label: "全体を引っ張るリーダー", value: "q4_leader" },
      { label: "アイデアを出す企画・参謀役", value: "q4_planner" },
      { label: "意見をまとめる調整役", value: "q4_coordinator" },
      { label: "自分の担当を確実にこなす実務役", value: "q4_doer" },
    ],
  },
  {
    id: 5,
    category: "壁の乗り越え方",
    text: "うまくいかず壁にぶつかったとき、あなたが実際にとった乗り越え方は？",
    options: [
      { label: "とにかく量をこなして突破した", value: "q5_grit" },
      { label: "やり方を分析して改善した", value: "q5_kaizen" },
      { label: "人に相談して力を借りた", value: "q5_rely" },
      { label: "思い切って別の方法に切り替えた", value: "q5_reframe" },
    ],
  },
  {
    id: 6,
    category: "原動力",
    text: "何かに力を入れたとき、「これがあったから頑張れた」と思うのは？",
    options: [
      { label: "誰かの役に立っている実感", value: "q6_contribution" },
      { label: "自分が成長している実感", value: "q6_growth" },
      { label: "仲間と一緒にいる楽しさ", value: "q6_fellowship" },
      { label: "新しいものを生み出す面白さ", value: "q6_creation" },
    ],
  },
  {
    id: 7,
    category: "やりがいの瞬間",
    text: "一番「やってよかった」と感じたのは、どんな瞬間？",
    options: [
      { label: "「ありがとう」と感謝されたとき", value: "q7_gratitude" },
      { label: "数字や結果で成果が見えたとき", value: "q7_result" },
      { label: "作ったものが形になったとき", value: "q7_output" },
      { label: "チームで何かを成し遂げたとき", value: "q7_teamwin" },
    ],
  },
  {
    id: 8,
    category: "継続の仕方",
    text: "今まで一番長く続けてきたことを、どうやって続けてきた？",
    options: [
      { label: "目標を決めて計画的に", value: "q8_plan" },
      { label: "習慣にして毎日淡々と", value: "q8_habit" },
      { label: "仲間や環境の力を借りて", value: "q8_social" },
      { label: "飽きないよう工夫を変えながら", value: "q8_adapt" },
    ],
  },
  {
    id: 9,
    category: "対人スタイル",
    text: "初対面の人が多い場で、あなたは実際どう振る舞う？",
    options: [
      { label: "自分から話しかけて打ち解ける", value: "q9_proactive" },
      { label: "少人数で深く話す", value: "q9_deep" },
      { label: "聞き役にまわって様子を見る", value: "q9_listener" },
      { label: "必要な範囲で無理なく関わる", value: "q9_moderate" },
    ],
  },
  {
    id: 10,
    category: "失敗との向き合い方",
    text: "失敗して落ち込んだあと、あなたが実際に最初にしたことは？",
    options: [
      { label: "原因を書き出して次に活かした", value: "q10_analyze" },
      { label: "すぐ切り替えて再挑戦した", value: "q10_retry" },
      { label: "人に話して気持ちと状況を整理した", value: "q10_talk" },
      { label: "やり方を根本から見直した", value: "q10_rethink" },
    ],
  },
  {
    id: 11,
    category: "興味の持ち方",
    text: "新しいことに出会ったとき、あなたの関わり方に近いのは？",
    options: [
      { label: "一つを深く掘り下げる", value: "q11_deep" },
      { label: "広く色々なことに手を出す", value: "q11_wide" },
      { label: "役に立ちそうなものを選んで学ぶ", value: "q11_useful" },
      { label: "流行や新しさに敏感に飛びつく", value: "q11_trend" },
    ],
  },
  {
    id: 12,
    category: "挑戦した経験",
    text: "「少し怖いけどやってみよう」と踏み出した経験は、どんなとき？",
    options: [
      { label: "人前やリーダー役に立候補した", value: "q12_lead" },
      { label: "未経験の分野に飛び込んだ", value: "q12_newfield" },
      { label: "自分で何かを立ち上げた", value: "q12_found" },
      { label: "高い目標に挑んだ", value: "q12_highgoal" },
    ],
  },
  {
    id: 13,
    category: "プレッシャー下の自分",
    text: "大事な場面や締め切り前、あなたは実際どうなることが多い？",
    options: [
      { label: "燃えていつも以上に力が出る", value: "q13_thrive" },
      { label: "冷静に淡々と進める", value: "q13_calm" },
      { label: "入念に準備して不安を消す", value: "q13_prepare" },
      { label: "周りと協力して乗り切る", value: "q13_cooperate" },
    ],
  },
  {
    id: 14,
    category: "周囲への影響",
    text: "周りから「あなたのおかげ」と言われたのは、どんなとき？",
    options: [
      { label: "言葉で励ましたとき", value: "q14_words" },
      { label: "自分が率先して動いたとき", value: "q14_action" },
      { label: "一人ひとりに気を配ったとき", value: "q14_care" },
      { label: "段取りや仕組みを整えたとき", value: "q14_system" },
    ],
  },
  {
    id: 15,
    category: "大切にしたい相手",
    text: "「この人のために頑張りたい」と思えるのは？",
    options: [
      { label: "身近な仲間・チーム", value: "q15_team" },
      { label: "困っている人・社会", value: "q15_society" },
      { label: "相手一人ひとり（お客さんなど）", value: "q15_individual" },
      { label: "目標に向かう自分自身", value: "q15_self" },
    ],
  },
  {
    id: 16,
    category: "関心のある分野",
    text: "今いちばん関心があるのは、どの領域？",
    options: [
      { label: "人・組織・チームづくり", value: "q16_people" },
      { label: "テクノロジー・ものづくり", value: "q16_tech" },
      { label: "ビジネス・お金の動き", value: "q16_business" },
      { label: "社会・文化・クリエイティブ", value: "q16_society" },
    ],
  },
  {
    id: 17,
    category: "成果へのこだわり",
    text: "何かをやり遂げるとき、あなたが一番こだわるのは？",
    options: [
      { label: "スピードと行動量", value: "q17_speed" },
      { label: "質と完成度", value: "q17_quality" },
      { label: "独自性・人と違うこと", value: "q17_unique" },
      { label: "確実さ・ミスのなさ", value: "q17_reliable" },
    ],
  },
  {
    id: 18,
    category: "力を発揮できる環境",
    text: "これまで一番力を発揮できたのは、どんな環境だった？",
    options: [
      { label: "自由に任せてもらえる環境", value: "q18_autonomy" },
      { label: "仲間と協力し合える環境", value: "q18_team" },
      { label: "目標と評価が明確な環境", value: "q18_goal" },
      { label: "腰を据えて取り組める環境", value: "q18_stable" },
    ],
  },
  {
    id: 19,
    category: "なりたい将来像",
    text: "10年後、どんな自分になっていたい？",
    options: [
      { label: "多くの人を動かすリーダー", value: "q19_leader" },
      { label: "専門を極めた第一人者", value: "q19_expert" },
      { label: "新しい事業を作る人", value: "q19_entrepreneur" },
      { label: "社会の課題を解決する人", value: "q19_changemaker" },
    ],
  },
  {
    id: 20,
    category: "周囲からの評価",
    text: "友達や家族から、あなたはよくどんなふうに言われる？",
    options: [
      { label: "「頼りになる・まとめ役」", value: "q20_reliable" },
      { label: "「真面目・努力家」", value: "q20_diligent" },
      { label: "「面白い・発想が豊か」", value: "q20_creative" },
      { label: "「優しい・気がきく」", value: "q20_kind" },
    ],
  },
];

// ===== 3年生向け：20問。就活直前。実際の経験を棚卸しし、強み・原動力・今から作れる余地を引き出す =====
export const questions3: Question[] = [
  {
    id: 1,
    category: "経験の棚卸し",
    text: "大学生活で一番、時間やエネルギーを注いだのは？",
    options: [
      { label: "アルバイト・仕事", value: "t1_work" },
      { label: "サークル・部活・チーム活動", value: "t1_club" },
      { label: "勉強・研究・資格", value: "t1_study" },
      { label: "趣味・個人の活動", value: "t1_hobby" },
    ],
  },
  {
    id: 2,
    category: "担った役割",
    text: "その活動の中で、あなたが実際に担っていた役割に近いのは？",
    options: [
      { label: "まとめ役・リーダー", value: "t2_leader" },
      { label: "縁の下で支える役", value: "t2_support" },
      { label: "企画・アイデア出し役", value: "t2_planner" },
      { label: "自分の担当を黙々とこなす役", value: "t2_doer" },
    ],
  },
  {
    id: 3,
    category: "自分なりの工夫",
    text: "その活動で「自分なりに工夫したこと」に一番近いのは？",
    options: [
      { label: "人を巻き込んで動かした", value: "t3_involve" },
      { label: "地道な改善を積み重ねた", value: "t3_improve" },
      { label: "新しい取り組みを提案した", value: "t3_propose" },
      { label: "困っている人を手助けした", value: "t3_help" },
    ],
  },
  {
    id: 4,
    category: "出せた成果",
    text: "その活動で出せた成果に一番近いのは？",
    options: [
      { label: "数字や記録が改善した", value: "t4_number" },
      { label: "ゼロから何かを立ち上げた", value: "t4_zero" },
      { label: "続けて形に残した", value: "t4_continue" },
      { label: "誰かに感謝された・役に立った", value: "t4_help" },
    ],
  },
  {
    id: 5,
    category: "壁の乗り越え方",
    text: "その活動でぶつかった壁を、実際どう乗り越えた？",
    options: [
      { label: "量をこなして突破した", value: "t5_grit" },
      { label: "やり方を分析・改善した", value: "t5_kaizen" },
      { label: "周りを頼って解決した", value: "t5_rely" },
      { label: "別の方法に切り替えた", value: "t5_reframe" },
    ],
  },
  {
    id: 6,
    category: "原動力",
    text: "そもそも、その活動に力を入れた「理由」に一番近いのは？",
    options: [
      { label: "悔しさ・見返したい気持ち", value: "t6_frustration" },
      { label: "好き・楽しいという興味", value: "t6_passion" },
      { label: "誰かの期待に応えたい気持ち", value: "t6_expectation" },
      { label: "理想の自分に近づきたい気持ち", value: "t6_ideal" },
    ],
  },
  {
    id: 7,
    category: "周囲からの評価",
    text: "周りからよく頼られたり褒められたりするのは？",
    options: [
      { label: "まとめる力・リーダーシップ", value: "t7_lead" },
      { label: "真面目さ・責任感", value: "t7_reliable" },
      { label: "明るさ・人あたりの良さ", value: "t7_social" },
      { label: "発想力・器用さ", value: "t7_idea" },
    ],
  },
  {
    id: 8,
    category: "やりがいの瞬間",
    text: "頑張れたのは、どんなときだった？",
    options: [
      { label: "感謝されたとき", value: "t8_gratitude" },
      { label: "成果が数字で見えたとき", value: "t8_result" },
      { label: "新しいものを生んだとき", value: "t8_creation" },
      { label: "仲間と達成したとき", value: "t8_teamwin" },
    ],
  },
  {
    id: 9,
    category: "継続の仕方",
    text: "続けてきたことを、どうやって継続した？",
    options: [
      { label: "目標を決めて計画的に", value: "t9_plan" },
      { label: "習慣にして淡々と", value: "t9_habit" },
      { label: "仲間や環境の力で", value: "t9_social" },
      { label: "工夫を変えながら", value: "t9_adapt" },
    ],
  },
  {
    id: 10,
    category: "進め方の好み",
    text: "自分が続けやすいのは、どのスタイル？",
    options: [
      { label: "人と関わりながら進める", value: "t10_people" },
      { label: "一人でコツコツ進める", value: "t10_solo" },
      { label: "どちらでも対応できる", value: "t10_both" },
    ],
  },
  {
    id: 11,
    category: "周囲への影響",
    text: "「あなたのおかげ」と言われた場面に一番近いのは？",
    options: [
      { label: "言葉で人を励ました", value: "t11_words" },
      { label: "率先して動いて示した", value: "t11_action" },
      { label: "一人ひとりに気を配った", value: "t11_care" },
      { label: "段取り・仕組みを整えた", value: "t11_system" },
    ],
  },
  {
    id: 12,
    category: "失敗との向き合い方",
    text: "うまくいかなかったとき、あなたが最初にしたことは？",
    options: [
      { label: "原因を分析して次に活かした", value: "t12_analyze" },
      { label: "すぐ切り替えて再挑戦した", value: "t12_retry" },
      { label: "人に相談した", value: "t12_consult" },
      { label: "やり方を根本から見直した", value: "t12_rethink" },
    ],
  },
  {
    id: 13,
    category: "大切にしていた価値観",
    text: "活動の中で、一番大事にしていたのは？",
    options: [
      { label: "人や社会の役に立つこと", value: "t13_contribution" },
      { label: "自分の成長", value: "t13_growth" },
      { label: "仲間との達成", value: "t13_team" },
      { label: "新しいものを生むこと", value: "t13_innovation" },
    ],
  },
  {
    id: 14,
    category: "課題解決スタイル",
    text: "課題に直面したとき、あなたがまずとる動きは？",
    options: [
      { label: "すぐ行動して試す", value: "t14_act" },
      { label: "情報を集めて分析する", value: "t14_analyze" },
      { label: "経験者に聞く", value: "t14_ask" },
      { label: "全体を整理して計画を立てる", value: "t14_plan" },
    ],
  },
  {
    id: 15,
    category: "大切にしたい相手",
    text: "「この人たちのために」と思えるのは？",
    options: [
      { label: "身近な仲間・チーム", value: "t15_team" },
      { label: "困っている人・社会", value: "t15_society" },
      { label: "お客さん・相手一人ひとり", value: "t15_individual" },
      { label: "自分の目標・成長", value: "t15_self" },
    ],
  },
  {
    id: 16,
    category: "アピール軸",
    text: "面接で一番伝えたい強みは？",
    options: [
      { label: "行動力・主体性", value: "t16_action" },
      { label: "継続力・粘り強さ", value: "t16_persist" },
      { label: "課題解決力", value: "t16_solve" },
      { label: "協調性・巻き込み力", value: "t16_team" },
    ],
  },
  {
    id: 17,
    category: "今から伸ばせる余地",
    text: "今からでも成果を伸ばせそうなのは、どれ？",
    options: [
      { label: "今のバイト・サークルで一工夫する", value: "t17_improve" },
      { label: "短期で新しいことに挑戦する", value: "t17_challenge" },
      { label: "個人で完結する活動（SNS・制作等）", value: "t17_solo" },
      { label: "資格・勉強で成果を出す", value: "t17_study" },
    ],
  },
  {
    id: 18,
    category: "成果へのこだわり",
    text: "成果を出すとき、あなたが一番こだわるのは？",
    options: [
      { label: "スピード・行動量", value: "t18_speed" },
      { label: "質・完成度", value: "t18_quality" },
      { label: "独自性・新しさ", value: "t18_unique" },
      { label: "確実さ・ミスのなさ", value: "t18_reliable" },
    ],
  },
  {
    id: 19,
    category: "就活の不安",
    text: "ガクチカについて、今いちばん不安なのは？",
    options: [
      { label: "そもそもネタが思いつかない", value: "t19_noidea" },
      { label: "経験はあるが深みが足りない", value: "t19_shallow" },
      { label: "ありきたりで差別化できない", value: "t19_common" },
      { label: "うまく言葉にできない", value: "t19_words" },
    ],
  },
  {
    id: 20,
    category: "働くうえで実現したいこと",
    text: "将来、働くうえで実現したいことに一番近いのは？",
    options: [
      { label: "多くの人に影響を与えたい", value: "t20_influence" },
      { label: "専門性を極めたい", value: "t20_expert" },
      { label: "新しい価値を生みたい", value: "t20_create" },
      { label: "人や社会を支えたい", value: "t20_support" },
    ],
  },
];

// 学年に応じて質問セットを出し分ける（問題数はどちらも20問）
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
