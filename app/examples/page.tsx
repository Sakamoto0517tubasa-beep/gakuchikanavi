"use client";

import { useEffect, useState } from "react";
import { examples, exampleCategories } from "@/lib/examples";
import { getDiagnosis, formatDate } from "@/lib/storage";
import {
  isSupabaseEnabled, fetchPublicPosts, addPublicPost, deletePublicPost,
  getMyPublicPostIds, addMyPublicPostId, removeMyPublicPostId,
  changePostLikes, getLikedPostIds, setLikedPostIds, type PublicPost,
} from "@/lib/supabase";

const CAT_COLOR: Record<string, string> = {
  "アルバイト": "#EA6C00", "サークル": "#0096DF", "部活動": "#1565C0", "ゼミ・研究": "#2E7D32",
  "長期インターン": "#5E35B1", "ボランティア": "#C2185B", "個人活動": "#00838F",
  "趣味・エンタメ": "#D81B60", "留学・旅行": "#0277BD", "学校行事": "#EF6C00",
  "起業・ビジネス": "#455A64", "資格・勉強": "#8A6D3B", "その他": "#607D8B",
};

// 投稿時に選べるカテゴリー（「すべて」を除く）
const POST_CATEGORIES = exampleCategories.filter((c) => c !== "すべて");

