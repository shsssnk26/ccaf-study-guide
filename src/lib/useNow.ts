import { useEffect, useState } from "react";

/** Re-renders every `ms` while `active`, returning the current time. */
export function useNow(active: boolean, ms = 1000) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [active, ms]);
  return now;
}
