import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/** Where confirmation and password-reset emails send people back to. */
export const authRedirectUrl = () => window.location.origin + import.meta.env.BASE_URL;
