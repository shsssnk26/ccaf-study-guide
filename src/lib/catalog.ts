import { DOMAINS } from "../data/domains";
import { QUESTION_BANK } from "../data/questions";
import { PRACTICE_TESTS } from "../data/tests";
import type { Domain, PracticeTestSource, Question, Task } from "./types";

export const ACADEMY_URL = "https://anthropic.skilljar.com/";
export const TEST_MINUTES = 120;

export interface TaskInfo extends Task { domain: Domain }
export interface PracticeTest extends Omit<PracticeTestSource, "questions"> { questions: Question[] }

export const TASKS: Record<string, TaskInfo> = {};
/** Task ids in exam-guide order. */
export const ORDER: string[] = [];
export const BY_TASK: Record<string, Question[]> = {};
export const BY_ID: Record<string, Question> = {};
export const QUESTIONS: Question[] = [];

for (const d of DOMAINS) for (const t of d.tasks) { TASKS[t.id] = { ...t, domain: d }; BY_TASK[t.id] = []; ORDER.push(t.id); }

/* Question ids ("1.3-2") are the key for saved answers, so they must stay stable: task id plus position within that task. */
for (const src of QUESTION_BANK) {
  const list = BY_TASK[src.task];
  const q: Question = { ...src, id: `${src.task}-${list.length + 1}` };
  list.push(q); QUESTIONS.push(q); BY_ID[q.id] = q;
}

/* Test question ids use the position as written ("t1-14"); on screen they are grouped by scenario. */
export const TESTS: PracticeTest[] = PRACTICE_TESTS.map((t) => ({
  ...t,
  questions: t.questions
    .map((src, n) => ({ ...src, id: `${t.id}-${n + 1}` }))
    .sort((x, y) => t.scenarios.indexOf(x.scenario) - t.scenarios.indexOf(y.scenario)),
}));
export const TEST_BY_ID: Record<string, PracticeTest> = Object.fromEntries(TESTS.map((t) => [t.id, t]));

export function idsForTasks(taskIds: string[]): string[] {
  return taskIds.flatMap((t) => BY_TASK[t].map((q) => q.id));
}
export function taskSlug(taskId: string) { return taskId.replace(".", "-"); }
export function taskFromSlug(slug: string | undefined) { return slug ? slug.replace("-", ".") : ""; }
