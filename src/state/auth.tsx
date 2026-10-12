import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { supabase } from "../lib/supabase";

export type AuthMode = "signin" | "signup" | "forgot" | "reset";
export type MsgKind = "good" | "bad";
export interface AuthDialogState { open: boolean; mode: AuthMode; msg?: string; kind?: MsgKind }

interface AuthContextValue {
  user: User | null;
  /** Current access token, read synchronously when saving on page exit. */
  tokenRef: RefObject<string | null>;
  dialog: AuthDialogState;
  openAuth: (mode: AuthMode, msg?: string, kind?: MsgKind) => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dialog, setDialog] = useState<AuthDialogState>({ open: false, mode: "signin" });
  const tokenRef = useRef<string | null>(null);

  const openAuth = useCallback((mode: AuthMode, msg?: string, kind?: MsgKind) => setDialog({ open: true, mode, msg, kind }), []);
  const closeAuth = useCallback(() => setDialog((d) => ({ ...d, open: false, msg: undefined })), []);

  useEffect(() => {
    // An expired or reused email link comes back as #error_description=...; say so instead of failing silently.
    const err = /(?:^#|&)error_description=([^&]+)/.exec(window.location.hash);
    if (err) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      openAuth("signin", decodeURIComponent(err[1].replace(/\+/g, " ")) + ". Request a new link and try again.", "bad");
    }
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      tokenRef.current = session?.access_token ?? null;
      const next = session?.user ?? null;
      setUser((prev) => (prev?.id === next?.id && prev?.email === next?.email ? prev : next));
      if (event === "PASSWORD_RECOVERY") openAuth("reset");
    });
    return () => data.subscription.unsubscribe();
  }, [openAuth]);

  const value = useMemo(() => ({ user, tokenRef, dialog, openAuth, closeAuth }), [user, dialog, openAuth, closeAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
