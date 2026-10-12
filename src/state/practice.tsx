import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { SCENARIOS } from "../data";
import { BY_ID } from "../lib/catalog";
import { shuffle } from "../lib/util";

/** An untimed practice set (diagnostic, domain, task or retry). Lives in memory only; each answer is saved to progress as it is given. */
export interface PracticeSession {
  ids: string[];
  i: number;
  label: string;
  picked: number | null;
  results: { id: string; ok: boolean }[];
  /** Per question, the original option index shown at each position. */
  orders: number[][];
}

interface PracticeContextValue {
  session: PracticeSession | null;
  setSession: (s: PracticeSession | null) => void;
  start: (ids: string[], label: string) => void;
}

const PracticeContext = createContext<PracticeContextValue | null>(null);

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<PracticeSession | null>(null);
  const navigate = useNavigate();

  // Questions are shuffled, then grouped by scenario (in a random scenario order), as on the exam.
  const start = useCallback((ids: string[], label: string) => {
    if (!ids.length) return;
    const shuffled = shuffle(ids), scenOrder = shuffle(Object.keys(SCENARIOS));
    shuffled.sort((x, y) => scenOrder.indexOf(BY_ID[x].scenario) - scenOrder.indexOf(BY_ID[y].scenario));
    setSession({ ids: shuffled, i: 0, label, picked: null, results: [], orders: shuffled.map(() => shuffle([0, 1, 2, 3])) });
    navigate("/diagnostic/practice");
  }, [navigate]);

  const value = useMemo(() => ({ session, setSession, start }), [session, start]);
  return <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>;
}

export function usePractice() {
  const ctx = useContext(PracticeContext);
  if (!ctx) throw new Error("usePractice must be used inside PracticeProvider");
  return ctx;
}
