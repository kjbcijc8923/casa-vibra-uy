import { useEffect, useMemo, useState } from "react";

type State = {
  rate: number; // 1 USD -> UYU
  source: "live" | "cache" | "fallback";
  updatedAt: number;
};

const LS_KEY = "uy_usd_uyu_rate_v1";
const TTL_MS = 12 * 60 * 60 * 1000; // 12h

function readCache(): State | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as State;
    if (!parsed?.rate || !parsed.updatedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(state: State) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useUsdUyuRate() {
  const fallback: State = useMemo(
    () => ({ rate: 40, source: "fallback", updatedAt: Date.now() }),
    [],
  );

  const [state, setState] = useState<State>(() => readCache() ?? fallback);

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.updatedAt < TTL_MS) {
      setState({ ...cached, source: "cache" });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        // Free endpoint (no key). Returns: { rates: { UYU: number } }
        // NOTE: frankfurter.app doesn't support UYU (404). Use open.er-api.com instead.
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error("rate_fetch_failed");
        const data = (await res.json()) as { rates?: Record<string, number> };
        const rate = data?.rates?.UYU;
        if (!rate || !Number.isFinite(rate)) throw new Error("rate_invalid");
        const next: State = { rate, source: "live", updatedAt: Date.now() };
        writeCache(next);
        if (!cancelled) setState(next);
      } catch {
        // keep current state
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [fallback]);

  return state;
}
