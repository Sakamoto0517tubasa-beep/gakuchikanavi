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

    const prompt = `あなたは新卒就活のトップコーチです。多くの学生は「自分にはガクチカがない」「これはガクチカじゃない」と思い込んでいますが、日常の経験の中に必ずガクチカの種があります。以下の学生が持っている経験から、ガクチカになりうるものを2〜3個"発掘"し、「実はこれがガクチカになる」と気づかせてください。

【学生が持っている経験】
カテゴリ: ${expText}
具体的な内容・最近がんばったこと: ${detail || "（未記入）"}

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}

【ルール】
- 「本人がガクチカだと思っていない、何気ない経験」にこそ光を当てる。派手な実績でなくてOK。
- アルバイトの小さな工夫、続けている習慣、家族・友人の手伝い、趣味の継続なども立派なガクチカの種になることを示す。
- 各候補で「そこに表れている強み」を具体的に言語化し、「なぜこれがガクチカになるのか」を本人が納得できるように説明する。
- 「コミュニケーション能力」等の抽象語でまとめず、具体的な行動に基づいて語る。
- 具体的な内容が未記入でも、選択カテゴリから現実的に膨らませて提案する。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "intro": "本人を勇気づける一言（40字以内）",
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
      temperature: 0.75,
      max_tokens: 2200,
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
