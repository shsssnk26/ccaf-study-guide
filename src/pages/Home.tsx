import { Link } from "react-router";
import { Stats } from "../components/ui";
import { overall } from "../lib/stats";
import { useProgress } from "../state/progress";

export function Home() {
  const { progress } = useProgress();
  const o = overall(progress);
  return (
    <>
      <section className="lead hero">
        <p className="eyebrow">Unofficial study companion</p>
        <h1>Prepare for the Claude Certified Architect exam from its own guide</h1>
        <p>An unofficial companion to the Foundations exam guide: a short diagnostic that shows where you are weak, a lesson for each of the guide's 30 task statements, and two full-length practice tests.</p>
      </section>
      <div className="doors">
        <Link className="door" to="/diagnostic">
          <p className="eyebrow">Diagnostic</p><h2>Find your gaps</h2>
          <p>Choose the domains you want to test. You get a score for each one, the task statements you missed, and a recommendation: courses, lessons, or timed practice tests.</p>
          <span className="go">Choose domains</span>
        </Link>
        <Link className="door" to="/lessons">
          <p className="eyebrow">Lesson plan</p><h2>Learn each task statement</h2>
          <p>For every statement: what its terms mean, a short implementation that shows the skill, and the anti-patterns the exam likes to test.</p>
          <span className="go">Open the lessons</span>
        </Link>
        <Link className="door" to="/tests">
          <p className="eyebrow">Practice tests</p><h2>Sit a full-length test</h2>
          <p>Two timed tests in the exam's format: 60 new questions each, 120 minutes, four scenarios, and no feedback until you submit.</p>
          <span className="go">See the tests</span>
        </Link>
      </div>
      {o.answered > 0 && (
        <>
          <Stats {...o} />
          <div className="actions"><Link className="btn" to="/progress">See your progress</Link></div>
        </>
      )}
    </>
  );
}
