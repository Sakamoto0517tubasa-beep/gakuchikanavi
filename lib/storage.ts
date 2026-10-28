export type SavedSuggestion = {
  rank: number;
  title: string;
  tagline: string;
  reason: string;
  howToStart: string;
  script: string;
  period: string;
};

export type SavedDiagnosis = {
  date: string;
  grade: string;
  industry: string;
  jobType: string;
  strengthProfile: string;
  suggestions: SavedSuggestion[];
};

export type SavedGakuchika = {
  id: string;
  date: string;
  title: string;
  fullText: string;
  structure: { situation: string; task: string; action: string; result: string };
  appealPoints: string[];
  interviewQs: string[];
  industry?: string;
  jobType?: string;
};

export type ScoutInterest = { company: string; role: string; date: string };
export type UserPost = {
  id: string;
  date: string;
  grade: string;
  industry: string;
  jobType: string;
  category: string;
  title: string;
  body: string;
};

const DIAG_KEY = "gn_diagnosis";
const GAKU_KEY = "gn_gakuchika";

export function saveDiagnosis(d: SavedDiagnosis) {
  try { localStorage.setItem(DIAG_KEY, JSON.stringify(d)); } catch {}
}

export function getDiagnosis(): SavedDiagnosis | null {
  try { const r = localStorage.getItem(DIAG_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}

export function getGakuchikaList(): SavedGakuchika[] {
  try { const r = localStorage.getItem(GAKU_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}

export function saveGakuchika(g: SavedGakuchika) {
  try { localStorage.setItem(GAKU_KEY, JSON.stringify([g, ...getGakuchikaList()])); } catch {}
}

export function deleteGakuchika(id: string) {
  try { localStorage.setItem(GAKU_KEY, JSON.stringify(getGakuchikaList().filter((g) => g.id !== id))); } catch {}
}

// --- スカウト興味あり ---
const SCOUT_KEY = "gn_scout_interest";
export function getScoutInterests(): ScoutInterest[] {
  try { const r = localStorage.getItem(SCOUT_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
export function isScoutInterested(company: string): boolean {
  return getScoutInterests().some((s) => s.company === company);
}
export function toggleScoutInterest(company: string, role: string): boolean {
  const list = getScoutInterests();
  const exists = list.some((s) => s.company === company);
  const next = exists ? list.filter((s) => s.company !== company) : [{ company, role, date: new Date().toISOString() }, ...list];
  try { localStorage.setItem(SCOUT_KEY, JSON.stringify(next)); } catch {}
  return !exists;
}

// --- みんなのガクチカ投稿 ---
const POSTS_KEY = "gn_posts";
export function getPosts(): UserPost[] {
  try { const r = localStorage.getItem(POSTS_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
export function addPost(p: UserPost) {
  try { localStorage.setItem(POSTS_KEY, JSON.stringify([p, ...getPosts()])); } catch {}
}
export function deletePost(id: string) {
  try { localStorage.setItem(POSTS_KEY, JSON.stringify(getPosts().filter((p) => p.id !== id))); } catch {}
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  } catch { return ""; }
}
