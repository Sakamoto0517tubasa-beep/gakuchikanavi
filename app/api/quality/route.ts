import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { fullText, industry, jobType } = await req.json();

    const prompt = `あなたは新卒就活のトップコーチです。以下のガクチカ（学生時代に力を入れたこと）を、プロの視点で厳しく採点してください。

【ガクチカ本文】
${fullText}

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}

【採点の5観点（各20点満点・合計100点）】
1. motivation（動機の深さ）：なぜ取り組んだのか＝動機・原体験・価値観が明確で説得力があるか。ここが最重要。
2. concreteness（具体性・数字）：行動や成果が具体的か、数字で示せているか。
3. learning（学びと再現性）：経験から何を学び、それが今後どう活きるかまで語れているか。
4. coherence（一貫性）：動機→状況→行動→結果→学びが一本の筋で通っているか。
5. originality（自分らしさ）：ありきたりな表現でなく、その人らしい個性・具体エピソードが出ているか。

【ルール】
- 各観点に点数（0〜20の整数）と、改善のヒントを含む短いコメント（1文・40字以内）を付ける。甘く付けず、現実的に。
- commentは「良い点」か「もっとこうすると良い」を具体的に。
- summaryは全体の一言講評（50字以内）。
- 必ず動機(motivation)の観点を最重視して評価する。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "total": 合計点(0-100),
  "summary": "全体の一言講評",
  "axes": [
    { "key": "motivation", "name": "動機の深さ", "score": 0, "comment": "" },
    { "key": "concreteness", "name": "具体性・数字", "score": 0, "comment": "" },
    { "key": "learning", "name": "学びと再現性", "score": 0, "comment": "" },
    { "key": "coherence", "name": "一貫性", "score": 0, "comment": "" },
    { "key": "originality", "name": "自分らしさ", "score": 0, "comment": "" }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 1200,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found");
    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "診断に失敗しました" }, { status: 500 });
  }
}
