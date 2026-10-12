/* Content */
export type ScenarioKey = "cs" | "cg" | "ma" | "dp" | "ci" | "ex";
export interface Task { id: string; title: string; idea: string }
export interface Domain { id: number; name: string; weight: number; course: string; tasks: Task[] }
export interface Scenario { name: string; description: string }
export interface Lesson {
  terms: { term: string; meaning: string }[];
  caption: string;
  code: string;
  antiPatterns: { move: string; why: string }[];
}
/** A question as written. options[0] is always the correct answer; options are shuffled on screen. */
export interface QuestionSource { task: string; scenario: ScenarioKey; stem: string; options: [string, string, string, string]; explanation: string }
export interface Question extends QuestionSource { id: string }
export interface PracticeTestSource { id: string; name: string; scenarios: ScenarioKey[]; questions: QuestionSource[] }

/* Saved progress. The shape matches what earlier versions stored, so existing browser and account data keeps working. */
export interface AnswerRecord { n: number; ok: boolean }
/** [shuffled option order such as "2031", picked position or -1, flagged 0/1] */
export type RunEntry = [string, number, number];
export interface TestRun { t: string; i: number; end: number; q: Record<string, RunEntry> }
export interface TestAttempt { right: number; total: number; pct: number; when: number; used: number; q: Record<string, RunEntry> }
export interface TestRecord { n: number; best: number; last: TestAttempt }
export interface Progress { a: Record<string, AnswerRecord>; t: Record<string, TestRecord>; run?: TestRun }
