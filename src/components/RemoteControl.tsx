import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignal, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

type Row = {
  user_id: string;
  enabled: boolean;
  block_trackers: boolean;
  block_malware: boolean;
  show_badge: boolean;
  auto_update: boolean;
  whitelisted_domains: string[];
  custom_selectors: string;
  total_blocked: number;
  today_blocked: number;
  updated_by: string;
  updated_at: string;
  last_seen: string | null;
};

const ONLINE_WINDOW_MS = 1000 * 90; // last_seen within 90s ⇒ online

const toggles: { key: keyof Row; label: string; desc: string }[] = [
  { key: "enabled", label: "Protection", desc: "Master switch for all blocking" },
  { key: "block_trackers", label: "Block trackers", desc: "Stop analytics & tracking domains" },
  { key: "block_malware", label: "Block malware", desc: "Stop malware & phishing domains" },
  { key: "show_badge", label: "Toolbar badge", desc: "Show blocked count on the icon" },
  { key: "auto_update", label: "Auto-update lists", desc: "Refresh filter lists automatically" },
];

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className="relative inline-flex h-5 w-10 shrink-0 items-center disabled:opacity-40"
      aria-pressed={on}
    >
      <span className={`block h-5 w-10 rounded-full transition-colors ${on ? "bg-mint" : "bg-mute/30"}`} />
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export default function RemoteControl() {
  const { user } = useAuth();
  const [row, setRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState("");
  const [now, setNow] = useState(Date.now());

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("extension_settings")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    setRow((data as Row) ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  // Tick so the online indicator stays accurate.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(t);
  }, []);

  // Live updates pushed by the extension.
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`ext-settings-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "extension_settings", filter: `user_id=eq.${user.id}` },
        (payload) => setRow(payload.new as Row),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Write a change as the dashboard; optimistic local update.
  const patch = useCallback(
    async (changes: Partial<Row>) => {
      if (!user) return;
      const next = { ...(row ?? ({} as Row)), ...changes };
      setRow(next);
      await supabase.from("extension_settings").upsert(
        {
          user_id: user.id,
          enabled: next.enabled ?? true,
          block_trackers: next.block_trackers ?? true,
          block_malware: next.block_malware ?? true,
          show_badge: next.show_badge ?? true,
          auto_update: next.auto_update ?? true,
          whitelisted_domains: next.whitelisted_domains ?? [],
          custom_selectors: next.custom_selectors ?? "",
          updated_by: "dashboard",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    },
    [user, row],
  );

  if (!user) return null;

  const online = !!row?.last_seen && now - new Date(row.last_seen).getTime() < ONLINE_WINDOW_MS;
  const whitelist = row?.whitelisted_domains ?? [];

  async function addDomain(e: React.FormEvent) {
    e.preventDefault();
    const d = domain.trim().replace(/^www\./, "").toLowerCase();
    if (!d || whitelist.includes(d)) return;
    setDomain("");
    await patch({ whitelisted_domains: [...whitelist, d] });
  }

  return (
    <div className="card p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink">Remote control</h2>
          <p className="text-sm text-mute">Control your extension from here — changes apply within a minute.</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            online ? "bg-mint/15 text-mint" : "bg-mute/15 text-mute"
          }`}
        >
          <FontAwesomeIcon icon={faSignal} className="text-[0.7rem]" />
          {online ? "Extension online" : "Offline"}
        </span>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-mute">Loading…</p>
      ) : !row ? (
        <div className="mt-6 rounded-xl border border-line bg-surface p-5 text-sm text-mute">
          No extension linked yet. Install LibreGuard and sign in with this account from the
          extension's profile menu to link it here.
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-surface p-4">
              <p className="text-xs text-mute">Total blocked</p>
              <p className="mt-1 text-2xl font-semibold text-mint">{row.total_blocked.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-surface p-4">
              <p className="text-xs text-mute">Blocked today</p>
              <p className="mt-1 text-2xl font-semibold text-ink">{row.today_blocked.toLocaleString()}</p>
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-6 divide-y divide-line">
            {toggles.map((t) => (
              <div key={t.key} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{t.label}</p>
                  <p className="text-xs text-mute">{t.desc}</p>
                </div>
                <Toggle on={!!row[t.key]} onChange={() => patch({ [t.key]: !row[t.key] } as Partial<Row>)} />
              </div>
            ))}
          </div>

          {/* Allowlist */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink">Allowlisted sites</p>
            <p className="text-xs text-mute">Blocking is disabled on these domains.</p>
            <form onSubmit={addDomain} className="mt-3 flex gap-2">
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="flex-1 rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink placeholder:text-mute focus:border-mint focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="rounded-lg bg-mint/10 px-3 text-mint transition-colors hover:bg-mint/20"
                aria-label="Add domain"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
              </button>
            </form>
            {whitelist.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {whitelist.map((d) => (
                  <span key={d} className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs text-ink">
                    {d}
                    <button
                      type="button"
                      onClick={() => patch({ whitelisted_domains: whitelist.filter((x) => x !== d) })}
                      className="text-mute transition-colors hover:text-red-500"
                      aria-label={`Remove ${d}`}
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-[0.7rem]" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
