import { describe, expect, it } from "vitest";
import { BY_TASK, ORDER, QUESTIONS, TESTS } from "../catalog";
import { mergeProgress } from "../progress";
import { band, entryCorrect, overall, taskStat, weakTasks } from "../stats";
import type { Progress } from "../types";

const empty = (): Progress => ({ a: {}, t: {} });

describe("catalog", () => {
  it("has 30 task statements, 90 drill questions and two 60-question tests", () => {
    expect(ORDER).toHaveLength(30);
    expect(QUESTIONS).toHaveLength(90);
    expect(TESTS.map((t) => t.questions.length)).toEqual([60, 60]);
  });
  it("keeps the saved-answer id format", () => {
    expect(BY_TASK["1.1"][0].id).toBe("1.1-1");
    expect(TESTS[0].questions.some((q) => q.id === "t1-1")).toBe(true);
  });
});

describe("task status", () => {
  const [first, second] = BY_TASK["1.1"];
  it("is new with no answers, weak below half right, shaky with any miss", () => {
    expect(taskStat(empty(), "1.1").status).toBe("new");
    expect(taskStat({ a: { [first.id]: { n: 1, ok: false } }, t: {} }, "1.1").status).toBe("weak");
    expect(taskStat({ a: { [first.id]: { n: 1, ok: true }, [second.id]: { n: 1, ok: false } }, t: {} }, "1.1").status).toBe("shaky");
  });
  it("is solid only when every question is answered correctly", () => {
    const a = Object.fromEntries(BY_TASK["1.1"].map((q) => [q.id, { n: 1, ok: true }]));
    expect(taskStat({ a, t: {} }, "1.1").status).toBe("solid");
  });
  it("lists weak statements before shaky ones", () => {
    const p: Progress = { a: { [BY_TASK["5.1"][0].id]: { n: 1, ok: false } }, t: {} };
    expect(weakTasks(p)[0].task.id).toBe("5.1");
    expect(overall(p).needWork).toBe(1);
  });
});

describe("bands and scoring", () => {
  it("splits at 50 and 75", () => {
    expect([band(49), band(50), band(74), band(75)]).toEqual(["low", "mid", "mid", "high"]);
  });
  it("marks a test entry correct when the picked position shows original option 0", () => {
    expect(entryCorrect(["2031", 1, 0])).toBe(true);
    expect(entryCorrect(["2031", 0, 0])).toBe(false);
    expect(entryCorrect(["2031", -1, 0])).toBe(false);
  });
});

describe("mergeProgress", () => {
  it("keeps the answer with more attempts and the higher best score", () => {
    const local: Progress = { a: { "1.1-1": { n: 1, ok: true }, "1.1-2": { n: 2, ok: false } }, t: { t1: { n: 1, best: 90, last: { right: 54, total: 60, pct: 90, when: 9, used: 0, q: {} } } } };
    const remote: Progress = { a: { "1.1-1": { n: 3, ok: false }, "2.1-1": { n: 1, ok: true } }, t: { t1: { n: 2, best: 80, last: { right: 42, total: 60, pct: 70, when: 5, used: 0, q: {} } } } };
    const m = mergeProgress(local, remote);
    expect(m.a).toEqual({ "1.1-1": { n: 3, ok: false }, "1.1-2": { n: 2, ok: false }, "2.1-1": { n: 1, ok: true } });
    expect(m.t.t1.n).toBe(2);
    expect(m.t.t1.best).toBe(90);
  });
  it("prefers this browser's test in progress", () => {
    const run = { t: "t1", i: 3, end: 1, q: {} };
    expect(mergeProgress({ ...empty(), run }, { ...empty(), run: { ...run, t: "t2" } }).run?.t).toBe("t1");
    expect(mergeProgress(empty(), empty()).run).toBeUndefined();
  });
});
