import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCircleCheck,
  faTriangleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

type State = "operational" | "degraded" | "down" | "checking";

type Check = {
  name: string;
  desc: string;
  url: string;
  /* "cors" → read res.ok; "opaque" → reachability only (no-cors) */
  mode: "cors" | "opaque";
};

type Result = { state: State; latency: number | null };

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const checks: Check[] = [
  {
    name: "Website & docs",
    desc: "Marketing site, documentation, and account pages.",
    url: `${window.location.origin}/`,
    mode: "cors",
  },
  {
    name: "Download mirrors",
    desc: "Browser extension packages (.xpi / .crx).",
    url: `${window.location.origin}/libreguard.xpi`,
    mode: "cors",
  },
  {
    name: "Filter list CDN",
    desc: "Blocklists served to the extension.",
    url: `${window.location.origin}/sitemap.xml`,
    mode: "cors",
  },
  {
    name: "Auth & sync API",
    desc: "Account sign-in and settings sync.",
    url: `${supabaseUrl}/auth/v1/health`,
    mode: "cors",
  },
];

/* Latency above this (ms) counts as degraded rather than fully operational. */
const SLOW_MS = 1500;
const TIMEOUT_MS = 6000;

async function runCheck(c: Check): Promise<Result> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const start = performance.now();
  try {
    const isSupabase = c.url.startsWith(supabaseUrl ?? "\0");
    await fetch(c.url, {
      method: c.mode === "cors" ? "GET" : "HEAD",
      mode: c.mode === "cors" ? "cors" : "no-cors",
      cache: "no-store",
      signal: ctrl.signal,
      headers: isSupabase && supabaseKey ? { apikey: supabaseKey } : undefined,
    });
    const latency = Math.round(performance.now() - start);
    /* opaque responses aren't readable; reaching here means it resolved */
    return { state: latency > SLOW_MS ? "degraded" : "operational", latency };
  } catch {
    return { state: "down", latency: null };
  } finally {
    clearTimeout(timer);
  }
}

const meta: Record<Exclude<State, "checking">, { label: string; cls: string; icon: typeof faCircleCheck }> = {
  operational: { label: "Operational", cls: "text-mint", icon: faCircleCheck },
  degraded: { label: "Degraded", cls: "text-amber-400", icon: faTriangleExclamation },
  down: { label: "Down", cls: "text-red-500", icon: faCircleXmark },
};

function StatusDot({ state }: { state: State }) {
  const color =
    state === "operational"
      ? "bg-mint"
      : state === "degraded"
      ? "bg-amber-400"
      : state === "down"
      ? "bg-red-500"
      : "bg-mute";
  return (
    <span className="relative flex h-2.5 w-2.5">
      {state !== "checking" && state !== "down" && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-60`} />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

export default function Status() {
  const [results, setResults] = useState<Result[]>(
    checks.map(() => ({ state: "checking", latency: null })),
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const next = await Promise.all(checks.map(runCheck));
    setResults(next);
    setLastChecked(new Date());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    refresh();
    timerRef.current = setInterval(refresh, 60_000);
    return () => clearInterval(timerRef.current);
  }, [refresh]);

  const resolved = results.filter((r) => r.state !== "checking");
  const anyDown = resolved.some((r) => r.state === "down");
  const anyDegraded = resolved.some((r) => r.state === "degraded");
  const overall: State =
    resolved.length === 0
      ? "checking"
      : anyDown
      ? "down"
      : anyDegraded
      ? "degraded"
      : "operational";

  const banner =
    overall === "checking"
      ? { text: "Checking systems…", cls: "text-soft", border: "border-line" }
      : overall === "operational"
      ? { text: "All systems operational", cls: "text-mint", border: "border-mint/30" }
      : overall === "degraded"
      ? { text: "Some systems degraded", cls: "text-amber-400", border: "border-amber-400/30" }
      : { text: "Service disruption", cls: "text-red-500", border: "border-red-500/30" };

  return (
    <>
      <SEO
        title="System status"
        description="Real-time service health for LibreGuard. Check the status of filter list CDN, update service, website, and download mirrors."
        path="/status"
      />
      <PageHero
        kicker="Status"
        title={
          <>
            System <em>status</em>.
          </>
        }
        lede="Live health of the services behind LibreGuard, checked from your browser. The app keeps blocking even when these are down."
      />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
        <div className={`card mb-8 flex items-center gap-3 p-6 ${banner.border}`}>
          <StatusDot state={overall} />
          <span className={`font-medium ${banner.cls}`}>{banner.text}</span>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="ml-auto inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faArrowsRotate} className={`text-xs ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="card overflow-hidden">
          {checks.map((c, i) => {
            const r = results[i];
            const m = r.state === "checking" ? null : meta[r.state];
            return (
              <div
                key={c.name}
                className={`flex items-center justify-between gap-4 p-5 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-ink">{c.name}</p>
                  <p className="mt-0.5 text-xs text-mute">{c.desc}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  {r.latency != null && (
                    <span className="hidden text-xs tabular-nums text-mute sm:inline">{r.latency} ms</span>
                  )}
                  {m ? (
                    <span className={`inline-flex items-center gap-2 text-sm font-medium ${m.cls}`}>
                      <FontAwesomeIcon icon={m.icon} className="text-xs" />
                      {m.label}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-mute">
                      <StatusDot state="checking" />
                      Checking…
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-mute">
          {lastChecked
            ? `Last checked ${lastChecked.toLocaleTimeString()} · auto-refreshes every 60s`
            : "Running checks…"}
        </p>
      </section>
    </>
  );
}
