import PageHero from "../components/PageHero";

type Tag = "Added" | "Fixed" | "Changed" | "Security";

const tagClass: Record<Tag, string> = {
  Added: "badge--mint",
  Security: "badge--mint",
  Fixed: "",
  Changed: "",
};

const releases: {
  version: string;
  date: string;
  summary: string;
  changes: { tag: Tag; text: string }[];
}[] = [
  {
    version: "1.0.0",
    date: "June 5, 2026",
    summary: "The first public release of LibreGuard.",
    changes: [
      { tag: "Added", text: "Ad, tracker, and malicious-domain blocking for Chromium and Firefox." },
      { tag: "Added", text: "Subscribe to curated filter lists, updated daily." },
      { tag: "Added", text: "Write and import your own custom rules." },
      { tag: "Added", text: "Per-site blocking strength and one-click allowlisting." },
    ],
  },
];

export default function Changelog() {
  return (
    <>
      <PageHero
        kicker="Changelog"
        title={
          <>
            Every release, <em>in the open</em>.
          </>
        }
        lede="What changed, when, and why — nothing buried in a private tracker."
      />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
        <ol className="relative border-l border-line">
          {releases.map((r) => (
            <li key={r.version} className="ml-6 pb-14 last:pb-0">
              <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-mint" />
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="display text-2xl text-ink">v{r.version}</h2>
                <span className="text-sm text-mute">{r.date}</span>
              </div>
              <p className="mt-2 text-soft">{r.summary}</p>
              <ul className="mt-5 space-y-3">
                {r.changes.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className={`badge ${tagClass[c.tag]} shrink-0`}>
                      {c.tag}
                    </span>
                    <span className="pt-0.5 text-soft">{c.text}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
