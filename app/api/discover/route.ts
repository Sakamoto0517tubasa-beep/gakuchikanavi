import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { answers, industry, jobType } = await req.json();

    // answers: [{ q: 行動, a: 頻度ラベル }]
    const list: { q: string; a: string }[] = Array.isArray(answers) ? answers : [];
    // 「よくある」「たまにある」を優先材料にする
    const strong = list.filter((x) => x.a === "よくある");
    const some = list.filter((x) => x.a === "たまにある");
    const answerText = list.map((x) => `・${x.q} → ${x.a}`).join("\n");
    const strongText = [...strong, ...some].map((x) => `・${x.q}（${x.a}）`).join("\n") || "（該当なし）";

    const prompt = `あなたは就活生の自己分析を手伝うコーチです。学生が「日常でどんな行動をどれくらいしているか」を4択（よくある/たまにある/あまりない/まったくない）で答えた結果を読み、その中から"ガクチカ（学生時代に力を入れたこと）になりうるもの"を見つけて本人に気づかせてください。

【最重要の大前提（絶対厳守）】
- 本人が「よくある／たまにある」と答えた行動＝実際にやっていること、だけを根拠にする。
- 本人がやっていない具体的な数字・エピソード・行動を創作して付け足しては絶対にいけない（例：「月1万円貯金した」など勝手に決めない）。
- 「あまりない／まったくない」の行動からはガクチカを作らない。
- あなたの役割は「その行動は実はガクチカになる」と型と理由を示すこと。具体的な中身（数字・エピソード）は、この後の壁打ちで本人が埋める。
- ゴールは「そんな些細な行動がガクチカになるんだ！」と本人が気づくこと。

【特に力を入れている行動（よくある/たまにある）】
${strongText}

【回答の全体】
${answerText}

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}

【出力ルール】
- 「よくある／たまにある」と答えた行動の中から、ガクチカの種になりそうなものを6〜10個ピックアップする。「よくある」を優先的に、上位に。
- 該当が少ない場合は、ある分だけ無理なく出す（創作で水増ししない）。
- titleは、その行動に即したガクチカの名前。ただし本人が答えていない具体的な数字は入れない（型として表現する）。
- strengthは、その行動から表れる強みを簡潔に。
- whyは「なぜそれがガクチカになるのか」を、その行動に触れて説明する。
- howToDeepenは「面接で語れるガクチカにするために、次に何を思い出す・掘ると良いか」を一言で。

以下のJSON形式のみで回答（前後に余計なテキストや\`\`\`は不要）:
{
  "intro": "本人を勇気づける一言（例：あなたが"よくやっていること"、りっぱなガクチカになります）（45字以内）",
  "candidates": [
    { "source": "どの行動から見つけたか（20字以内）", "title": "ガクチカの名前（行動に即して・25字以内）", "strength": "表れている強み（25字以内）", "why": "なぜガクチカになるか。その行動に触れて（90字以内）", "howToDeepen": "次に思い出す・掘るとよいこと（50字以内）" }
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
