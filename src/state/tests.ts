import { useCallback } from "react";
import { useNavigate } from "react-router";
import { TEST_BY_ID, TEST_MINUTES } from "../lib/catalog";
import { entryCorrect } from "../lib/stats";
import type { Progress } from "../lib/types";
import { shuffle } from "../lib/util";
import { useProgress } from "./progress";

export function secondsLeft(p: Progress, now = Date.now()) { return p.run ? Math.round((p.run.end - now) / 1000) : 0; }

/** Starting replaces any test in progress. Submitting scores the run, records the attempt and clears the run. */
export function useTestActions() {
  const { update } = useProgress();
  const navigate = useNavigate();

  const startTest = useCallback((testId: string) => {
    const T = TEST_BY_ID[testId];
    if (!T) return;
    update((p) => {
      p.run = { t: testId, i: 0, end: Date.now() + TEST_MINUTES * 60000, q: {} };
      for (const q of T.questions) p.run.q[q.id] = [shuffle([0, 1, 2, 3]).join(""), -1, 0];
    });
    navigate("/tests/take");
  }, [update, navigate]);

  const submitTest = useCallback((testId: string) => {
    update((p) => {
      const r = p.run;
      if (!r || r.t !== testId) return;
      const T = TEST_BY_ID[r.t], full = TEST_MINUTES * 60;
      const right = T.questions.filter((q) => entryCorrect(r.q[q.id])).length;
      const pct = Math.round((100 * right) / T.questions.length);
      const prev = p.t[r.t];
      p.t[r.t] = {
        n: (prev?.n ?? 0) + 1,
        best: Math.max(prev?.best ?? 0, pct),
        last: { right, total: T.questions.length, pct, when: Date.now(), used: Math.min(full, Math.max(0, full - secondsLeft(p))), q: r.q },
      };
      delete p.run;
    });
  }, [update]);

  return { startTest, submitTest };
}
