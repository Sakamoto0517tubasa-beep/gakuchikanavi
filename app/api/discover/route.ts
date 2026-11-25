import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rawKey = process.env.GROQ_API_KEY ?? "";
const cleanKey = rawKey.replace(/[^\x21-\x7E]/g, "");
const groq = new Groq({ apiKey: cleanKey });

export async function POST(req: NextRequest) {
  try {
    const { history, industry, jobType, finish } = await req.json();
    const hist: { q: string; a: string }[] = Array.isArray(history) ? history : [];

    const histText = hist.length
      ? hist.map((h, i) => `Q${i + 1}: ${h.q}\nA${i + 1}: ${h.a}`).join("\n")
      : "（まだやり取りなし）";

    // 5往復たまる or 本人が「もう十分」と指定したら候補出しフェーズに切り替える
    const forceFinish = finish === true || hist.length >= 5;

    const prompt = `あなたは、学生が「自分でも気づいていないガクチカ」を見つけるのを手伝う、聞き上手なキャリアカウンセラーです。相手は「自分にはガクチカが無い」と思い込んでいる学生。対話（ヒアリング）で、本人の"実際の経験"を具体的に引き出してください。

【これまでのやり取り】
${histText}

【進め方】
- ${forceFinish ? "すでに十分やり取りした。これ以上は聞かず、candidatesを出す（done:true）。" : "まだ情報が足りなければ、次の質問を1つだけ返す（done:false）。"}
- 質問するときの掘り方：
  - 相手の直前の回答を受けて、「具体的に何をした？」「印象に残っている場面は？」「自分なりに工夫したことは？」「大変だったことは？」と"実際の中身"を掘る。
  - 1つの話が見えたら、「他に時間を使っていることは？」と別の経験にも広げる。
  - 「特にない」と言われても、日常（バイト・習慣・人間関係・趣味・家のこと）からやさしく具体を引き出す。
  - 質問は1つだけ、60字以内、はい/いいえで終わらない答えやすい開かれた質問。

【候補を出すときのルール（done:trueのとき）】
- 本人が"実際に話した内容"だけを根拠にする。本人が話していない数字・エピソード・行動を創作して付け足さない。
- 話に出た経験から、ガクチカになりそうなものを3〜6個。本人の発言に紐づける。
- titleは本人の話に即した具体的な名前。strengthは表れている強み。whyは本人の発言に触れて。howToDeepenは次に掘ると良いこと。

出力は以下のJSONのみ（前後に余計なテキストや\`\`\`は不要）。${forceFinish ? "done は必ず true。" : "まだ聞くなら前者、十分なら後者。"}
・まだ聞く場合: { "done": false, "question": "次の質問（60字以内）" }
・十分な場合: { "done": true, "intro": "本人を勇気づける一言（45字以内）", "candidates": [ { "source": "本人の発言のどれから（20字以内）", "title": "ガクチカの名前（25字以内）", "strength": "強み（25字以内）", "why": "なぜガクチカか。本人の発言に触れて（90字以内）", "howToDeepen": "次に掘ると良いこと（50字以内）" } ] }

${industry || jobType ? `【参考：志望】${industry || "未定"}／${jobType || "未定"}` : ""}`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2600,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found");
    const parsed = JSON.parse(jsonMatch[0]);
    // 安全策：5往復たまったら必ず候補フェーズにする
    if (forceFinish && !parsed.candidates) parsed.done = false;
    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "発掘に失敗しました" }, { status: 500 });
  }
}
