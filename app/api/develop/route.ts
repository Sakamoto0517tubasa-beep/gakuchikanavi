import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { gakuchika, industry, jobType, grade, inputs } = await req.json();

    const prompt = `あなたは新卒就活のトップコーチです。学生が選んだガクチカのテーマを、面接・ESでそのまま使える「完成したガクチカ」に仕上げてください。

【選んだガクチカ】
タイトル: ${gakuchika?.title ?? ""}
核心: ${gakuchika?.tagline ?? ""}
狙い: ${gakuchika?.reason ?? ""}
始め方: ${gakuchika?.howToStart ?? ""}

【学生情報】
学年: ${grade || "不明"}
志望業界: ${industry}
志望職種: ${jobType}

【本人が入力した具体情報（空欄があればあなたが現実的に補完する）】
取り組む場面・環境: ${inputs?.situation || "（未入力）"}
目標・課題: ${inputs?.task || "（未入力）"}
工夫すること: ${inputs?.action || "（未入力）"}
出したい成果・数字: ${inputs?.result || "（未入力）"}

【ルール】
- fullText は一人称で書く、ESにそのまま貼れる完成本文（320〜400字）。状況→課題→行動→結果→学び、の流れで、必ず具体的な数字を1つ以上入れる。誇張しすぎず現実的に。
- ${grade === "3年生" ? "3年生なので、今から1〜3ヶ月で実際に作れる・達成できる現実的な内容にする。" : "じっくり取り組む前提で、深みのある内容にする。"}
- 「コミュニケーション能力」等の抽象語で締めず、具体的な行動と結果で語る。
- structure は各要素を40字以内で簡潔に。
- appealPoints はこの経験が示す強みを3つ、各20字以内。
- interviewQs は面接で深掘りされそうな質問を3つ、各30字以内。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "fullText": "完成したガクチカ本文（320〜400字）",
  "structure": { "situation": "状況", "task": "課題", "action": "行動", "result": "結果" },
  "appealPoints": ["強み1", "強み2", "強み3"],
  "interviewQs": ["想定質問1", "想定質問2", "想定質問3"]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found");
    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "生成に失敗しました" }, { status: 500 });
  }
}
