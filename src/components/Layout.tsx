import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { emptyProgress } from "../lib/progress";
import { useNow } from "../lib/useNow";
import { useAuth } from "../state/auth";
import { useProgress } from "../state/progress";
import { secondsLeft, useTestActions } from "../state/tests";
import { AuthDialog } from "./AuthDialog";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/diagnostic", label: "Find your gaps" },
  { to: "/lessons", label: "Lessons" },
  { to: "/tests", label: "Practice tests" },
  { to: "/progress", label: "Progress" },
  { to: "/resources", label: "Resources" },
];

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="11" fill="none" stroke="var(--brand)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="58 11.1" transform="rotate(-22 15 15)" />
      <circle cx="22.8" cy="7.2" r="2.2" fill="var(--brand)" />
    </svg>
  );
}

function Account() {
  const { user, openAuth } = useAuth();
  const { signOut } = useProgress();
  const navigate = useNavigate();
  if (!user) return <div className="acct"><button className="btn small" onClick={() => openAuth("signin")}>Sign in</button></div>;
  return (
    <div className="acct">
      <span className="acct-email" title={user.email}>{user.email}</span>
      <button className="linkbtn" onClick={async () => { await signOut(); navigate("/"); }}>Sign out</button>
    </div>
  );
}

function SyncNote() {
  const { user } = useAuth();
  const { sync } = useProgress();
  if (!user) return <p>Your progress is saved only in this browser. Sign in to keep it in your account.</p>;
  const tail = sync === "saving" ? " (saving…)" : sync === "saved" ? " (saved)." : sync === "error" ? ", but the last save failed. It will retry with your next answer." : ".";
  return <p>Signed in as {user.email}. Progress is saved to your account{tail}</p>;
}

function ResetProgress() {
  const { user } = useAuth();
  const { update } = useProgress();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  if (!confirm) return <div><button className="linkbtn" onClick={() => setConfirm(true)}>Reset my progress</button></div>;
  return (
    <div className="confirm">
      <span>Delete all saved answers and test results {user ? "from your account and this browser" : "in this browser"}?</span>
      <button className="btn small" onClick={() => { update(() => emptyProgress()); setConfirm(false); navigate("/"); }}>Yes, reset</button>
      <button className="btn small" onClick={() => setConfirm(false)}>Keep them</button>
    </div>
  );
}

/** The test clock keeps running on every page; when it runs out the test is submitted wherever the user is.
    On the test screen itself, TestTake then moves on to the results. */
function TestWatcher() {
  const { progress } = useProgress();
  const { submitTest } = useTestActions();
  const run = progress.run;
  const now = useNow(!!run);
  useEffect(() => {
    if (run && secondsLeft(progress, now) <= 0) submitTest(run.t);
  }, [run, progress, now, submitTest]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  // New page: scroll to the top and replay the entrance animation.
  useEffect(() => {
    window.scrollTo(0, 0);
    const el = main.current;
    if (el) { el.classList.remove("enter"); void el.offsetWidth; el.classList.add("enter"); }
  }, [pathname]);

  return (
    <div className="wrap">
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <Link className="brand" to="/"><Logo />Zero to Agent</Link>
        <nav className="nav" aria-label="Sections">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className="tab">{n.label}</NavLink>)}
        </nav>
        <Account />
      </header>
      <main id="main" ref={main}><Outlet /></main>
      <footer className="foot">
        <p>Unofficial study aid, not affiliated with or endorsed by Anthropic. Every question and lesson here was written for study; nothing comes from the exam. Task statement numbers follow the official Claude Certified Architect – Foundations exam guide (version 1.0). Read the guide itself for the full wording, and check code against the current documentation, since tools change.</p>
        <SyncNote />
        <ResetProgress />
      </footer>
      <AuthDialog />
      <TestWatcher />
    </div>
  );
}
