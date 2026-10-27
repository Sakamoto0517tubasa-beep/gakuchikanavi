export type Company = {
  name: string;
  industry: string;
  category: string;
  note: string;
};

export const companies: Company[] = [
  // メーカー
  { name: "トヨタ自動車", industry: "自動車", category: "メーカー", note: "世界最大級の自動車メーカー" },
  { name: "ソニーグループ", industry: "電機・精密", category: "メーカー", note: "エンタメ×テクノロジー" },
  { name: "パナソニック", industry: "電機・精密", category: "メーカー", note: "家電・BtoB事業" },
  { name: "日立製作所", industry: "電機・精密", category: "メーカー", note: "社会インフラ×DX" },
  { name: "キヤノン", industry: "電機・精密", category: "メーカー", note: "光学機器のグローバル企業" },
  { name: "シャープ", industry: "電機・精密", category: "メーカー", note: "液晶・AIoT" },
  { name: "富士フイルム", industry: "電機・精密", category: "メーカー", note: "医療・素材に進化" },
  { name: "本田技研工業", industry: "自動車", category: "メーカー", note: "二輪・四輪・航空機" },
  { name: "日産自動車", industry: "自動車", category: "メーカー", note: "EV先駆けのグローバルカーメーカー" },
  { name: "味の素", industry: "食品", category: "メーカー", note: "アミノ酸技術で世界展開" },
  { name: "サントリー", industry: "食品・飲料", category: "メーカー", note: "お酒・飲料・健康" },
  { name: "キリンホールディングス", industry: "食品・飲料", category: "メーカー", note: "ビール・医薬品" },
  { name: "資生堂", industry: "化粧品", category: "メーカー", note: "グローバル展開する日本最大の化粧品企業" },
  { name: "花王", industry: "化学・化粧品", category: "メーカー", note: "日用品・美容" },
  { name: "ブリヂストン", industry: "ゴム・タイヤ", category: "メーカー", note: "世界シェアNo.1タイヤ" },

  // IT・通信
  { name: "NTTデータ", industry: "IT・通信", category: "IT", note: "国内最大手のSIer" },
  { name: "富士通", industry: "IT・通信", category: "IT", note: "DX推進の大手IT" },
  { name: "NEC", industry: "IT・通信", category: "IT", note: "社会ソリューション企業" },
  { name: "野村総合研究所", industry: "IT・コンサル", category: "IT", note: "金融×テクノロジー" },
  { name: "伊藤忠テクノソリューションズ", industry: "IT", category: "IT", note: "ITインフラ・クラウド" },
  { name: "SCSK", industry: "IT", category: "IT", note: "住友商事グループのSIer" },
  { name: "ソフトバンク", industry: "通信", category: "IT", note: "通信×AI×スタートアップ投資" },
  { name: "NTTドコモ", industry: "通信", category: "IT", note: "国内最大手キャリア" },
  { name: "KDDI", industry: "通信", category: "IT", note: "au×ライフデザイン" },
  { name: "楽天グループ", industry: "EC・IT", category: "IT", note: "EC・金融・モバイルの総合企業" },
  { name: "サイバーエージェント", industry: "IT・広告", category: "IT", note: "ゲーム・メディア・DX" },
  { name: "DeNA", industry: "IT・ゲーム", category: "IT", note: "ゲーム・スポーツ・ヘルスケア" },
  { name: "メルカリ", industry: "EC・スタートアップ", category: "IT", note: "フリマアプリで急成長" },
  { name: "LINE ヤフー", industry: "IT", category: "IT", note: "検索・メッセージ・EC" },

  // 商社
  { name: "三菱商事", industry: "総合商社", category: "商社", note: "財閥系最大手商社" },
  { name: "伊藤忠商事", industry: "総合商社", category: "商社", note: "非資源ビジネスに強み" },
  { name: "三井物産", industry: "総合商社", category: "商社", note: "資源・食料・インフラ" },
  { name: "住友商事", industry: "総合商社", category: "商社", note: "メディア・不動産・インフラ" },
  { name: "丸紅", industry: "総合商社", category: "商社", note: "穀物・電力・金融" },
  { name: "豊田通商", industry: "総合商社", category: "商社", note: "トヨタグループの商社" },

  // 金融
  { name: "三菱UFJ銀行", industry: "銀行", category: "金融", note: "国内最大のメガバンク" },
  { name: "三井住友銀行", industry: "銀行", category: "金融", note: "SMBCグループの中核" },
  { name: "みずほ銀行", industry: "銀行", category: "金融", note: "3大メガバンクの一角" },
  { name: "野村證券", industry: "証券", category: "金融", note: "国内最大手の証券会社" },
  { name: "大和証券", industry: "証券", category: "金融", note: "リテール強みの証券" },
  { name: "東京海上日動火災保険", industry: "保険", category: "金融", note: "損保業界トップ" },
  { name: "日本生命保険", industry: "保険", category: "金融", note: "生保業界最大手" },
  { name: "オリックス", industry: "金融・リース", category: "金融", note: "多角経営の金融グループ" },

  // コンサル
  { name: "マッキンゼー・アンド・カンパニー", industry: "コンサル", category: "コンサル", note: "世界最高峰の戦略コンサル" },
  { name: "ボストン コンサルティング グループ", industry: "コンサル", category: "コンサル", note: "戦略・DX・サステナビリティ" },
  { name: "アクセンチュア", industry: "コンサル・IT", category: "コンサル", note: "テクノロジー×コンサル" },
  { name: "デロイト トーマツ コンサルティング", industry: "コンサル", category: "コンサル", note: "Big4系の総合コンサル" },
  { name: "PwCコンサルティング", industry: "コンサル", category: "コンサル", note: "Big4系・戦略からIT" },
  { name: "ベイン・アンド・カンパニー", industry: "コンサル", category: "コンサル", note: "PE投資×戦略コンサル" },

  // 広告・メディア
  { name: "電通", industry: "広告", category: "広告・メディア", note: "国内最大手の総合広告代理店" },
  { name: "博報堂", industry: "広告", category: "広告・メディア", note: "電通と並ぶ大手広告代理店" },
  { name: "リクルートホールディングス", industry: "人材・メディア", category: "広告・メディア", note: "人材・販促の巨大プラットフォーム" },
  { name: "集英社", industry: "出版", category: "広告・メディア", note: "マンガ・ファッション誌" },
  { name: "講談社", industry: "出版", category: "広告・メディア", note: "国内最大手出版社" },

  // 流通・小売
  { name: "伊藤忠食品", industry: "食品卸", category: "流通・小売", note: "食品・飲料の専門商社" },
  { name: "セブン&アイ・ホールディングス", industry: "流通・小売", category: "流通・小売", note: "コンビニ・スーパー最大手" },
  { name: "イオン", industry: "流通・小売", category: "流通・小売", note: "流通グループ最大手" },
  { name: "ニトリ", industry: "小売", category: "流通・小売", note: "家具・インテリアチェーン" },
  { name: "ユニクロ（ファーストリテイリング）", industry: "小売・アパレル", category: "流通・小売", note: "グローバルSPAブランド" },

  // インフラ・不動産
  { name: "東日本旅客鉄道（JR東日本）", industry: "鉄道・交通", category: "インフラ", note: "首都圏を中心とした鉄道" },
  { name: "東京電力ホールディングス", industry: "電力", category: "インフラ", note: "電力インフラの巨人" },
  { name: "三菱地所", industry: "不動産", category: "インフラ", note: "丸の内を中心に展開" },
  { name: "三井不動産", industry: "不動産", category: "インフラ", note: "商業・住宅・ホテル" },
  { name: "鹿島建設", industry: "建設", category: "インフラ", note: "スーパーゼネコン" },

  // 航空・観光
  { name: "日本航空（JAL）", industry: "航空", category: "航空・観光", note: "国内外を結ぶ大手航空会社" },
  { name: "全日本空輸（ANA）", industry: "航空", category: "航空・観光", note: "国内最大の航空会社" },
  { name: "JTB", industry: "旅行", category: "航空・観光", note: "国内最大手の旅行会社" },
];

export const categories = [
  "すべて", "メーカー", "IT", "商社", "金融", "コンサル", "広告・メディア", "流通・小売", "インフラ", "航空・観光",
];