export default function ExamplesPage() {
  const [cat, setCat] = useState("すべて");
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [myIds, setMyIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // 投稿フォーム
  const [composing, setComposing] = useState(false);
  const [fTitle, setFTitle] = useState("");
  const [fBody, setFBody] = useState("");
  const [fCat, setFCat] = useState(POST_CATEGORIES[0]);

  async function reload() {
    setPosts(await fetchPublicPosts());
  }

  useEffect(() => {
    setMyIds(getMyPublicPostIds());
    setLikedIds(getLikedPostIds());
    reload();
  }, []);

  // いいねのオン/オフ（1端末1いいね）
  async function toggleLike(id: string) {
    const liked = likedIds.includes(id);
    const delta = liked ? -1 : 1;
    // 楽観的にUIを更新
    const nextLiked = liked ? likedIds.filter((x) => x !== id) : [id, ...likedIds];
    setLikedIds(nextLiked);
    setLikedPostIds(nextLiked);
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: Math.max(0, (p.likes ?? 0) + delta) } : p)));
    const newCount = await changePostLikes(id, delta);
    if (newCount === null) {
      // 失敗したら元に戻す
      const revert = liked ? [id, ...nextLiked] : nextLiked.filter((x) => x !== id);
      setLikedIds(revert);
      setLikedPostIds(revert);
      reload();
      return;
    }
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: newCount } : p)));
  }

  async function removePost(id: string) {
    const ok = await deletePublicPost(id);
    if (ok) {
      removeMyPublicPostId(id);
      setMyIds(getMyPublicPostIds());
      reload();
    }
  }

  function openCompose() {
    // カテゴリー絞り込み中なら、そのカテゴリーを初期選択
    setFCat(cat !== "すべて" && POST_CATEGORIES.includes(cat) ? cat : POST_CATEGORIES[0]);
    setFTitle("");
    setFBody("");
    setComposing(true);
  }

  async function submitPost() {
    if (!fTitle.trim() || !fBody.trim() || submitting) return;
    setSubmitting(true);
    const diag = getDiagnosis();
    const created = await addPublicPost({
      grade: diag?.grade || "",
      industry: diag?.industry || "",
      jobType: diag?.jobType || "",
      category: fCat,
      title: fTitle.trim(),
      body: fBody.trim(),
    });
    setSubmitting(false);
    if (!created) {
      alert("投稿に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    addMyPublicPostId(created.id);
    setMyIds(getMyPublicPostIds());
    await reload();
    setComposing(false);
  }

  const canPost = fTitle.trim().length > 0 && fBody.trim().length > 0 && !submitting;
  const list = examples.filter((e) => cat === "すべて" || e.category === cat);
  const showPosts = cat === "すべて" ? posts : posts.filter((p) => p.category === cat);

  return (
    <main className="min-h-screen bg-[#F2F3F5]">
      {/* トップバー */}
      <header className="bg-white border-b-2 border-[#0096DF]">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <span className="text-[18px] font-medium text-[#0A3059] tracking-tight">ガクチカナビ</span>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 pt-3.5 pb-3">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[16px] font-medium text-[#0A3059]">みんなのガクチカ</h1>
            <button
              onClick={openCompose}
              className="shrink-0 inline-flex items-center gap-1 text-[13px] font-medium text-white bg-[#F08300] px-3 py-1.5 rounded active:scale-95 hover:bg-[#d97600] transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg>
              投稿する
            </button>
          </div>
          <p className="text-[13px] text-gray-500 mb-3">先輩たちの実際のガクチカを参考にしよう</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {exampleCategories.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${cat === c ? "bg-[#0A3059] text-white border-[#0A3059]" : "bg-white text-gray-600 border-gray-300"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col gap-3">
        {showPosts.map((p) => {
          const mine = myIds.includes(p.id);
          return (
            <article key={p.id} className={`bg-white rounded px-4 py-4 ${mine ? "border-2 border-[#9fd3ef]" : "border border-gray-200"}`}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" /></svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-gray-800">{mine ? "あなたの投稿" : "みんなの投稿"}{p.grade ? `・${p.grade}` : ""}</p>
                  <p className="text-[11px] text-gray-400">{p.industry || p.job_type ? `志望：${p.industry}／${p.job_type}・` : ""}{formatDate(p.created_at)}</p>
                </div>
                {p.category && (
                  <span className="text-[10px] text-white px-1.5 py-0.5 rounded-sm shrink-0" style={{ backgroundColor: CAT_COLOR[p.category] ?? "#607D8B" }}>{p.category}</span>
                )}
              </div>
              <p className="text-[15px] font-medium text-gray-900 mb-1.5">{p.title}</p>
              <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">{p.body}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleLike(p.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-all active:scale-95 ${
                    likedIds.includes(p.id)
                      ? "bg-[#FDEEE6] border-[#EA6C00] text-[#EA6C00]"
                      : "bg-white border-gray-300 text-gray-500 hover:border-[#EA6C00]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={likedIds.includes(p.id) ? "#EA6C00" : "none"} stroke="#EA6C00" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" strokeLinejoin="round" /></svg>
                  参考になった {p.likes ?? 0}
                </button>
                {mine && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white px-1.5 py-0.5 rounded-sm bg-[#0096DF]">自分</span>
                    <button onClick={() => removePost(p.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors">削除</button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
        {list.map((e) => (
          <article key={e.id} className="bg-white rounded border border-gray-200 px-4 py-4">
            {/* 投稿者 */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A3059" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round"/></svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-800">{e.grade}・{e.profile}</p>
                <p className="text-[11px] text-gray-400">志望：{e.industry}／{e.jobType}</p>
              </div>
              <span className="text-[10px] text-white px-1.5 py-0.5 rounded-sm shrink-0" style={{ backgroundColor: CAT_COLOR[e.category] ?? "#607D8B" }}>{e.category}</span>
            </div>

            {/* 本文 */}
            <p className="text-[15px] font-medium text-gray-900 mb-1.5">{e.title}</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">{e.body}</p>

            {/* いいね */}
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EA6C00" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" strokeLinejoin="round"/></svg>
              <span className="text-xs text-gray-500">参考になった {e.likes}</span>
            </div>
          </article>
        ))}
        <p className="text-[11px] text-gray-400 text-center mt-4">ガクチカナビ v1.0</p>
      </div>

      {/* 投稿フォーム（モーダル） */}
      {composing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={() => setComposing(false)}>
          <div className="bg-white w-full sm:max-w-lg sm:rounded-lg rounded-t-2xl max-h-[90vh] overflow-y-auto" onClick={(ev) => ev.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#0A3059]">自分のガクチカを投稿</h2>
              <button onClick={() => setComposing(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="px-4 py-4">
              {/* カテゴリー */}
              <label className="block text-[13px] font-medium text-[#0A3059] mb-2">カテゴリー</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {POST_CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setFCat(c)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${fCat === c ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-300"}`}
                    style={fCat === c ? { backgroundColor: CAT_COLOR[c] ?? "#0A3059" } : undefined}>
                    {c}
                  </button>
                ))}
              </div>

              {/* タイトル */}
              <label className="block text-[13px] font-medium text-[#0A3059] mb-1.5">タイトル</label>
              <input
                value={fTitle}
                onChange={(ev) => setFTitle(ev.target.value)}
                maxLength={40}
                placeholder="例：カフェバイトで客単価を1.2倍にした"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#0096DF] mb-4"
              />

              {/* 本文 */}
              <label className="block text-[13px] font-medium text-[#0A3059] mb-1.5">本文</label>
              <textarea
                value={fBody}
                onChange={(ev) => setFBody(ev.target.value)}
                rows={7}
                maxLength={600}
                placeholder="状況・課題・自分がやったこと・結果を書いてみましょう。&#10;例：アルバイト先のカフェで客単価が伸び悩んでいた課題に対し…"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 leading-relaxed focus:outline-none focus:border-[#0096DF] resize-none"
              />
              <p className="text-[11px] text-gray-400 text-right mt-1">{fBody.length} / 600</p>

              <button
                onClick={submitPost}
                disabled={!canPost}
                className="mt-3 w-full bg-[#F08300] text-white text-[15px] font-medium py-3 rounded active:scale-[0.99] hover:bg-[#d97600] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (<><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />投稿中...</>) : "投稿する"}
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-2">投稿すると「みんなのガクチカ」に公開され、他の人も参考にできます</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
