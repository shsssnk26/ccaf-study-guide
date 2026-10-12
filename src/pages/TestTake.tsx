import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { LETTERS, OptionBody, ScenarioAside } from "../components/ui";
import { TEST_BY_ID } from "../lib/catalog";
import { useNow } from "../lib/useNow";
import { clock, plural } from "../lib/util";
import { useProgress } from "../state/progress";
import { secondsLeft, useTestActions } from "../state/tests";

export function TestTake() {
  const { progress, update } = useProgress();
  const { submitTest } = useTestActions();
  const [confirm, setConfirm] = useState(false);
  const stemRef = useRef<HTMLHeadingElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const r = progress.run;
  const now = useNow(!!r);
  // Remember which test this screen is showing: when its run ends (submitted here or by the clock), show that test's results.
  const shownTest = useRef(r?.t);
  if (r) shownTest.current = r.t;

  useEffect(() => { window.scrollTo(0, 0); stemRef.current?.focus({ preventScroll: true }); }, [r?.i]);
  useEffect(() => { if (confirm) confirmRef.current?.focus({ preventScroll: true }); }, [confirm]);

  if (!r) return <Navigate to={shownTest.current ? `/tests/${shownTest.current}/review` : "/tests"} replace />;
  const T = TEST_BY_ID[r.t], n = T.questions.length, q = T.questions[r.i], e = r.q[q.id];
  const answered = T.questions.filter((x) => r.q[x.id][1] >= 0).length, left = secondsLeft(progress, now);

  const go = (i: number) => update((p) => { if (p.run) p.run.i = Math.max(0, Math.min(n - 1, i)); });
  const pick = (pos: number) => update((p) => { const x = p.run?.q[q.id]; if (x) x[1] = x[1] === pos ? -1 : pos; });
  const flag = () => update((p) => { const x = p.run?.q[q.id]; if (x) x[2] = x[2] ? 0 : 1; });
  const submit = () => submitTest(r.t);

  return (
    <section className="quiz">
      <div className="quiz-top">
        <span>{T.name} · Question {r.i + 1} of {n}</span>
        <span className={"timer" + (left < 600 ? " low" : "")} aria-label="Time left">{clock(left)}</span>
      </div>
      <div className="bar" aria-hidden="true"><i style={{ width: `${(100 * answered) / n}%`, background: "var(--accent)" }} /></div>
      <div className="exam">
        <ScenarioAside scenario={q.scenario} />
        <div className="card">
          <p className="eyebrow">Question {r.i + 1} · select one</p>
          <h2 className="stem" ref={stemRef} tabIndex={-1}>{q.stem}</h2>
          <div className="opts">
            {[0, 1, 2, 3].map((pos) => (
              <button key={pos} className={"opt" + (e[1] === pos ? " sel" : "")} aria-pressed={e[1] === pos} onClick={() => pick(pos)}>
                <OptionBody letter={LETTERS[pos]} text={q.options[Number(e[0].charAt(pos))]} />
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="btn" disabled={r.i === 0} onClick={() => go(r.i - 1)}>Previous</button>
            <button className="btn primary" disabled={r.i === n - 1} onClick={() => go(r.i + 1)}>Next</button>
            <button className="btn" aria-pressed={!!e[2]} onClick={flag}>{e[2] ? "Remove flag" : "Flag for review"}</button>
          </div>
        </div>
      </div>
      <section>
        <h2 className="h2">All questions</h2>
        <p className="note">{answered} of {n} answered. A dot marks a flagged question.</p>
        <div className="qnav">
          {T.questions.map((x, k) => {
            const ex = r.q[x.id];
            return (
              <button key={x.id} className={"qn" + (ex[1] >= 0 ? " ans" : "") + (k === r.i ? " cur" : "")} onClick={() => go(k)}
                aria-label={`Question ${k + 1}, ${ex[1] >= 0 ? "answered" : "not answered"}${ex[2] ? ", flagged" : ""}`}>
                {k + 1}{ex[2] ? " •" : ""}
              </button>
            );
          })}
        </div>
      </section>
      {confirm ? (
        <div className="confirm">
          <span>{answered < n ? `${plural(n - answered, "question")} ${n - answered === 1 ? "is" : "are"} unanswered and will count as wrong. ` : ""}Submit the test now?</span>
          <button className="btn small primary" ref={confirmRef} onClick={submit}>Yes, submit</button>
          <button className="btn small" onClick={() => setConfirm(false)}>Keep working</button>
        </div>
      ) : (
        <div className="actions"><button className="btn" onClick={() => setConfirm(true)}>Submit the test</button></div>
      )}
    </section>
  );
}
