import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { Pill } from "../components/ui";
import { LESSONS } from "../data/lessons";
import { ORDER, TASKS, idsForTasks, taskFromSlug, taskSlug } from "../lib/catalog";
import { STATUS_LABEL, taskStat } from "../lib/stats";
import { usePractice } from "../state/practice";
import { useProgress } from "../state/progress";
import { NotFound } from "./NotFound";

export function Lesson() {
  const id = taskFromSlug(useParams().taskId);
  const { progress } = useProgress();
  const { start } = usePractice();
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus({ preventScroll: true }); }, [id]);

  const t = TASKS[id], L = LESSONS[id];
  if (!t || !L) return <NotFound />;
  const ts = taskStat(progress, id), i = ORDER.indexOf(id), prev = ORDER[i - 1], next = ORDER[i + 1];

  return (
    <article className="lesson">
      <div className="actions"><Link className="linkbtn" to="/lessons">All lessons</Link></div>
      <section className="lead">
        <p className="eyebrow">Domain {t.domain.id} · {t.domain.name}</p>
        <h1 ref={titleRef} tabIndex={-1}>{t.id} {t.title}</h1>
        <p>{t.idea}</p>
      </section>
      <section>
        <h2 className="h2">What the terms mean</h2>
        <dl className="terms">{L.terms.map((x) => <div key={x.term}><dt>{x.term}</dt><dd>{x.meaning}</dd></div>)}</dl>
      </section>
      <section>
        <h2 className="h2">In practice</h2>
        <p className="muted">{L.caption}</p>
        <div className="codewrap" tabIndex={0} role="region" aria-label="Example"><pre>{L.code}</pre></div>
      </section>
      <section>
        <h2 className="h2">Anti-patterns the exam tests</h2>
        <ul className="anti">{L.antiPatterns.map((x) => <li key={x.move}><b>{x.move}</b><span>{x.why}</span></li>)}</ul>
      </section>
      <div className="actions">
        <button className="btn primary" onClick={() => start(idsForTasks([id]), `Task ${t.id}: ${t.title}`)}>Practice this statement ({ts.total} questions)</button>
        <Pill kind={ts.status}>{STATUS_LABEL[ts.status]}</Pill>
      </div>
      <div className="actions">
        {prev && <Link className="btn small" to={`/lessons/${taskSlug(prev)}`}>Previous: {prev}</Link>}
        {next && <Link className="btn small" to={`/lessons/${taskSlug(next)}`}>Next: {next} {TASKS[next].title}</Link>}
      </div>
    </article>
  );
}
