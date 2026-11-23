// AI APIへのPOST。混雑（レート制限）や一時エラー時に自動で再試行する。
// onRetry(attempt) は再試行に入るたびに呼ばれる（UIで「混み合っています」を出すため）。
export async function postAI<T>(
  url: string,
  body: unknown,
  opts?: { retries?: number; onRetry?: (attempt: number) => void }
): Promise<T> {
  const retries = opts?.retries ?? 3;
  let lastErr: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.error) throw new Error(String(data.error));
        return data as T;
      }
      // 429/500/503 など → 再試行対象
      throw new Error(`status ${res.status}`);
    } catch (e) {
      lastErr = e;
      if (attempt < retries) {
        opts?.onRetry?.(attempt + 1);
        // 1.2s, 2.4s, 3.6s … と待ち時間を伸ばす（指数的バックオフ）
        await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
      }
    }
  }
  throw lastErr ?? new Error("request failed");
}
