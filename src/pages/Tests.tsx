import { Link } from "react-router";
import { SCENARIOS } from "../data/scenarios";
import { TESTS, TEST_BY_ID } from "../lib/catalog";
import { useNow } from "../lib/useNow";
import { clock, plural } from "../lib/util";
import { useProgress } from "../state/progress";
import { secondsLeft, useTestActions } from "../state/tests";

export function Tests() {
  const { progress } = useProgress();
  const { startTest } = useTestActions();
  const now = useNow(!!progress.run);
  const left = secondsLeft(progress, now);

  return (
    <>
      <section className="lead">
        <h1>Practice tests</h1>
        <p>Two full-length tests in the exam's format: 60 questions in 120 minutes, drawn from four of the six scenarios and weighted by domain like the exam. You get no feedback until you submit. These questions appear nowhere else on the site.</p>
      </section>
      {progress.run && left > 0 && (
        <section className="advice mid">
          <p className="eyebrow">In progress</p>
          <h2>{TEST_BY_ID[progress.run.t].name}</h2>
          <p>The clock is still running: {clock(left)} left.</p>
          <div className="actions"><Link className="btn primary" to="/tests/take">Resume the test</Link></div>
        </section>
      )}
      <div className="doors">
        {TESTS.map((T) => {
          const rec = progress.t[T.id];
          return (
            <section className="door" style={{ cursor: "default" }} key={T.id}>
              <p className="eyebrow">60 questions · 120 minutes</p>
              <h2>{T.name}</h2>
              <p>{T.scenarios.map((k) => SCENARIOS[k].name).join(" · ")}</p>
              <p className="note">{rec ? `Last attempt ${rec.last.right} of ${rec.last.total} (${rec.last.pct}%) · best ${rec.best}% · ${plural(rec.n, "attempt")}` : "Not attempted yet"}</p>
              <div className="actions">
                <button className="btn primary" onClick={() => startTest(T.id)}>{rec ? "Take it again" : "Start the test"}</button>
                {rec && <Link className="btn" to={`/tests/${T.id}/review`}>Review last attempt</Link>}
              </div>
            </section>
          );
        })}
      </div>
      <p className="note">The exam reports a scaled score from 100 to 1,000 with 720 to pass. This site shows the percentage correct, which does not convert directly to that scale. Starting a test replaces any test in progress. If you close the page, the clock keeps running and you can resume later, from any device if you are signed in.</p>
    </>
  );
}
