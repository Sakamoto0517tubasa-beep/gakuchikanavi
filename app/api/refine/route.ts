import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { fullText, request: userRequest, industry, jobType } = await req.json();

    const prompt = `あなたは新卒就活のトップコーチです。学生が書いたガクチカ本文を、本人の要望に沿って書き直してください。

【現在のガクチカ本文】
${fullText}

【学生の志望】
業界: ${industry}／職種: ${jobType}

【本人の要望】
${userRequest}

【ルール】
- 要望に沿って本文を改善する。要望が「もっと具体的に」なら具体的な数字・行動を足す、「短く」なら要点を残して圧縮する、など。
- 嘘や非現実的な誇張は加えない。元の内容の筋は保つ。
- ESにそのまま使える完成本文にする（300〜420字目安、一人称）。
- 余計な説明は書かず、本文だけを返す。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{ "fullText": "書き直した本文" }`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found");
    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "書き直しに失敗しました" }, { status: 500 });
  }
}
