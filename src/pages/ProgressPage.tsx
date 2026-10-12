import { Link } from "react-router";
import { Advice, Pill, Stats } from "../components/ui";
import { DOMAINS } from "../data";
import { TESTS, idsForTasks, taskSlug } from "../lib/catalog";
import { STATUS_LABEL, closeTasks, domainStat, overall, weakTasks } from "../lib/stats";
import { plural } from "../lib/util";
import { usePractice } from "../state/practice";
import { useProgress } from "../state/progress";

function TestsSummary() {
  const { progress } = useProgress();
  if (!TESTS.some((T) => progress.t[T.id])) return null;
  return (
    <section>
      <h2 className="h2">Practice tests</h2>
      <ul className="rows">
        {TESTS.map((T, k) => {
          const rec = progress.t[T.id];
          return (
            <li className="row" key={T.id}>
              <span className="id">T{k + 1}</span>
              <div><h3>{T.name}</h3><p className="note">{rec ? `Last ${rec.last.right} of ${rec.last.total} (${rec.last.pct}%) · best ${rec.best}% · ${plural(rec.n, "attempt")}` : "Not attempted yet"}</p></div>
              <div className="side"><Link className="btn small" to={rec ? `/tests/${T.id}/review` : "/tests"}>Open</Link></div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ProgressPage() {
  const { progress } = useProgress();
  const { start } = usePractice();
  const o = overall(progress), list = weakTasks(progress), close = closeTasks(progress);
  const lead = <section className="lead"><h1>Your progress</h1><p>Built from your latest answer to each question, including your latest practice test attempts.</p></section>;

  if (!o.answered) {
    return (
      <>
        {lead}
        <p className="empty">Nothing to show yet. Take the diagnostic and your scores, weak statements and a recommendation will appear here.</p>
        <div className="actions"><Link className="btn primary" to="/diagnostic">Find your gaps</Link></div>
        <TestsSummary />
      </>
    );
  }
  return (
    <>
      {lead}
      <Stats {...o} />
      <Advice pct={o.weighted ?? 0} n={o.answered} />
      <section>
        <h2 className="h2">By domain</h2>
        <ul className="rows">
          {DOMAINS.map((d) => {
            const s = domainStat(progress, d), wrong = s.answered - s.right, todo = s.total - s.answered;
            return (
              <li className="row" key={d.id}>
                <span className="id">D{d.id}</span>
                <div>
                  <h3>{d.name}</h3>
                  <div className="bar" style={{ marginTop: 8 }} role="img" aria-label={`${s.right} correct, ${wrong} incorrect, ${todo} not yet answered`}>
                    <i className="ok" style={{ width: `${(100 * s.right) / s.total}%` }} />
                    <i className="no" style={{ width: `${(100 * wrong) / s.total}%` }} />
                  </div>
                  <p className="note" style={{ marginTop: 6 }}>{s.right} correct · {wrong} incorrect · {todo} to go</p>
                </div>
                <div className="side"><button className="btn small" onClick={() => start(idsForTasks(d.tasks.map((t) => t.id)), `Domain ${d.id}: ${d.name}`)}>Practice</button></div>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2 className="h2">Weak task statements</h2>
        {!list.length ? <p className="empty">None among the questions you have answered.</p> : (
          <>
            <div className="actions" style={{ marginBottom: 8 }}>
              <button className="btn primary" onClick={() => start(idsForTasks(list.map((w) => w.task.id)), "Weak task statements")}>Drill all {list.length}</button>
            </div>
            <ul className="rows">
              {list.map((w) => (
                <li className="row" key={w.task.id}>
                  <span className="id">{w.task.id}</span>
                  <div><h3>{w.task.title}</h3><p className="note">{w.task.domain.name} · {w.stat.correct} of {w.stat.seen} correct on your latest tries</p></div>
                  <div className="side">
                    <Pill kind={w.stat.status}>{STATUS_LABEL[w.stat.status]}</Pill>
                    <Link className="btn small" to={`/lessons/${taskSlug(w.task.id)}`}>Lesson</Link>
                    <button className="btn small" onClick={() => start(idsForTasks([w.task.id]), `Task ${w.task.id}: ${w.task.title}`)}>Drill</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
      {close.length > 0 && (
        <section>
          <h2 className="h2">Nearly there</h2>
          <p className="muted">These statements are 75 to 94% right. Skip the lessons: keep drilling the questions and take a practice test to lock them in.</p>
          <div className="actions" style={{ margin: "8px 0" }}>
            <button className="btn primary" onClick={() => start(idsForTasks(close.map((w) => w.task.id)), "Nearly there")}>Drill all {close.length}</button>
            <Link className="btn" to="/tests">Take a practice test</Link>
          </div>
          <ul className="rows">
            {close.map((w) => (
              <li className="row" key={w.task.id}>
                <span className="id">{w.task.id}</span>
                <div><h3>{w.task.title}</h3><p className="note">{w.task.domain.name} · {w.stat.correct} of {w.stat.seen} correct on your latest tries</p></div>
                <div className="side">
                  <Pill kind={w.stat.status}>{STATUS_LABEL[w.stat.status]}</Pill>
                  <button className="btn small" onClick={() => start(idsForTasks([w.task.id]), `Task ${w.task.id}: ${w.task.title}`)}>Drill</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <TestsSummary />
    </>
  );
}
