import { useEffect, useRef, useState, type FormEvent } from "react";
import { authRedirectUrl, supabase } from "../lib/supabase";
import { useAuth, type AuthMode, type MsgKind } from "../state/auth";

const COPY: Record<AuthMode, { title: string; lede: string; submit: string }> = {
  signin: { title: "Sign in", lede: "Sign in to save your progress to your account and pick it up on any device.", submit: "Sign in" },
  signup: { title: "Create an account", lede: "Any progress already in this browser is copied to your account when you sign in.", submit: "Create account" },
  forgot: { title: "Reset your password", lede: "Enter your email and we will send you a link to set a new password.", submit: "Send reset link" },
  reset: { title: "Set a new password", lede: "Choose a new password for your account.", submit: "Save password" },
};

function friendly(message: string) {
  if (/invalid login credentials/i.test(message)) return "That email and password don't match an account.";
  if (/email not confirmed/i.test(message)) return "Confirm your email first. Check your inbox for the link we sent.";
  if (/rate limit/i.test(message)) return "Too many emails were sent recently. Wait a few minutes and try again.";
  return message || "Something went wrong. Try again.";
}

export function AuthDialog() {
  const { dialog, closeAuth } = useAuth();
  const ref = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; kind?: MsgKind } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (dialog.open) {
      setMode(dialog.mode);
      setMsg(dialog.msg ? { text: dialog.msg, kind: dialog.kind } : null);
      if (!el.open) el.showModal();
      requestAnimationFrame(() => (dialog.mode === "reset" ? passRef : emailRef).current?.focus());
    } else if (el.open) el.close();
  }, [dialog]);

  const switchMode = (m: AuthMode, text?: string, kind?: MsgKind) => { setMode(m); setMsg(text ? { text, kind } : null); };

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    if (busy) return;
    const addr = email.trim();
    if (mode !== "reset" && !/^\S+@\S+\.\S+$/.test(addr)) return setMsg({ text: "Enter a valid email address.", kind: "bad" });
    if (mode !== "forgot" && password.length < 6) return setMsg({ text: "Passwords need at least 6 characters.", kind: "bad" });
    setBusy(true); setMsg(null);
    try {
      const back = authRedirectUrl();
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: addr, password });
        if (error) return setMsg({ text: friendly(error.message), kind: "bad" });
        closeAuth();
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: addr, password, options: { emailRedirectTo: back } });
        if (error) return setMsg({ text: friendly(error.message), kind: "bad" });
        if (data.session) return closeAuth();
        setPassword("");
        switchMode("signin", "Check your email for a confirmation link. After confirming, sign in here.", "good");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(addr, { redirectTo: back });
        if (error) return setMsg({ text: friendly(error.message), kind: "bad" });
        setMsg({ text: "If that email has an account, a reset link is on its way.", kind: "good" });
      } else {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) return setMsg({ text: friendly(error.message), kind: "bad" });
        closeAuth();
      }
    } catch {
      setMsg({ text: "Couldn't reach the server. Check your connection and try again.", kind: "bad" });
    } finally {
      setBusy(false);
    }
  }

  const copy = COPY[mode];
  return (
    <dialog className="auth" ref={ref} aria-labelledby="auth-title" onClose={() => { setPassword(""); closeAuth(); }}>
      <form onSubmit={submit} noValidate>
        <h2 id="auth-title">{copy.title}</h2>
        <p className="note">{copy.lede}</p>
        {mode !== "reset" && (
          <label className="field"><span>Email</span>
            <input ref={emailRef} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        )}
        {mode !== "forgot" && (
          <label className="field"><span>{mode === "reset" ? "New password" : "Password"}</span>
            <input ref={passRef} type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        )}
        {msg && <p className={"auth-msg" + (msg.kind ? " " + msg.kind : "")} role="status">{msg.text}</p>}
        <div className="actions">
          <button className="btn primary" type="submit" disabled={busy}>{busy ? "Please wait…" : copy.submit}</button>
          <button className="btn" type="button" onClick={closeAuth}>Cancel</button>
        </div>
        {mode !== "reset" && (
          <div className="auth-links">
            {mode === "signin" ? (
              <>
                <button type="button" className="linkbtn" onClick={() => switchMode("signup")}>Create an account</button>
                <button type="button" className="linkbtn" onClick={() => switchMode("forgot")}>Forgot password?</button>
              </>
            ) : (
              <button type="button" className="linkbtn" onClick={() => switchMode("signin")}>Back to sign in</button>
            )}
          </div>
        )}
      </form>
    </dialog>
  );
}
