import type { ReactNode } from "react";
import { Link } from "react-router";
import { SCENARIOS } from "../data";
import { ACADEMY_URL } from "../lib/catalog";
import { CERTSAFARI } from "../data";
import { band } from "../lib/stats";
import type { ScenarioKey } from "../lib/types";
import { plural } from "../lib/util";

export const LETTERS = "ABCD";

export function Pill({ kind, children }: { kind?: string; children: ReactNode }) {
  return <span className={"pill" + (kind ? " " + kind : "")}>{children}</span>;
}

export function Lead({ eyebrow, title, children, titleId }: { eyebrow?: ReactNode; title: ReactNode; children?: ReactNode; titleId?: string }) {
  return (
    <section className="lead">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 id={titleId} tabIndex={titleId ? -1 : undefined}>{title}</h1>
      {children}
    </section>
  );
}

export function Stats({ answered, total, weighted, needWork }: { answered: number; total: number; weighted: number | null; needWork: number }) {
  return (
    <section className="stats" aria-label="Your progress">
      <div className="stat"><b>{answered} of {total}</b><span>questions answered</span></div>
      <div className="stat"><b>{weighted}%</b><span>accuracy so far, weighted by exam domain</span></div>
      <div className="stat"><b>{needWork}</b><span>task statements needing work</span></div>
    </section>
  );
}

export function ScenarioAside({ scenario }: { scenario: ScenarioKey }) {
  const s = SCENARIOS[scenario];
  return (
    <aside className="scen">
      <p className="eyebrow">Scenario</p>
      <h3>{s.name}</h3>
      <p>{s.description}</p>
    </aside>
  );
}

export function AcademyLink() {
  return <a className="btn primary" href={ACADEMY_URL} target="_blank" rel="noopener">Open Anthropic Academy on Skilljar</a>;
}

/** For scores of 75 to 94%: an outside bank of extra practice questions, clearly marked as unofficial. */
export function MorePracticeLink() {
  return <a className="btn" href={CERTSAFARI.url} target="_blank" rel="noopener">More practice questions <span className="unofficial">CertSafari · free · unofficial</span></a>;
}

/** What to do next after a practice set or on the progress page. */
export function Advice({ pct, n, courses }: { pct: number; n: number; courses?: string }) {
  const b = band(pct);
  return (
    <section className={"advice " + b}>
      <p className="eyebrow">What to do next</p>
      {b === "low" && (
        <>
          <h2>Start with the fundamentals</h2>
          <p>A score of {pct}% points to gaps in the core concepts, which is normal early on. Take the Anthropic Academy courses first{courses ? `, especially ${courses}` : ""}, then come back to the lessons for the statements you missed.</p>
          <div className="actions"><AcademyLink /><Link className="btn" to="/lessons">Browse the lessons</Link></div>
        </>
      )}
      {b === "mid" && (
        <>
          <h2>Study the statements you missed</h2>
          <p>At {pct}% you have the foundations. Read the lesson for each statement listed below, paying attention to the anti-patterns, then test the same domains again.</p>
          <div className="actions"><Link className="btn primary" to="/lessons">Open the lessons</Link></div>
        </>
      )}
      {b === "high" && (
        <>
          <h2>Move on to timed practice exams</h2>
          <p>At {pct}% you are answering most of these correctly. The next step is full practice tests under exam conditions: 60 questions in 120 minutes. Take the two practice tests on this site, and the official practice test if your certification page offers one, and take every miss back to its task statement.</p>
          <div className="actions"><Link className="btn primary" to="/tests">Open the practice tests</Link>{pct < 95 && <MorePracticeLink />}</div>
          {pct < 95 && <p className="note">Finished the questions here? CertSafari is an independent site with 480 more. See all <Link to="/resources">resources</Link>.</p>}
        </>
      )}
      {n < 10 && <p className="note">Based on only {plural(n, "question")}, so treat this as a rough signal.</p>}
    </section>
  );
}

/** Answer text with the "Correct answer" / "Your answer" marker used in feedback and reviews. */
export function OptionBody({ letter, text, mark }: { letter: string; text: string; mark?: string }) {
  return (
    <>
      <span className="letter">{letter}</span>
      <span>{text}{mark && <span className="mark">{mark}</span>}</span>
    </>
  );
}
