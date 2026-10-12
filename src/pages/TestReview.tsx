import { Link, Navigate, useParams } from "react-router";
import { AcademyLink, LETTERS, MorePracticeLink, OptionBody, Pill } from "../components/ui";
import { DOMAINS, SCENARIOS } from "../data";
import { ORDER, TASKS, TEST_BY_ID, TEST_MINUTES, taskSlug } from "../lib/catalog";
import { BAND_LABEL, band, entryCorrect } from "../lib/stats";
import { clock } from "../lib/util";
import { useProgress } from "../state/progress";

export function TestReview() {
  const { testId = "" } = useParams();
  const { progress } = useProgress();
  const T = TEST_BY_ID[testId], rec = T && progress.t[T.id];
  if (!rec) return <Navigate to="/tests" replace />;

  const L = rec.last;
  const per: Record<number, [number, number]> = Object.fromEntries(DOMAINS.map((d) => [d.id, [0, 0]]));
  const miss: Record<string, number> = {};
  for (const q of T.questions) {
    const d = TASKS[q.task].domain.id;
    per[d][1]++;
    if (entryCorrect(L.q[q.id])) per[d][0]++;
    else miss[q.task] = (miss[q.task] ?? 0) + 1;
  }
  const missOrder = Object.keys(miss).sort((a, b) => miss[b] - miss[a] || ORDER.indexOf(a) - ORDER.indexOf(b));
  const level = L.pct >= 80 ? "high" : L.pct >= 65 ? "mid" : "low";

  return (
    <>
      <section className="lead">
        <p className="eyebrow">{T.name} · result</p>
        <h1>{L.right} of {L.total} correct ({L.pct}%)</h1>
        <p>Time used: {clock(L.used)} of {clock(TEST_MINUTES * 60)}.</p>
      </section>
      <section className={"advice " + level}>
        <p className="eyebrow">What this suggests</p>
        {L.pct >= 80 ? (
          <><h2>You are in good shape</h2><p>At {L.pct}% you have a comfortable margin on questions of this kind. Review the ones you missed below, read the lesson for each, and take the other test to confirm the result.</p></>
        ) : L.pct >= 65 ? (
          <><h2>Close, with specific gaps</h2><p>At {L.pct}% a few task statements are costing you most of the marks. Read their lessons, paying attention to the anti-patterns, then take the other test.</p></>
        ) : L.pct >= 50 ? (
          <><h2>Work through the lessons first</h2><p>At {L.pct}% the gaps are spread across several domains. Go through the lessons for the weakest domains below before another timed test.</p></>
        ) : (
          <><h2>Go back to the fundamentals</h2><p>At {L.pct}% it is too early for timed tests. Take the Anthropic Academy courses, then the lessons here, and come back to the tests afterwards.</p><div className="actions"><AcademyLink /></div></>
        )}
        {L.pct >= 75 && L.pct < 95 && (
          <>
            <p>You are close. For more exam-style questions once you have taken both tests here, try an independent question bank.</p>
            <div className="actions"><MorePracticeLink /><Link className="btn" to="/resources">All resources</Link></div>
          </>
        )}
        <p className="note">The real exam uses a scaled score (720 of 1,000 to pass). A percentage here is a guide, not a prediction.</p>
      </section>
      <section>
        <h2 className="h2">By domain</h2>
        <ul className="rows">
          {DOMAINS.map((d) => {
            const [ok, tot] = per[d.id], pc = tot ? Math.round((100 * ok) / tot) : 0, b = band(pc);
            return (
              <li className="row" key={d.id}>
                <span className="id">D{d.id}</span>
                <div><h3>{d.name}</h3><p className="note">{ok} of {tot} correct · {pc}% · {d.weight}% of the exam</p></div>
                <div className="side"><Pill kind={b}>{BAND_LABEL[b]}</Pill></div>
              </li>
            );
          })}
        </ul>
      </section>
      {missOrder.length > 0 && (
        <section>
          <h2 className="h2">Task statements to study</h2>
          <ul className="rows">
            {missOrder.map((tid) => (
              <li className="row" key={tid}>
                <span className="id">{tid}</span>
                <div><h3>{TASKS[tid].title}</h3><p className="note">{miss[tid]} missed</p></div>
                <div className="side"><Link className="btn small" to={`/lessons/${taskSlug(tid)}`}>Open lesson</Link></div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h2 className="h2">Review every question</h2>
        <p className="note">Missed questions are marked. Open one to see the options and the explanation.</p>
        <div className="revs">
          {T.questions.map((q, k) => {
            const e = L.q[q.id], picked = e && e[1] >= 0 ? Number(e[0].charAt(e[1])) : -1, ok = picked === 0, t = TASKS[q.task];
            return (
              <details className={"rev" + (ok ? "" : " miss")} key={q.id}>
                <summary><Pill kind={ok ? "high" : "low"}>{ok ? "Correct" : picked < 0 ? "Not answered" : "Missed"}</Pill> Question {k + 1} · Task {q.task} · {SCENARIOS[q.scenario].name}</summary>
                <p className="stem">{q.stem}</p>
                <div className="opts">
                  {[0, 1, 2, 3].map((pos) => {
                    const oi = Number(e[0].charAt(pos));
                    return (
                      <div key={pos} className={"opt" + (oi === 0 ? " right" : oi === picked ? " wrong" : "")}>
                        <OptionBody letter={LETTERS[pos]} text={q.options[oi]} mark={oi === 0 ? "Correct answer" : oi === picked ? "Your answer" : undefined} />
                      </div>
                    );
                  })}
                </div>
                <p>{q.explanation}</p>
                <p className="muted"><b>Task {q.task} · {t.title}:</b> {t.idea}</p>
              </details>
            );
          })}
        </div>
      </section>
      <div className="actions">
        <Link className="btn primary" to="/tests">Back to practice tests</Link>
        <Link className="btn" to="/lessons">Open the lessons</Link>
      </div>
    </>
  );
}
