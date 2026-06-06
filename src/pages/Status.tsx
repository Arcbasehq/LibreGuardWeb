import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const systems: { name: string; state: "Operational" | "Degraded" }[] = [
  { name: "Filter list CDN", state: "Operational" },
  { name: "Update service", state: "Operational" },
  { name: "Website & docs", state: "Operational" },
  { name: "Download mirrors", state: "Operational" },
];

export default function Status() {
  const allUp = systems.every((s) => s.state === "Operational");

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
        lede="Real-time health of the services behind LibreGuard. The app keeps blocking even when these are down."
      />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
        <div
          className={`card mb-8 flex items-center gap-3 p-6 ${
            allUp ? "card--hover" : ""
          }`}
        >
          <span className="dot h-3 w-3" />
          <span className="font-medium text-ink">
            {allUp ? "All systems operational" : "Some systems degraded"}
          </span>
        </div>

        <div className="card overflow-hidden">
          {systems.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-center justify-between gap-4 p-5 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="text-ink">{s.name}</span>
              <span className="badge badge--mint">
                <span className="dot" />
                {s.state}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-mute">
          Live service health, refreshed continuously.
        </p>
      </section>
    </>
  );
}
