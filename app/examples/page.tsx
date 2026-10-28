"use client";

import { useEffect, useState } from "react";
import { examples, exampleCategories } from "@/lib/examples";
import { getPosts, deletePost, formatDate, type UserPost } from "@/lib/storage";

const CAT_COLOR: Record<string, string> = {
  "アルバイト": "#EA6C00", "サークル": "#0096DF", "ゼミ・研究": "#2E7D32",
  "長期インターン": "#5E35B1", "ボランティア": "#C2185B", "個人活動": "#00838F", "資格・勉強": "#8A6D3B",
};

export default function ExamplesPage() {
  const [cat, setCat] = useState("すべて");
  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => { setPosts(getPosts()); }, []);

  function removePost(id: string) {
    deletePost(id);
    setPosts(getPosts());
  }

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
          <h1 className="text-[16px] font-medium text-[#0A3059] mb-1">みんなのガクチカ</h1>
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
        {showPosts.map((p) => (
          <article key={p.id} className="bg-white rounded border-2 border-[#9fd3ef] px-4 py-4">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-9 h-9 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0096DF" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-800">あなたの投稿{p.grade ? `・${p.grade}` : ""}</p>
                <p className="text-[11px] text-gray-400">志望：{p.industry}／{p.jobType}・{formatDate(p.date)}</p>
              </div>
              <span className="text-[10px] text-white px-1.5 py-0.5 rounded-sm shrink-0 bg-[#0096DF]">自分</span>
            </div>
            <p className="text-[15px] font-medium text-gray-900 mb-1.5">{p.title}</p>
            <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">{p.body}</p>
            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => removePost(p.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors">投稿を削除</button>
            </div>
          </article>
        ))}
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
    </main>
  );
}
