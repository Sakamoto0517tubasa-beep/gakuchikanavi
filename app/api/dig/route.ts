import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { gakuchika, history } = await req.json();
    const hist: { q: string; a: string }[] = Array.isArray(history) ? history : [];

    const histText = hist.length
      ? hist.map((h, i) => `Q${i + 1}: ${h.q}\nA${i + 1}: ${h.a}`).join("\n")
      : "（まだやり取りなし）";

    const prompt = `あなたは学生のガクチカ作成を手伝う、聞き上手なコーチです。学生が選んだガクチカのテーマについて、本人もうまく言語化できていない「動機・原体験・具体的な場面・その時の感情・転機・学び」を引き出すため、1問ずつ質問します。

【ガクチカのテーマ】
${gakuchika?.title ?? ""}（${gakuchika?.tagline ?? ""}）

【これまでのやり取り】
${histText}

【次の質問の作り方】
- 最優先は「なぜそれに取り組もう（取り組んだ）と思ったのか＝動機・きっかけ・原体験」。まだ十分に深掘れていなければ、まずそこを掘る。
- 動機が見えてきたら、具体的な場面・エピソード → その時の感情や葛藤 → 工夫した理由 → 困難と乗り越え方 → 得た学び、へと展開する。
- 直前の回答を受けて、さらに一歩深く掘る質問にする（表面的な繰り返しにしない）。
- 質問は1つだけ、60字以内。「はい/いいえ」で終わらない、答えやすく具体的な開かれた質問にする。
- すでに動機・具体エピソード・感情・学びが十分に引き出せている、またはやり取りが5件以上なら done=true にし、questionには短いねぎらいの一言を入れる。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{ "question": "次の質問（または締めの一言）", "done": false }`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found");
    const parsed = JSON.parse(jsonMatch[0]);
    if (hist.length >= 5) parsed.done = true;
    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "質問の生成に失敗しました" }, { status: 500 });
  }
}
