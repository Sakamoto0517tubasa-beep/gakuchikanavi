import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// 環境変数が未設定でもビルドが壊れないようにする
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

// Supabase が有効か（公開投稿が使えるか）
export const isSupabaseEnabled = !!supabase;

// 公開投稿の型（DB: public_posts テーブル）
export type PublicPost = {
  id: string;
  created_at: string;
  grade: string;
  industry: string;
  job_type: string;
  category: string;
  title: string;
  body: string;
};

// 公開投稿を新しい順に取得
export async function fetchPublicPosts(): Promise<PublicPost[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("public_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("fetchPublicPosts", error);
    return [];
  }
  return (data ?? []) as PublicPost[];
}

// 公開投稿を追加
export async function addPublicPost(p: {
  grade: string;
  industry: string;
  jobType: string;
  category: string;
  title: string;
  body: string;
}): Promise<PublicPost | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("public_posts")
    .insert({
      grade: p.grade,
      industry: p.industry,
      job_type: p.jobType,
      category: p.category,
      title: p.title,
      body: p.body,
    })
    .select()
    .single();
  if (error) {
    console.error("addPublicPost", error);
    return null;
  }
  return data as PublicPost;
}

// 公開投稿を削除（自分の投稿のみボタンを出す運用）
export async function deletePublicPost(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("public_posts").delete().eq("id", id);
  if (error) {
    console.error("deletePublicPost", error);
    return false;
  }
  return true;
}

// 自分が投稿したIDを端末に記録（他人の投稿に削除ボタンを出さないため）
const MINE_KEY = "gn_my_public_posts";
export function getMyPublicPostIds(): string[] {
  try {
    const r = localStorage.getItem(MINE_KEY);
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}
export function addMyPublicPostId(id: string) {
  try {
    localStorage.setItem(MINE_KEY, JSON.stringify([id, ...getMyPublicPostIds()]));
  } catch {}
}
export function removeMyPublicPostId(id: string) {
  try {
    localStorage.setItem(MINE_KEY, JSON.stringify(getMyPublicPostIds().filter((x) => x !== id)));
  } catch {}
}
