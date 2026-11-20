import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { experiences, detail, industry, jobType } = await req.json();

    const expText = Array.isArray(experiences) && experiences.length
      ? experiences.join("、")
      : "（選択なし）";

    const prompt = `あなたは新卒就活のトップコーチで、「どんな些細な経験からでもガクチカを見つける」名人です。多くの学生は「自分にはガクチカがない」「こんなの大したことない」と思い込んでいますが、日常の何気ない経験の中にこそ、その人らしいガクチカの種があります。以下の学生が持っている経験から、ガクチカになりうるものを4個"発掘"し、「えっ、こんなことでもガクチカになるの！？」という驚きと納得を与えてください。

【学生が持っている経験】
カテゴリ: ${expText}
具体的な内容・最近がんばったこと: ${detail || "（未記入）"}

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}

【最重要の考え方】
- 派手な実績・リーダー経験・大きな成果は一切不要。むしろ「本人が絶対ガクチカだと思っていない、ごく些細な日常」を狙って拾う。
- 例：毎朝自炊している→健康管理と継続力／ゲームのギルドをまとめた→オンラインでの合意形成力／友達の相談によく乗る→傾聴と信頼構築／節約して貯金→目標から逆算する計画性／推し活で遠征を計画→情報収集と段取り力／3年間皆勤→地道な自己管理。このように、ありふれた行動の裏にある「無意識にやっている工夫・こだわり・継続」を言語化する。
- 大事なのは成果の大きさではなく、「なぜそうしたか（その人の価値観・こだわり）」と「どんな小さな工夫をしたか」。そこにその人らしさが出る。

【ルール】
- 4個はできるだけ違う経験・違う強みから発掘し、似た切り口を重ねない。
- 各候補で「そこに表れている強み」を具体的に言語化し、「なぜこれがガクチカになるのか」を本人が「確かに！」と納得できるよう説明する。
- 「コミュニケーション能力」等の抽象語でまとめず、具体的な行動に基づいて語る。
- 具体的な内容が未記入でも、選択カテゴリから「ありがちな些細な日常」を現実的に想像して膨らませる。
- howToTellでは、その些細な経験を面接で"どう深掘りして具体化すれば武器になるか"（どんなエピソード・数字を足すか）を示す。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "intro": "本人を勇気づける一言（例：その日常、十分ガクチカになります）（40字以内）",
  "candidates": [
    {
      "title": "ガクチカのタイトル（25字以内）",
      "source": "元になった経験（15字以内）",
      "hiddenStrength": "そこに表れている強み（30字以内）",
      "why": "なぜこれがガクチカになるのか。本人が「確かに！」と思える説明（130字以内）",
      "howToTell": "面接でどう伝えるか・どう深掘りして具体化するか（130字以内）"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 3000,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found");
    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "発掘に失敗しました" }, { status: 500 });
  }
}
