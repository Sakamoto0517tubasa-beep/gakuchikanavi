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

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  } catch { return ""; }
}
