import PageHero from "../components/PageHero";

const columns: {
  status: string;
  tint: boolean;
  items: { title: string; desc: string }[];
}[] = [
  {
    status: "Shipped",
    tint: true,
    items: [
      { title: "Manifest V3 engine", desc: "Declarative blocking on Chromium." },
      { title: "Custom rules", desc: "Author and import your own filters." },
      { title: "Element picker", desc: "Click to hide any element on a page." },
    ],
  },
  {
    status: "In progress",
    tint: false,
    items: [
      { title: "Sync (encrypted)", desc: "Optional end-to-end synced settings across browsers." },
      { title: "Safari extension", desc: "Bring LibreGuard to Safari on macOS." },
      { title: "Rule profiler", desc: "See which rules actually fire." },
    ],
  },
  {
    status: "Exploring",
    tint: false,
    items: [
      { title: "Local AI heuristics", desc: "On-device detection of new trackers." },
      { title: "Community rule store", desc: "Browse and rate filter lists." },
      { title: "Cosmetic filtering v2", desc: "Smarter hiding of leftover ad frames." },
    ],
  },
];

export default function Roadmap() {
  return (
    <>
      <PageHero
        kicker="Roadmap"
        title={
          <>
            Where LibreGuard is <em>headed</em>.
          </>
        }
        lede="A living view of what's done, what's cooking, and what we're still thinking through. Priorities shift with the community."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.status} className="card p-7">
              <div className="flex items-center justify-between">
                <span className={`badge ${col.tint ? "badge--mint" : ""}`}>
                  {col.tint && <span className="dot" />}
                  {col.status}
                </span>
                <span className="text-sm text-mute">{col.items.length}</span>
              </div>
              <ul className="mt-6 space-y-5">
                {col.items.map((it) => (
                  <li key={it.title} className="border-t border-line pt-5 first:border-0 first:pt-0">
                    <h3 className="font-semibold text-ink">{it.title}</h3>
                    <p className="mt-1 text-sm text-soft">{it.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
