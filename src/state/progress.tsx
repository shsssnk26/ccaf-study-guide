import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { clearLocal, emptyProgress, loadLocal, mergeProgress, saveLocal } from "../lib/progress";
import { SUPABASE_KEY, SUPABASE_URL, supabase } from "../lib/supabase";
import type { Progress } from "../lib/types";
import { useAuth } from "./auth";

/* localStorage is the working copy, so the app works signed out or offline. When signed in, changes are pushed
   to public.progress (one JSON row per user, protected by row-level security) after a short pause. */

export type SyncState = "idle" | "saving" | "saved" | "error";
type Recipe = (draft: Progress) => void | Progress;

interface ProgressContextValue {
  progress: Progress;
  /** Apply a change: mutate the draft, or return a replacement. */
  update: (recipe: Recipe) => void;
  sync: SyncState;
  signOut: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);
const PUSH_DELAY_MS = 1500;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, tokenRef } = useAuth();
  const [progress, setProgress] = useState<Progress>(loadLocal);
  const [sync, setSync] = useState<SyncState>("idle");
  const progressRef = useRef(progress);
  const userRef = useRef(user);
  const dirty = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pushChain = useRef<Promise<void>>(Promise.resolve());
  const pulledFor = useRef<string | null>(null);
  userRef.current = user;

  const push = useCallback((keepalive = false): Promise<void> => {
    if (pushTimer.current) { clearTimeout(pushTimer.current); pushTimer.current = null; }
    const send = () => {
      const u = userRef.current, token = tokenRef.current;
      if (!u || !token) return Promise.resolve();
      return fetch(`${SUPABASE_URL}/rest/v1/progress?on_conflict=user_id`, {
        method: "POST", keepalive,
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ user_id: u.id, data: progressRef.current, updated_at: new Date().toISOString() }),
      }).then((r) => setSync(r.ok ? "saved" : "error"), () => setSync("error"));
    };
    // Normal pushes run one at a time so an older body never lands after a newer one; a push on page exit goes straight out.
    if (keepalive) return send();
    pushChain.current = pushChain.current.then(send);
    return pushChain.current;
  }, [tokenRef]);

  const update = useCallback((recipe: Recipe) => {
    dirty.current = true;
    setProgress((prev) => { const draft = structuredClone(prev); return recipe(draft) ?? draft; });
  }, []);

  // Persist every change locally; schedule a push only for changes made in this tab, not for data just pulled.
  useEffect(() => {
    progressRef.current = progress;
    saveLocal(progress);
    if (dirty.current && userRef.current) {
      dirty.current = false;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => push(), PUSH_DELAY_MS);
      setSync("saving");
    }
    dirty.current = false;
  }, [progress, push]);

  // On sign-in, merge the account's progress with this browser's, then save the result back.
  useEffect(() => {
    if (!user) { pulledFor.current = null; setSync("idle"); return; }
    if (pulledFor.current === user.id) return;
    pulledFor.current = user.id;
    setSync("saving");
    supabase.from("progress").select("data").eq("user_id", user.id).maybeSingle().then(({ data, error }) => {
      if (error) { setSync("error"); return; }
      const remote = data?.data as Progress | undefined;
      const merged = remote?.a ? mergeProgress(progressRef.current, remote) : progressRef.current;
      progressRef.current = merged;
      setProgress(merged);
      push();
    }, () => setSync("error"));
  }, [user, push]);

  // Don't lose the last few seconds of answers when the tab closes or goes to the background.
  useEffect(() => {
    const flush = () => { if (pushTimer.current) push(true); };
    const onHidden = () => { if (document.visibilityState === "hidden") flush(); };
    const onOnline = () => { if (userRef.current) push(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("online", onOnline);
    return () => { window.removeEventListener("pagehide", flush); document.removeEventListener("visibilitychange", onHidden); window.removeEventListener("online", onOnline); };
  }, [push]);

  // Signing out clears this browser's copy so the next person on a shared computer starts fresh; it is safe in the account.
  const signOut = useCallback(async () => {
    await push();
    await supabase.auth.signOut();
    clearLocal();
    const empty = emptyProgress();
    progressRef.current = empty;
    setProgress(empty);
  }, [push]);

  const value = useMemo(() => ({ progress, update, sync, signOut }), [progress, update, sync, signOut]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
