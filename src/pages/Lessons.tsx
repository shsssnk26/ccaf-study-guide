import { Link } from "react-router";
import { Pill } from "../components/ui";
import { DOMAINS } from "../data/domains";
import { taskSlug } from "../lib/catalog";
import { STATUS_LABEL, taskStat } from "../lib/stats";
import { useProgress } from "../state/progress";

export function Lessons() {
  const { progress } = useProgress();
  return (
    <>
      <section className="lead">
        <h1>Lesson plan</h1>
        <p>One lesson per task statement, in the guide's order. Each explains the terms, shows a short implementation, and lists the anti-patterns the exam tests.</p>
      </section>
      {DOMAINS.map((d) => (
        <section className="domain" aria-labelledby={`lh${d.id}`} key={d.id}>
          <div className="domain-head"><div>
            <p className="eyebrow">Domain {d.id} · {d.weight}% of the exam</p>
            <h2 className="h2" id={`lh${d.id}`}>{d.name}</h2>
          </div></div>
          <ul className="rows">
            {d.tasks.map((t) => {
              const ts = taskStat(progress, t.id);
              return (
                <li className="row" key={t.id}>
                  <span className="id">{t.id}</span>
                  <div><h3>{t.title}</h3><p className="idea">{t.idea}</p></div>
                  <div className="side"><Pill kind={ts.status}>{STATUS_LABEL[ts.status]}</Pill><Link className="btn small" to={`/lessons/${taskSlug(t.id)}`}>Open lesson</Link></div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
