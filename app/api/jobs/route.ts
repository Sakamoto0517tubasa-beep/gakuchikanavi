import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { keywords, location } = await req.json();
  const apiKey = process.env.JOOBLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "JOOBLE_API_KEY not set" }, { status: 500 });
  }

  const res = await fetch(`https://jooble.org/api/${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keywords, location: location || "日本", page: 1 }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Jooble API error" }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
