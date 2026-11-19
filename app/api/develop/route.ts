import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { gakuchika, industry, jobType, grade, inputs, dialogue } = await req.json();

    const digText = Array.isArray(dialogue) && dialogue.length
      ? dialogue.map((d: { q: string; a: string }) => `Q: ${d.q}\nA: ${d.a}`).join("\n")
      : "";

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

${digText ? `【AIとの壁打ちで本人から引き出した内容（最重要・ここを最大限に活かす）】
${digText}
` : ""}
【本人が入力した具体情報（空欄があればあなたが現実的に補完する）】
なぜ取り組む(取り組んだ)のか・きっかけ・原体験: ${inputs?.motivation || "（未入力）"}
取り組む場面・環境: ${inputs?.situation || "（未入力）"}
目標・課題: ${inputs?.task || "（未入力）"}
工夫すること: ${inputs?.action || "（未入力）"}
出したい成果・数字: ${inputs?.result || "（未入力）"}

【最重要の方針】
- 採用担当者が本当に知りたいのは「何をどうやったか」よりも「なぜそれに取り組んだのか（動機・問題意識・価値観・原体験）」である。この学生の『なぜ』を最も重視し、ガクチカ全体の軸にすること。
- 本文は冒頭で「なぜ取り組もうと思ったのか（きっかけ・原体験）」に触れ、最後は結果だけで終わらせず「その経験を通じて何を感じ、何を得たか」を最初の動機に呼応させて締める。『なぜ』が一本の筋として通るようにする。
- 動機が未入力・断片的な場合は、本人の人物像や活動内容から、自然で説得力のある動機を推測して補う（嘘くさい美談にはしない）。

【ルール】
- fullText は一人称で書く、ESにそのまま貼れる完成本文（320〜400字）。「動機・きっかけ→状況→課題→行動→結果→学び（動機に呼応）」の流れで、必ず具体的な数字を1つ以上入れる。誇張しすぎず現実的に。
- ${grade === "3年生" ? "3年生なので、今から1〜3ヶ月で実際に作れる・達成できる現実的な内容にする。" : "じっくり取り組む前提で、深みのある内容にする。"}
- 「コミュニケーション能力」等の抽象語で締めず、具体的な行動と結果で語る。
- structure は各要素を40字以内で簡潔に。motivation（なぜ取り組んだか）を必ず含める。
- appealPoints はこの経験が示す強みを3つ、各20字以内。
- interviewQs は面接で深掘りされそうな質問を3つ、各30字以内。「なぜその活動を選んだのか」など動機を問う質問を必ず1つ入れる。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "fullText": "完成したガクチカ本文（320〜400字）",
  "structure": { "motivation": "なぜ取り組んだか（動機・きっかけ）", "situation": "状況", "task": "課題", "action": "行動", "result": "結果" },
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
