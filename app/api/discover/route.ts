import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { answers, industry, jobType } = await req.json();

    // answers: [{ q: 質問, a: 本人が書いた回答 }]。空の回答は除外する
    const list: { q: string; a: string }[] = Array.isArray(answers) ? answers : [];
    const filled = list.filter((x) => x && x.a && String(x.a).trim());
    const answerText = filled.length
      ? filled.map((x) => `・${x.q}\n  → ${x.a}`).join("\n")
      : "（記入なし）";

    const prompt = `あなたは就活生の自己分析を手伝うコーチです。学生が「日常の経験」について実際に書いた回答を読み、その中から"ガクチカ（学生時代に力を入れたこと）になりうるもの"を見つけて、本人に気づかせてください。

【最重要の大前提（絶対厳守）】
- 下の回答に本人が実際に書いたことだけを根拠にする。
- 本人が書いていない具体的な数字・エピソード・行動を創作して付け足しては絶対にいけない（例：「月1万円貯金した」など勝手に決めない）。
- 本人の言葉を言い換え・意味づけするのはOK。だが"やってもいないこと"を足すのはNG。
- 空欄・未記入の項目からは何も作らない。
- ゴールは「そんな些細なことがガクチカになるんだ！」と本人が気づくこと。

【本人が書いた日常の経験】
${answerText}

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}

【出力ルール】
- 上の回答の中から、ガクチカの種になりそうなものを6〜10個ピックアップする。1つの回答から複数の角度を見つけてもよい。
- 書かれた内容が少ない場合は、書かれたものだけを無理なく広げる（数は少なくてよい。創作で水増ししない）。
- titleは本人の経験に即した具体的な名前にする（本人が書いた範囲で。数字は本人が書いていなければ入れない）。
- strengthは、その経験から表れている強みを簡潔に。
- whyは「なぜそれがガクチカになるのか」を、本人が書いた内容に触れて説明する。
- howToDeepenは「面接で語れるガクチカにするために、次に何を思い出す・掘ると良いか」を一言で。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "intro": "本人を勇気づける一言（例：あなたのこの経験、りっぱなガクチカになります）（45字以内）",
  "candidates": [
    { "source": "どの回答から見つけたか（15字以内）", "title": "ガクチカの名前（本人の経験に即して・25字以内）", "strength": "表れている強み（25字以内）", "why": "なぜガクチカになるか。本人の記入に触れて（90字以内）", "howToDeepen": "次に思い出す・掘るとよいこと（50字以内）" }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
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
