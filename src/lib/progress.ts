import type { Progress } from "./types";

export const STORAGE_KEY = "z2a-ccaf-study-v1";
export const emptyProgress = (): Progress => ({ a: {}, t: {} });

export function loadLocal(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { const p = JSON.parse(raw); if (p && p.a) return { ...p, t: p.t || {} }; }
  } catch { /* private mode or corrupt data: start fresh */ }
  return emptyProgress();
}
export function saveLocal(p: Progress) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* storage unavailable */ } }
export function clearLocal() { try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ } }

/** Combine this browser's progress with the account's: per question and per test keep the copy with more attempts; best score is the higher one. */
export function mergeProgress(local: Progress, remote: Progress): Progress {
  const out: Progress = { a: {}, t: {} };
  for (const src of [local, remote]) {
    for (const [id, x] of Object.entries(src.a || {})) { const y = out.a[id]; if (!y || x.n > y.n) out.a[id] = x; }
    for (const [id, x] of Object.entries(src.t || {})) {
      const y = out.t[id];
      if (!y) { out.t[id] = x; continue; }
      const w = x.n > y.n || (x.n === y.n && x.last && y.last && x.last.when > y.last.when) ? x : y;
      out.t[id] = { ...w, best: Math.max(x.best || 0, y.best || 0) };
    }
  }
  const run = local.run || remote.run;
  if (run) out.run = run;
  return out;
}
