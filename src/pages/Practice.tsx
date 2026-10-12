import { useEffect, useRef } from "react";
import { Link, Navigate } from "react-router";
import { Advice, LETTERS, OptionBody, Pill, ScenarioAside } from "../components/ui";
import { DOMAINS } from "../data";
import { BY_ID, TASKS, taskSlug } from "../lib/catalog";
import { BAND_LABEL, band } from "../lib/stats";
import type { Domain } from "../lib/types";
import { usePractice, type PracticeSession } from "../state/practice";
import { useProgress } from "../state/progress";

export function Practice() {
  const { session } = usePractice();
  if (!session) return <Navigate to="/diagnostic" replace />;
  return session.i >= session.ids.length ? <Results session={session} /> : <QuestionCard session={session} />;
}

function QuestionCard({ session }: { session: PracticeSession }) {
  const { setSession } = usePractice();
  const { update } = useProgress();
  const stemRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const q = BY_ID[session.ids[session.i]], t = TASKS[q.task], order = session.orders[session.i];
  const done = session.picked !== null, last = session.i + 1 >= session.ids.length;

  useEffect(() => { window.scrollTo(0, 0); stemRef.current?.focus({ preventScroll: true }); }, [session.i]);
  useEffect(() => { if (done) nextRef.current?.focus(); }, [done]);

  function pick(pos: number) {
    if (done) return;
    const ok = order[pos] === 0;
    update((p) => { p.a[q.id] = { n: (p.a[q.id]?.n ?? 0) + 1, ok }; });
    setSession({ ...session, picked: pos, results: [...session.results, { id: q.id, ok }] });
  }
  const next = () => setSession({ ...session, i: session.i + 1, picked: null });
  const finish = () => setSession({ ...session, i: session.ids.length, picked: null });
  const ok = done && order[session.picked!] === 0;

  return (
    <section className="quiz">
      <div className="quiz-top"><span>{session.label}</span><span>Question {session.i + 1} of {session.ids.length}</span></div>
      <div className="bar" aria-hidden="true"><i style={{ width: `${(100 * (session.i + (done ? 1 : 0))) / session.ids.length}%`, background: "var(--accent)" }} /></div>
      <div className="exam">
        <ScenarioAside scenario={q.scenario} />
        <div className="card">
          <p className="eyebrow">Question · select one</p>
          <h2 className="stem" ref={stemRef} tabIndex={-1}>{q.stem}</h2>
          <div className="opts">
            {order.map((oi, pos) => {
              const right = done && oi === 0, wrong = done && oi !== 0 && pos === session.picked;
              return (
                <button key={pos} className={"opt" + (right ? " right" : wrong ? " wrong" : "")} disabled={done} onClick={() => pick(pos)}>
                  <OptionBody letter={LETTERS[pos]} text={q.options[oi]} mark={right ? "Correct answer" : wrong ? "Your answer" : undefined} />
                </button>
              );
            })}
          </div>
          {done && (
            <div className="feedback" role="status">
              <p className={"verdict " + (ok ? "ok" : "no")}>{ok ? "Correct." : "Not quite."}</p>
              <p>{q.explanation}</p>
              <p className="muted"><b>Task {t.id} · {t.title}:</b> {t.idea}</p>
              <div className="actions">
                <button className="btn primary" ref={nextRef} onClick={next}>{last ? "See results" : "Next question"}</button>
                <button className="btn" onClick={finish}>Stop and see results</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Results({ session }: { session: PracticeSession }) {
  const { start } = usePractice();
  const res = session.results;
  if (!res.length) {
    return (
      <>
        <p className="empty">No questions answered in this set.</p>
        <div className="actions"><Link className="btn primary" to="/diagnostic">Choose domains</Link></div>
      </>
    );
  }
  const right = res.filter((r) => r.ok).length, missed = res.filter((r) => !r.ok);
  const pct = Math.round((100 * right) / res.length);
  const per = new Map<number, { d: Domain; n: number; ok: number }>();
  for (const r of res) {
    const d = TASKS[BY_ID[r.id].task].domain;
    const p = per.get(d.id) ?? { d, n: 0, ok: 0 };
    p.n++; if (r.ok) p.ok++;
    per.set(d.id, p);
  }
  const weakCourses = [...new Set(DOMAINS.filter((d) => { const p = per.get(d.id); return p && band(Math.round((100 * p.ok) / p.n)) === "low"; }).map((d) => d.course))];
  const missedTasks = [...new Set(missed.map((r) => BY_ID[r.id].task))].map((id) => TASKS[id]);

  return (
    <>
      <section className="lead"><p className="eyebrow">{session.label}</p><h1>{right} of {res.length} correct ({pct}%)</h1></section>
      <Advice pct={pct} n={res.length} courses={weakCourses.join(" and ")} />
      <section>
        <h2 className="h2">By domain</h2>
        <ul className="rows">
          {DOMAINS.filter((d) => per.has(d.id)).map((d) => {
            const p = per.get(d.id)!, dp = Math.round((100 * p.ok) / p.n), b = band(dp);
            return (
              <li className="row" key={d.id}>
                <span className="id">D{d.id}</span>
                <div>
                  <h3>{d.name}</h3>
                  <p className="note">{p.ok} of {p.n} correct · {dp}% · {d.weight}% of the exam</p>
                  <p className="idea">{b === "low" ? `Start with ${d.course} on Anthropic Academy.` : b === "mid" ? "Work through this domain's lessons, then test it again." : "Keep this fresh with timed practice tests."}</p>
                </div>
                <div className="side"><Pill kind={b}>{BAND_LABEL[b]}</Pill></div>
              </li>
            );
          })}
        </ul>
      </section>
      {missedTasks.length > 0 && (
        <section>
          <h2 className="h2">Task statements to study</h2>
          <ul className="rows">
            {missedTasks.map((t) => (
              <li className="row" key={t.id}>
                <span className="id">{t.id}</span>
                <div><h3>{t.title}</h3><p className="idea">{t.idea}</p></div>
                <div className="side"><Link className="btn small" to={`/lessons/${taskSlug(t.id)}`}>Open lesson</Link></div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="actions">
        {missed.length > 0 && <button className="btn primary" onClick={() => start(missed.map((r) => r.id), "Retry of missed questions")}>Retry the {missed.length} I missed</button>}
        <Link className={"btn" + (missed.length ? "" : " primary")} to="/diagnostic">Test other domains</Link>
        <Link className="btn" to="/progress">See overall progress</Link>
      </div>
    </>
  );
}
