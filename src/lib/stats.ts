import { DOMAINS } from "../data";
import { BY_TASK, ORDER, QUESTIONS, TASKS, TESTS, type TaskInfo } from "./catalog";
import type { Domain, Progress, RunEntry } from "./types";

export type TaskStatus = "new" | "weak" | "shaky" | "close" | "going" | "solid";
export const STATUS_LABEL: Record<TaskStatus, string> = { new: "Not started", weak: "Weak", shaky: "Needs work", close: "Nearly there", going: "Correct so far", solid: "Solid" };

/** Practice-test questions for each task, by test id, so a task's status can draw on test answers too. */
const TEST_QS: Record<string, { test: string; id: string }[]> = {};
for (const T of TESTS) for (const q of T.questions) (TEST_QS[q.task] ??= []).push({ test: T.id, id: q.id });

/**
 * total/answered/right count the drill questions only. seen/correct add the latest attempt of each practice test,
 * and the status comes from those: below 50% weak, below 75% shaky, below 95% close, otherwise solid once every drill is done.
 */
export interface TaskStat { total: number; answered: number; right: number; seen: number; correct: number; status: TaskStatus }

export function taskStat(p: Progress, taskId: string): TaskStat {
  const qs = BY_TASK[taskId];
  let answered = 0, right = 0;
  for (const q of qs) { const r = p.a[q.id]; if (r) { answered++; if (r.ok) right++; } }
  let seen = answered, correct = right;
  for (const { test, id } of TEST_QS[taskId] ?? []) {
    const e = p.t[test]?.last.q[id];
    if (e) { seen++; if (entryCorrect(e)) correct++; }
  }
  let status: TaskStatus = "new";
  if (seen > 0) {
    const ratio = correct / seen;
    status = ratio < 0.5 ? "weak" : ratio < 0.75 ? "shaky" : ratio < 0.95 ? "close" : answered < qs.length ? "going" : "solid";
  }
  return { total: qs.length, answered, right, seen, correct, status };
}

export function domainStat(p: Progress, d: Domain) {
  const s = { total: 0, answered: 0, right: 0 };
  for (const t of d.tasks) { const ts = taskStat(p, t.id); s.total += ts.total; s.answered += ts.answered; s.right += ts.right; }
  return s;
}

/** Overall numbers; accuracy is weighted by each domain's share of the exam, counting only domains with answers. */
export function overall(p: Progress) {
  let answered = 0, right = 0, wsum = 0, wacc = 0, needWork = 0;
  for (const d of DOMAINS) {
    const s = domainStat(p, d);
    answered += s.answered; right += s.right;
    if (s.answered > 0) { wsum += d.weight; wacc += d.weight * (s.right / s.answered); }
    for (const t of d.tasks) { const st = taskStat(p, t.id).status; if (st === "weak" || st === "shaky") needWork++; }
  }
  return { total: QUESTIONS.length, answered, right, needWork, weighted: wsum > 0 ? Math.round((100 * wacc) / wsum) : null };
}

/** Statements that need the lessons: weak first, then shaky; within each, heavier exam domains first. */
export function weakTasks(p: Progress): { task: TaskInfo; stat: TaskStat }[] {
  const out = ORDER.map((id) => ({ task: TASKS[id], stat: taskStat(p, id) })).filter((w) => w.stat.status === "weak" || w.stat.status === "shaky");
  return out.sort((a, b) => a.stat.status === b.stat.status ? b.task.domain.weight - a.task.domain.weight : a.stat.status === "weak" ? -1 : 1);
}

/** Statements that are nearly there: no lessons needed, just more practice questions and tests. Heavier domains first. */
export function closeTasks(p: Progress): { task: TaskInfo; stat: TaskStat }[] {
  return ORDER.map((id) => ({ task: TASKS[id], stat: taskStat(p, id) })).filter((w) => w.stat.status === "close").sort((a, b) => b.task.domain.weight - a.task.domain.weight);
}

/* Advice bands: below 50% fundamentals, 50 to 74% targeted lessons, 75% and above timed practice tests. */
export type Band = "low" | "mid" | "high";
export function band(pct: number): Band { return pct < 50 ? "low" : pct < 75 ? "mid" : "high"; }
export const BAND_LABEL: Record<Band, string> = { low: "Build the basics", mid: "Study the lessons", high: "Ready for practice tests" };

/** A test entry is correct when the picked position holds original option 0. */
export function entryCorrect(e: RunEntry | undefined) { return !!e && e[1] >= 0 && e[0].charAt(e[1]) === "0"; }
