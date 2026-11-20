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

    const prompt = `あなたは就活生の自己分析を手伝うコーチです。学生が選んだ経験カテゴリをもとに、「こんな経験、心当たりありませんか？」と本人に問いかけ、本人が自分の中に眠っているガクチカの種に"自分で気づく"のを手伝います。

【最重要の大前提（絶対厳守）】
- あなたは、この学生が実際に何をしたのかを一切知りません。
- だから「あなたは月〇円貯金した」「3店舗を比較した」のような具体的な数字・エピソード・行動を創作して、本人がやったかのように決めつけては絶対にいけません。それは嘘の押し付けです。
- あなたの役割は、「〜な経験はありませんか？」という問いかけと、「もしそれがあれば、こんな強みが表れる」という気づきを示すことだけ。実際の中身は本人が後で埋めます。
- ゴールは、本人が「あ、それならやってるかも！」と自分の経験を思い出すこと。

【学生が選んだカテゴリ】${expText}
【本人が書いた具体的な内容（任意）】${detail || "（未記入）"}

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}

【出力ルール】
- 選んだカテゴリごとに2〜3個の「角度（問いかけ）」を出し、合計8〜10個。カテゴリが未選択・少ない場合は、ありふれた日常全般から幅広く想像して出す。
- titleは、具体的な数字や作り話を含まない、活動の"型"を表す中立的で短いラベル（例：「計画的なお金の管理」「続けている生活習慣」「人の相談に乗ること」）。断定しない。
- questionは「〜した経験はありませんか？」「〜なこと、ありませんか？」という、本人が思い出すための問いかけ形式。本人がやったと決めつけない。
- strengthは、もしその経験があれば表れる強みを簡潔に。
- 本人の記入内容があれば、それに関連する角度を優先しつつ、やはり決めつけず問いかける。
- 8〜10個はカテゴリ・強みがなるべく多様になるようにばらけさせる。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "intro": "本人を勇気づける一言（例：どれか1つでも心当たりがあれば、それがガクチカになります）（45字以内）",
  "prompts": [
    { "category": "どのカテゴリ由来か（10字以内）", "title": "活動の型の中立的ラベル（20字以内・断定しない）", "question": "〜な経験はありませんか？という問いかけ（45字以内）", "strength": "もしあれば表れる強み（25字以内）" }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 2800,
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
