import { useState } from "react";
import { Pill } from "../components/ui";
import { DOMAINS } from "../data";
import { idsForTasks } from "../lib/catalog";
import { domainStat } from "../lib/stats";
import { plural } from "../lib/util";
import { usePractice } from "../state/practice";
import { useProgress } from "../state/progress";

export function Diagnostic() {
  const { progress } = useProgress();
  const { start } = usePractice();
  const [picked, setPicked] = useState<Record<number, boolean>>(() => Object.fromEntries(DOMAINS.map((d) => [d.id, true])));
  const [skipRight, setSkipRight] = useState(false);

  let ids = DOMAINS.filter((d) => picked[d.id]).flatMap((d) => idsForTasks(d.tasks.map((t) => t.id)));
  if (skipRight) ids = ids.filter((id) => !progress.a[id]?.ok);
  const label = "Diagnostic: " + DOMAINS.filter((d) => picked[d.id]).map((d) => "D" + d.id).join(", ");
  const setAll = (on: boolean) => setPicked(Object.fromEntries(DOMAINS.map((d) => [d.id, on])));

  return (
    <>
      <section className="lead">
        <h1>Find your gaps</h1>
        <p>Pick the domains to test. Each question sits inside one of six production scenarios, as on the exam, and questions are grouped by scenario. They cover every task statement in the domains you choose.</p>
      </section>
      <div className="picker">
        {DOMAINS.map((d) => {
          const s = domainStat(progress, d);
          return (
            <label className="pick" key={d.id}>
              <input type="checkbox" checked={!!picked[d.id]} onChange={(e) => setPicked({ ...picked, [d.id]: e.target.checked })} />
              <span>
                <b>{d.name}</b><br />
                <span className="note">Domain {d.id} · {d.weight}% of the exam · {s.total} questions{s.answered ? ` · ${s.right} of ${s.answered} correct so far` : ""}</span>
              </span>
              <Pill>{d.tasks.length} statements</Pill>
            </label>
          );
        })}
      </div>
      <label className="check">
        <input type="checkbox" checked={skipRight} onChange={(e) => setSkipRight(e.target.checked)} />
        Skip questions I already answered correctly
      </label>
      <div className="actions">
        <button className="btn primary" disabled={!ids.length} onClick={() => start(ids, label)}>Start with {plural(ids.length, "question")}</button>
        <button className="linkbtn" onClick={() => setAll(true)}>Select all</button>
        <button className="linkbtn" onClick={() => setAll(false)}>Clear</button>
      </div>
    </>
  );
}
